import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, BarChart3, TrendingUp, Map, Target, ArrowRight, Database, Brain, HomeIcon, ChevronDown } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Camera,
      title: "Price Prediction",
      description: "Upload house images and get instant price predictions using Google Teachable Machine",
      path: "/classifier",
      color: "bg-blue-500"
    },
    {
      icon: BarChart3,
      title: "Data Visualizations",
      description: "Explore comprehensive charts showing price distributions, bedroom/bathroom patterns",
      path: "/visualizations",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Comparative Analysis",
      description: "Discover correlations between square footage, bedrooms, bathrooms, and prices",
      path: "/analysis",
      color: "bg-purple-500"
    },
    {
      icon: Map,
      title: "Location Analysis",
      description: "Analyze price variations across Southern California cities and regions",
      path: "/location",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <HomeIcon size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Predicting House Prices in
              <span className="block text-blue-200">Southern California</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              A comprehensive data science project combining image classification and statistical analysis
              to predict house prices across 15,000+ Southern California homes
            </p>
            <div className="flex justify-center">
              <Link
                to="/classifier"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Camera size={24} />
                <span>Try the Price Predictor</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Moved above Dual Methodology */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore the Analysis</h2>
            <p className="text-xl text-gray-600">
              Dive deep into the data and discover insights about Southern California real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.path}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${feature.color} text-white p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>Explore</span>
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dataset Overview - Moved above Dual Methodology */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dataset Overview</h2>
            <p className="text-lg text-gray-600">
              Comprehensive analysis of Southern California real estate market
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse w-32">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="flex justify-center items-center gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-1">
                  <Database size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-600">Total Houses</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{stats.total_houses?.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-1">
                  <Target size={16} className="text-green-600" />
                  <p className="text-xs text-gray-600">Average Price</p>
                </div>
                <p className="text-lg font-bold text-gray-900">${stats.avg_price?.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-1">
                  <HomeIcon size={16} className="text-purple-600" />
                  <p className="text-xs text-gray-600">Average Sqft</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{stats.avg_sqft?.toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Unable to load statistics
            </div>
          )}
        </div>
      </div>

      {/* Dual-Approach Methodology Dropdown Section - Moved below Dataset Overview */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMethodologyOpen(!methodologyOpen)}
            className="w-full text-center mb-6 group"
          >
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Brain size={28} className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Dual-Approach Methodology</h2>
              <ChevronDown 
                size={28} 
                className={`text-blue-600 transition-transform duration-300 ${
                  methodologyOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
            <p className="text-lg text-gray-600 mb-3">
              Combining machine learning and statistical analysis for comprehensive price prediction
            </p>
            <div className="text-blue-600 font-medium">
              {methodologyOpen ? 'Click to collapse' : 'Click to expand'}
            </div>
          </button>

          {methodologyOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-300">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Camera size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Image Classification</h3>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Using Google Teachable Machine, we trained a model on 105 randomly selected house images
                  to classify properties into three price categories:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong>Low:</strong> $195,000 - $796,666</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span><strong>Mid:</strong> $796,667 - $1,398,333</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span><strong>High:</strong> $1,398,334 - $2,000,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-600 text-white p-2 rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Data Analysis</h3>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Our price prediction engine uses a <strong>linear regression model</strong> trained on cleaned data (with outliers removed) and one-hot encoded city features. This interpretable model quantifies how square footage, bedrooms, bathrooms, and location (city) contribute to price, making it easy to understand and trust the predictions.
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>Square footage:</strong> Most reliable price indicator</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>Location (city):</strong> Major price variation by city, handled with one-hot encoding</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>Bedrooms/Bathrooms:</strong> Weaker predictors, but included for completeness</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Predict House Prices?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Try our interactive classifier or explore the comprehensive data analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/classifier"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Camera size={24} />
              <span>Try the Price Predictor</span>
            </Link>
            <Link
              to="/conclusion"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2"
            >
              <Target size={24} />
              <span>View Key Insights</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;