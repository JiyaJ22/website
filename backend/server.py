from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import pandas as pd
import numpy as np
import requests
import base64
from PIL import Image
import io
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="House Price Predictor API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Load house data on startup
house_data = None
city_stats = None
house_stats = None

def load_house_data():
    """Load and process house data from CSV"""
    global house_data, city_stats, house_stats
    try:
        csv_path = ROOT_DIR.parent / "images" / "socal2.csv"
        house_data = pd.read_csv(csv_path)
        
        # Calculate city statistics
        city_stats = house_data.groupby('citi').agg({
            'price': ['mean', 'count', 'min', 'max'],
            'sqft': 'mean',
            'bed': 'mean',
            'bath': 'mean'
        }).round(2)
        
        # Calculate overall statistics
        house_stats = {
            'total_houses': len(house_data),
            'avg_price': house_data['price'].mean(),
            'avg_sqft': house_data['sqft'].mean(),
            'avg_bed': house_data['bed'].mean(),
            'avg_bath': house_data['bath'].mean(),
            'price_ranges': {
                'low': {'min': 195000, 'max': 796666, 'count': 0},
                'mid': {'min': 796667, 'max': 1398333, 'count': 0},
                'high': {'min': 1398334, 'max': 2000000, 'count': 0}
            },
            'bed_distribution': house_data['bed'].value_counts().to_dict(),
            'bath_distribution': house_data['bath'].value_counts().to_dict()
        }
        
        # Calculate price range counts
        house_stats['price_ranges']['low']['count'] = len(house_data[house_data['price'] <= 796666])
        house_stats['price_ranges']['mid']['count'] = len(house_data[(house_data['price'] > 796666) & (house_data['price'] <= 1398333)])
        house_stats['price_ranges']['high']['count'] = len(house_data[house_data['price'] > 1398333])
        
        logging.info(f"Loaded {len(house_data)} house records")
        
    except Exception as e:
        logging.error(f"Error loading house data: {e}")
        house_data = pd.DataFrame()
        city_stats = pd.DataFrame()
        house_stats = {}

# Data Models
class HousePredictionInput(BaseModel):
    sqft: int = Field(..., gt=0, description="Square footage of the house")
    bed: int = Field(..., gt=0, description="Number of bedrooms")
    bath: float = Field(..., gt=0, description="Number of bathrooms")
    city: str = Field(..., description="City name")

class PredictionResponse(BaseModel):
    predicted_price: float
    price_range: str
    confidence: float
    factors: Dict[str, Any]
    image_prediction: Optional[Dict[str, Any]] = None

class HouseStats(BaseModel):
    total_houses: int
    avg_price: float
    avg_sqft: float
    avg_bed: float
    avg_bath: float
    price_ranges: Dict[str, Dict[str, Any]]
    bed_distribution: Dict[str, int]
    bath_distribution: Dict[str, int]

class CityStats(BaseModel):
    city: str
    avg_price: float
    house_count: int
    min_price: float
    max_price: float
    avg_sqft: float
    avg_bed: float
    avg_bath: float

# Helper functions
def get_price_range(price: float) -> str:
    """Determine price range category"""
    if price <= 796666:
        return "Low"
    elif price <= 1398333:
        return "Mid"
    else:
        return "High"

def predict_price_from_data(sqft: int, bed: int, bath: float, city: str) -> Dict[str, Any]:
    """Predict house price based on data analysis insights"""
    if house_data is None or len(house_data) == 0:
        raise HTTPException(status_code=500, detail="House data not loaded")
    
    # Base prediction using square footage (strongest correlation factor)
    # From analysis: sqft has 0.58 correlation with price
    base_price_per_sqft = house_data['price'].mean() / house_data['sqft'].mean()
    predicted_price = base_price_per_sqft * sqft
    
    # City adjustment factor
    city_factor = 1.0
    if city_stats is not None:
        try:
            city_avg_price = city_stats.loc[city, ('price', 'mean')]
            overall_avg_price = house_data['price'].mean()
            city_factor = city_avg_price / overall_avg_price
        except:
            # If city not found, use overall average
            city_factor = 1.0
    
    # Apply city adjustment
    predicted_price *= city_factor
    
    # Bedroom/bathroom adjustments (smaller factors)
    bed_factor = 1.0 + (bed - house_data['bed'].mean()) * 0.1
    bath_factor = 1.0 + (bath - house_data['bath'].mean()) * 0.05
    
    predicted_price *= bed_factor * bath_factor
    
    # Ensure reasonable bounds
    predicted_price = max(100000, min(predicted_price, 3000000))
    
    factors = {
        'sqft_factor': f"Square footage is the strongest predictor (correlation: 0.58)",
        'city_factor': f"City adjustment factor: {city_factor:.2f}",
        'bed_factor': f"Bedroom adjustment: {bed_factor:.2f}",
        'bath_factor': f"Bathroom adjustment: {bath_factor:.2f}",
        'base_price_per_sqft': f"${base_price_per_sqft:.2f}"
    }
    
    return {
        'predicted_price': predicted_price,
        'price_range': get_price_range(predicted_price),
        'confidence': min(0.85, max(0.60, city_factor * 0.8)),  # Higher confidence for known cities
        'factors': factors
    }

