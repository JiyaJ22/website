import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, BarChart3, TrendingUp, Map, Target, ArrowRight, Database, Brain, HomeIcon } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
      title: "Image Classification",
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
    <div className="min-h-screen bg-gray-50">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/classifier"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Camera size={20} />
                <span>Try Image Classifier</span>
              </Link>
              <Link
                to="/visualizations"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2"
              >
                <BarChart3 size={20} />
                <span>View Data Analysis</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dataset Overview</h2>
          <p className="text-xl text-gray-600">
            Comprehensive analysis of Southern California real estate market
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Database size={20} className="text-blue-600" />
                <p className="text-sm text-gray-600">Total Houses</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total_houses?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target size={20} className="text-green-600" />
                <p className="text-sm text-gray-600">Average Price</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">${stats.avg_price?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <HomeIcon size={20} className="text-purple-600" />
                <p className="text-sm text-gray-600">Average Sqft</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.avg_sqft?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Brain size={20} className="text-red-600" />
                <p className="text-sm text-gray-600">ML Categories</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Unable to load statistics
          </div>
        )}
      </div>

      {/* Approach Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dual-Approach Methodology</h2>
            <p className="text-xl text-gray-600">
              Combining machine learning and statistical analysis for comprehensive price prediction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Camera size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Image Classification</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Using Google Teachable Machine, we trained a model on 105 randomly selected house images
                to classify properties into three price categories:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span><strong>Low:</strong> $195,000 - $796,666</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span><strong>Mid:</strong> $796,667 - $1,398,333</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span><strong>High:</strong> $1,398,334 - $2,000,000</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Data Analysis</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Statistical analysis reveals key factors influencing house prices:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span><strong>Square footage:</strong> Strongest correlation (0.58)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span><strong>Location:</strong> Major price variation by city</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span><strong>Bedrooms/Bathrooms:</strong> Secondary factors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Camera size={20} />
              <span>Start Predicting</span>
            </Link>
            <Link
              to="/conclusion"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2"
            >
              <Target size={20} />
              <span>View Key Insights</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;