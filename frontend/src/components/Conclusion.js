import React from "react";
import { Target, TrendingUp, Map, Camera, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Conclusion = () => {
  const keyInsights = [
    {
      icon: TrendingUp,
      title: "Square Footage Rules",
      description: "Square footage has the strongest correlation with price (0.58), making it more predictive than number of bedrooms or bathrooms.",
      color: "bg-blue-50 border-blue-200 text-blue-900"
    },
    {
      icon: Map,
      title: "Location is Everything",
      description: "Geographic location has a huge influence on price, with coastal cities commanding premium prices compared to inland areas.",
      color: "bg-green-50 border-green-200 text-green-900"
    },
    {
      icon: Camera,
      title: "AI + Data = Better Predictions",
      description: "Image classification provides quick approximations, but combining it with statistical data analysis yields more accurate results.",
      color: "bg-purple-50 border-purple-200 text-purple-900"
    }
  ];

  const recommendations = [
    {
      audience: "Home Buyers",
      tips: [
        "Focus on square footage as the primary value indicator",
        "Consider location premium when setting budget",
        "Look for properties with good sqft-to-price ratios",
        "Use image classification as a quick screening tool"
      ]
    },
    {
      audience: "Home Sellers",
      tips: [
        "Highlight square footage in marketing materials",
        "Consider expanding space rather than just adding rooms",
        "Emphasize location advantages in pricing strategy",
        "Use professional photography to enhance AI predictions"
      ]
    },
    {
      audience: "Real Estate Professionals",
      tips: [
        "Educate clients about square footage correlation",
        "Provide location-based market analysis",
        "Combine traditional methods with AI tools",
        "Use data visualization to support pricing decisions"
      ]
    },
    {
      audience: "Investors",
      tips: [
        "Target properties with strong sqft-to-price ratios",
        "Consider emerging areas with location potential",
        "Use predictive models for investment analysis",
        "Monitor market trends across different regions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Key Insights & Conclusions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of 15,000+ Southern California homes reveals critical patterns
            that drive real estate pricing and prediction accuracy
          </p>
        </div>

        {/* Key Insights */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-8">
            <Target size={32} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Primary Findings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className={`border-2 rounded-xl p-6 ${insight.color}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white rounded-lg">
                      <Icon size={24} className="text-gray-700" />
                    </div>
                    <h3 className="text-xl font-bold">{insight.title}</h3>
                  </div>
                  <p className="text-base leading-relaxed">{insight.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistical Summary */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistical Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Correlation Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Price vs Square Footage</span>
                  <span className="text-blue-600 font-bold">0.58</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Price vs Bedrooms</span>
                  <span className="text-yellow-600 font-bold">~0.4</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Price vs Bathrooms</span>
                  <span className="text-red-600 font-bold">~0.3</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏠 Market Characteristics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Total Properties Analyzed</span>
                  <span className="text-gray-600 font-bold">15,474</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Cities Covered</span>
                  <span className="text-gray-600 font-bold">415+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Price Range Variation</span>
                  <span className="text-gray-600 font-bold">10x+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Overview */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Methodology Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">🤖 Image Classification</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>105 house images manually categorized</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>3 price ranges: Low, Mid, High</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Google Teachable Machine model</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Real-time browser-based predictions</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">📊 Statistical Analysis</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Comprehensive correlation analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Distribution analysis across multiple factors</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Geographic price variation mapping</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-1 text-blue-600" />
                  <span>Predictive modeling with confidence scores</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations by Audience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 {rec.audience}</h3>
                <ul className="space-y-2">
                  {rec.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <ArrowRight size={16} className="mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Future Applications */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Future Applications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <TrendingUp size={32} className="text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Market Prediction</h3>
              <p className="text-sm text-green-800">
                Extend analysis to predict market trends and identify emerging valuable areas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <Camera size={32} className="text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Enhanced AI Models</h3>
              <p className="text-sm text-green-800">
                Improve image classification with more training data and advanced neural networks
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <Map size={32} className="text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Regional Expansion</h3>
              <p className="text-sm text-green-800">
                Apply methodology to other regions and create nationwide housing price models
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore Further?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Try the interactive predictor or dive deeper into the data analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/classifier"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Camera size={20} />
              <span>Try the Predictor</span>
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2"
            >
              <Target size={20} />
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;