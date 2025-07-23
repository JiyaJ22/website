import React, { useState, useEffect } from "react";
import { Map, BarChart3, TrendingUp, TrendingDown, Info, MapPin } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LocationAnalysis = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Failed to load city data');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTop150Cities = () => cities.slice(0, 150);
  const getBottom150Cities = () => cities.slice(-150);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading location analysis...</p>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Location Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            This section examines how location dramatically affects housing prices across Southern California. 
            Geographic analysis is crucial for understanding market dynamics and regional pricing patterns.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-6">
            Analyze price variations across Southern California cities and regions.
            Location has a huge influence on house prices, with coastal cities typically commanding premium prices.
          </p>
          <div className="max-w-4xl mx-auto p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info size={16} className="text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important Note About City Rankings</p>
                <p>These city rankings are based solely on the dataset used in this project. They do not reflect the most or least expensive cities in the U.S. or California overall — just in this specific dataset.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin size={20} className="text-blue-600" />
              <p className="text-sm text-gray-600">Total Cities</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{cities.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={20} className="text-green-600" />
              <p className="text-sm text-gray-600">Highest Average</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {cities.length > 0 ? formatPrice(cities[0].avg_price) : '$0'}
            </p>
            <p className="text-sm text-gray-600">{cities.length > 0 ? cities[0].city : 'N/A'}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown size={20} className="text-red-600" />
              <p className="text-sm text-gray-600">Lowest Average</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {cities.length > 0 ? formatPrice(cities[cities.length - 1].avg_price) : '$0'}
            </p>
            <p className="text-sm text-gray-600">{cities.length > 0 ? cities[cities.length - 1].city : 'N/A'}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 size={20} className="text-purple-600" />
              <p className="text-sm text-gray-600">Price Range</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {cities.length > 0 ? (cities[0].avg_price / cities[cities.length - 1].avg_price).toFixed(1) : '0'}x
            </p>
            <p className="text-sm text-gray-600">Variation</p>
          </div>
        </div>

        {/* Regional Map */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Map size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Regional Price Map</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="/map without names.png" 
              alt="Southern California House Price Map"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Southern California House Price Map
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Regional Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <p className="font-medium mb-1">🏖️ Coastal Areas:</p>
                <p>Premium pricing due to proximity to beaches and desirable climate</p>
              </div>
              <div>
                <p className="font-medium mb-1">🏞️ Inland Areas:</p>
                <p>More affordable options with varying amenities and accessibility</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 150 Cities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp size={24} className="text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Top 10 Most Expensive Cities</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="/top 150 cities by house price.png" 
              alt="Top 150 Cities by House Price"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Top 150 Cities by House Price Chart
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Properties</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Sqft</th>
                </tr>
              </thead>
              <tbody>
                {getTop150Cities().slice(0, 10).map((city, index) => (
                  <tr key={city.city} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                        {index < 3 && (
                          <span className="text-yellow-500">{'🏆🥈🥉'[index]}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{city.city}</td>
                    <td className="py-3 px-4 font-bold text-green-600">{formatPrice(city.avg_price)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatNumber(city.house_count)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatNumber(Math.round(city.avg_sqft))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom 150 Cities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingDown size={24} className="text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Most Affordable Cities</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src="/bottom 150 cities by house price.png" 
              alt="Bottom 150 Cities by House Price"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-center text-gray-500 mt-4" style={{display: 'none'}}>
              Bottom 150 Cities by House Price Chart
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Properties</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Sqft</th>
                </tr>
              </thead>
              <tbody>
                {getBottom150Cities().slice(0, 10).map((city, index) => (
                  <tr key={city.city} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">#{cities.length - 150 + index + 1}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{city.city}</td>
                    <td className="py-3 px-4 font-bold text-blue-600">{formatPrice(city.avg_price)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatNumber(city.house_count)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatNumber(Math.round(city.avg_sqft))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">Location Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">🏖️ Coastal Premium</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Coastal cities command significantly higher prices</li>
                <li>• Beach proximity is a major price driver</li>
                <li>• Climate and lifestyle factors influence pricing</li>
                <li>• Limited coastal land drives scarcity pricing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">🏞️ Inland Opportunities</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• More affordable housing options available</li>
                <li>• Larger properties for the same price</li>
                <li>• Growing communities with development potential</li>
                <li>• Better value for first-time homebuyers</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Key Takeaway</h3>
            <p className="text-blue-800">
              Location has a huge influence on house prices in Southern California. 
              The most expensive cities can cost up to {cities.length > 0 ? (cities[0].avg_price / cities[cities.length - 1].avg_price).toFixed(1) : '0'}x more than the most affordable ones, 
              highlighting the importance of location in the Southern California real estate market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationAnalysis;