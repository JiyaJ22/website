import React, { useState, useEffect } from "react";
import { TrendingUp, Activity, BarChart3, Info, Target } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ComparativeAnalysis = () => {
  const [vizData, setVizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisualizationData();
  }, []);

  const fetchVisualizationData = async () => {
    try {
      const response = await axios.get(`${API}/visualization-data`);
      setVizData(response.data);
    } catch (error) {
      console.error('Error fetching visualization data:', error);
      setError('Failed to load visualization data');
    } finally {
      setLoading(false);
    }
  };

  const formatCorrelation = (correlation) => {
    return correlation.toFixed(3);
  };

  const getCorrelationStrength = (correlation) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.7) return { strength: 'Strong', color: 'text-green-600 bg-green-50' };
    if (abs >= 0.5) return { strength: 'Moderate', color: 'text-yellow-600 bg-yellow-50' };
    if (abs >= 0.3) return { strength: 'Weak', color: 'text-orange-600 bg-orange-50' };
    return { strength: 'Very Weak', color: 'text-red-600 bg-red-50' };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="bg-blue-800 text-white py-8 rounded-lg mb-8">
            <h1 className="text-4xl font-bold mb-4">Comparative Analysis</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover correlations between square footage, bedrooms, bathrooms, and house prices
              through scatter plots, box plots, and correlation analysis
            </p>
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Activity size={24} className="text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Correlation Matrix</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="/heatmap.png" 
              alt="Correlation Matrix Heatmap"
              className="w-full max-w-3xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Correlation Matrix Heatmap
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Price vs Square Footage</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCorrelation(vizData?.correlation_matrix?.price_sqft || 0)}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  getCorrelationStrength(vizData?.correlation_matrix?.price_sqft || 0).color
                }`}>
                  {getCorrelationStrength(vizData?.correlation_matrix?.price_sqft || 0).strength}
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BarChart3 size={20} className="text-green-600" />
                  <p className="text-sm font-medium text-gray-700">Price vs Bedrooms</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCorrelation(vizData?.correlation_matrix?.price_bed || 0)}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  getCorrelationStrength(vizData?.correlation_matrix?.price_bed || 0).color
                }`}>
                  {getCorrelationStrength(vizData?.correlation_matrix?.price_bed || 0).strength}
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Activity size={20} className="text-purple-600" />
                  <p className="text-sm font-medium text-gray-700">Price vs Bathrooms</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCorrelation(vizData?.correlation_matrix?.price_bath || 0)}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  getCorrelationStrength(vizData?.correlation_matrix?.price_bath || 0).color
                }`}>
                  {getCorrelationStrength(vizData?.correlation_matrix?.price_bath || 0).strength}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box Plots */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 size={24} className="text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Box Plot Analysis</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="NEW-factor-vs-price-box-plots.png"
              alt="Multi-factor Box Plot Analysis"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Multi-factor Box Plot Analysis
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-3">Box Plot Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
              <div>
                <p className="font-medium mb-1">📊 Distribution Analysis:</p>
                <p>Box plots reveal the spread and central tendencies of house prices across different property features, helping identify outliers and typical price ranges.</p>
              </div>
              <div>
                <p className="font-medium mb-1">🎯 Key Patterns:</p>
                <p>Shows how property characteristics like square footage, bedrooms, and bathrooms create distinct price distributions and market segments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scatter Plots */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Scatter Plot Analysis</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="NEW-3-factor-vs-price-scatterplot.png"
              alt="Multi-factor Scatter Plot Analysis"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Multi-factor Scatter Plot Analysis
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Square Footage vs Price</h3>
              <p className="text-sm text-blue-800">
                Shows the strongest positive correlation ({formatCorrelation(vizData?.correlation_matrix?.price_sqft || 0)}).
                Larger homes generally command higher prices, making square footage the most reliable predictor.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Bedrooms vs Price</h3>
              <p className="text-sm text-green-800">
                Moderate correlation ({formatCorrelation(vizData?.correlation_matrix?.price_bed || 0)}).
                More bedrooms tend to increase price, but the relationship is less predictable than square footage.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Bathrooms vs Price</h3>
              <p className="text-sm text-purple-800">
                Weaker correlation ({formatCorrelation(vizData?.correlation_matrix?.price_bath || 0)}).
                Additional bathrooms add value, but the effect is less pronounced than other factors.
              </p>
            </div>
          </div>
        </div>

        {/* Combined Key Insights & Statistical Summary */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-2">
            <Info size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">Key Insights & Statistical Summary</h2>
          </div>
          <p className="text-blue-900 text-lg font-medium text-center max-w-2xl">
            Square footage is the most reliable indicator of house price in this dataset, explaining the largest share of price variation. Bedroom and bathroom counts matter less than the overall space of a home, and have only a weak correlation with price compared to square footage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;