#!/usr/bin/env python3
"""
Backend API Testing Script for House Price Predictor
Tests all backend endpoints with realistic data
"""

import requests
import json
import sys
import os
from pathlib import Path

# Get backend URL from frontend .env file
def get_backend_url():
    frontend_env_path = Path(__file__).parent / "frontend" / ".env"
    try:
        with open(frontend_env_path, 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

# Test configuration
BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {API_BASE}")

def test_health_check():
    """Test GET /api/ - basic health check"""
    print("\n🔍 Testing Health Check (GET /api/)")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_house_stats():
    """Test GET /api/stats - get overall house statistics"""
    print("\n🔍 Testing House Statistics (GET /api/stats)")
    try:
        response = requests.get(f"{API_BASE}/stats", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_fields = ['total_houses', 'avg_price', 'avg_sqft', 'avg_bed', 'avg_bath', 
                             'price_ranges', 'bed_distribution', 'bath_distribution']
            
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False
            
            print(f"✅ House stats retrieved successfully:")
            print(f"   📊 Total houses: {data['total_houses']}")
            print(f"   💰 Average price: ${data['avg_price']:,.2f}")
            print(f"   📐 Average sqft: {data['avg_sqft']:,.0f}")
            print(f"   🛏️  Average bedrooms: {data['avg_bed']:.1f}")
            print(f"   🛁 Average bathrooms: {data['avg_bath']:.1f}")
            print(f"   📈 Price ranges: {data['price_ranges']}")
            return True
        else:
            print(f"❌ House stats failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ House stats error: {e}")
        return False

def test_city_stats():
    """Test GET /api/cities - get city statistics"""
    print("\n🔍 Testing City Statistics (GET /api/cities)")
    try:
        response = requests.get(f"{API_BASE}/cities", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if not isinstance(data, list):
                print(f"❌ Expected list, got {type(data)}")
                return False
            
            if len(data) == 0:
                print("❌ No city data returned")
                return False
            
            # Check first city has required fields
            first_city = data[0]
            required_fields = ['city', 'avg_price', 'house_count', 'min_price', 'max_price', 
                             'avg_sqft', 'avg_bed', 'avg_bath']
            missing_fields = [field for field in required_fields if field not in first_city]
            if missing_fields:
                print(f"❌ Missing required fields in city data: {missing_fields}")
                return False
            
            print(f"✅ City stats retrieved successfully:")
            print(f"   🏙️  Total cities: {len(data)}")
            print(f"   🥇 Top city by price: {first_city['city']} (${first_city['avg_price']:,.2f})")
            print(f"   📊 Sample city data: {first_city}")
            return True
        else:
            print(f"❌ City stats failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ City stats error: {e}")
        return False

def test_price_prediction():
    """Test POST /api/predict - test price prediction with sample data"""
    print("\n🔍 Testing Price Prediction (POST /api/predict)")
    
    # Test data as specified in the request
    test_data = {
        "sqft": 1500,
        "bed": 3,
        "bath": 2,
        "city": "Los Angeles, CA"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/predict", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ['predicted_price', 'price_range', 'confidence', 'factors']
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                print(f"❌ Missing required fields in prediction: {missing_fields}")
                return False
            
            print(f"✅ Price prediction successful:")
            print(f"   🏠 Input: {test_data}")
            print(f"   💰 Predicted price: ${data['predicted_price']:,.2f}")
            print(f"   📊 Price range: {data['price_range']}")
            print(f"   🎯 Confidence: {data['confidence']:.2%}")
            print(f"   🔍 Factors: {data['factors']}")
            
            # Validate prediction is reasonable
            if data['predicted_price'] < 100000 or data['predicted_price'] > 3000000:
                print(f"⚠️  Warning: Predicted price seems unrealistic: ${data['predicted_price']:,.2f}")
            
            return True
        else:
            print(f"❌ Price prediction failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Price prediction error: {e}")
        return False

def test_visualization_data():
    """Test GET /api/visualization-data - get data for charts"""
    print("\n🔍 Testing Visualization Data (GET /api/visualization-data)")
    try:
        response = requests.get(f"{API_BASE}/visualization-data", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_sections = ['histogram_data', 'scatter_data', 'correlation_matrix']
            missing_sections = [section for section in required_sections if section not in data]
            if missing_sections:
                print(f"❌ Missing required sections: {missing_sections}")
                return False
            
            # Check histogram data
            hist_data = data['histogram_data']
            if 'price' not in hist_data or 'sqft' not in hist_data:
                print("❌ Missing price or sqft in histogram data")
                return False
            
            # Check scatter data
            scatter_data = data['scatter_data']
            required_scatter = ['sqft_vs_price', 'bed_vs_price', 'bath_vs_price']
            missing_scatter = [plot for plot in required_scatter if plot not in scatter_data]
            if missing_scatter:
                print(f"❌ Missing scatter plots: {missing_scatter}")
                return False
            
            # Check correlation matrix
            corr_matrix = data['correlation_matrix']
            required_corr = ['price_sqft', 'price_bed', 'price_bath']
            missing_corr = [corr for corr in required_corr if corr not in corr_matrix]
            if missing_corr:
                print(f"❌ Missing correlations: {missing_corr}")
                return False
            
            print(f"✅ Visualization data retrieved successfully:")
            print(f"   📊 Histogram data points: {len(hist_data['price'])} prices, {len(hist_data['sqft'])} sqft")
            print(f"   📈 Scatter plots available: {list(scatter_data.keys())}")
            print(f"   🔗 Correlations: sqft={corr_matrix['price_sqft']:.3f}, bed={corr_matrix['price_bed']:.3f}, bath={corr_matrix['price_bath']:.3f}")
            
            # Validate sqft correlation is around 0.58 as mentioned
            sqft_corr = corr_matrix['price_sqft']
            if abs(sqft_corr - 0.58) > 0.1:
                print(f"⚠️  Warning: sqft correlation {sqft_corr:.3f} differs significantly from expected 0.58")
            
            return True
        else:
            print(f"❌ Visualization data failed with status {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Visualization data error: {e}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for House Price Predictor")
    print("=" * 60)
    
    tests = [
        ("Health Check", test_health_check),
        ("House Statistics", test_house_stats),
        ("City Statistics", test_city_stats),
        ("Price Prediction", test_price_prediction),
        ("Visualization Data", test_visualization_data)
    ]
    
    results = {}
    for test_name, test_func in tests:
        results[test_name] = test_func()
    
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(tests)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Overall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests PASSED!")
        return True
    else:
        print("⚠️  Some backend API tests FAILED!")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)