async def predict_from_image(image_data: bytes) -> Dict[str, Any]:
    """Predict house price from image using Teachable Machine model"""
    try:
        # Convert image to base64
        image = Image.open(io.BytesIO(image_data))
        # Resize image to match model input requirements (typically 224x224)
        image = image.resize((224, 224))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert to base64 for frontend processing
        img_buffer = io.BytesIO()
        image.save(img_buffer, format='PNG')
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
        
        # Since we can't directly call TensorFlow.js from Python,
        # we'll return the image data for frontend processing
        return {
            'status': 'ready_for_prediction',
            'image_base64': img_base64,
            'model_url': 'https://teachablemachine.withgoogle.com/models/KjXP4uvx0/',
            'message': 'Image processed and ready for ML prediction'
        }
        
    except Exception as e:
        logging.error(f"Error processing image: {e}")
        return {
            'status': 'error',
            'message': f'Error processing image: {str(e)}'
        }

# API Routes
@api_router.get("/")
async def root():
    return {"message": "House Price Predictor API", "version": "1.0.0"}

@api_router.get("/stats", response_model=HouseStats)
async def get_house_stats():
    """Get overall house statistics"""
    if house_stats is None:
        raise HTTPException(status_code=500, detail="House statistics not available")
    return house_stats

@api_router.get("/cities", response_model=List[CityStats])
async def get_city_stats():
    """Get statistics by city"""
    if city_stats is None:
        raise HTTPException(status_code=500, detail="City statistics not available")
    
    result = []
    for city, stats in city_stats.iterrows():
        result.append(CityStats(
            city=city,
            avg_price=stats[('price', 'mean')],
            house_count=stats[('price', 'count')],
            min_price=stats[('price', 'min')],
            max_price=stats[('price', 'max')],
            avg_sqft=stats[('sqft', 'mean')],
            avg_bed=stats[('bed', 'mean')],
            avg_bath=stats[('bath', 'mean')]
        ))
    
    return sorted(result, key=lambda x: x.avg_price, reverse=True)

@api_router.post("/predict", response_model=PredictionResponse)
async def predict_house_price(input_data: HousePredictionInput):
    """Predict house price based on input parameters"""
    try:
        prediction = predict_price_from_data(
            sqft=input_data.sqft,
            bed=input_data.bed,
            bath=input_data.bath,
            city=input_data.city
        )
        
        return PredictionResponse(**prediction)
        
    except Exception as e:
        logging.error(f"Error in price prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@api_router.post("/predict-with-image")
async def predict_with_image(
    sqft: int = Form(...),
    bed: int = Form(...),
    bath: float = Form(...),
    city: str = Form(...),
    image: UploadFile = File(...)
):
    """Predict house price using both data and image"""
    try:
        # Get data-based prediction
        data_prediction = predict_price_from_data(sqft, bed, bath, city)
        
        # Process image
        image_data = await image.read()
        image_prediction = await predict_from_image(image_data)
        
        # Combine predictions (for now, just return both)
        return JSONResponse({
            'data_prediction': data_prediction,
            'image_prediction': image_prediction,
            'combined_prediction': {
                'predicted_price': data_prediction['predicted_price'],
                'price_range': data_prediction['price_range'],
                'confidence': data_prediction['confidence'],
                'note': 'Data-based prediction with image analysis available on frontend'
            }
        })
        
    except Exception as e:
        logging.error(f"Error in combined prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@api_router.post("/image-predict")
async def predict_from_image_only(image: UploadFile = File(...)):
    """Process image for ML prediction"""
    try:
        image_data = await image.read()
        result = await predict_from_image(image_data)
        return JSONResponse(result)
        
    except Exception as e:
        logging.error(f"Error in image prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Image prediction error: {str(e)}")

@api_router.get("/visualization-data")
async def get_visualization_data():
    """Get data for charts and visualizations"""
    if house_data is None or len(house_data) == 0:
        raise HTTPException(status_code=500, detail="House data not loaded")
    
    return {
        'histogram_data': {
            'price': house_data['price'].tolist(),
            'sqft': house_data['sqft'].tolist()
        },
        'scatter_data': {
            'sqft_vs_price': {
                'x': house_data['sqft'].tolist(),
                'y': house_data['price'].tolist()
            },
            'bed_vs_price': {
                'x': house_data['bed'].tolist(),
                'y': house_data['price'].tolist()
            },
            'bath_vs_price': {
                'x': house_data['bath'].tolist(),
                'y': house_data['price'].tolist()
            }
        },
        'correlation_matrix': {
            'price_sqft': house_data[['price', 'sqft']].corr().iloc[0, 1],
            'price_bed': house_data[['price', 'bed']].corr().iloc[0, 1],
            'price_bath': house_data[['price', 'bath']].corr().iloc[0, 1]
        }
    }

# Initialize data on startup
@app.on_event("startup")
async def startup_event():
    load_house_data()

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
