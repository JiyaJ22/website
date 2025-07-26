import React from "react";
import { User, Code, Database, Brain, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const About = () => {
  const tools = [
    { name: "Python", description: "Data analysis, backend API development" },
    { name: "Pandas", description: "Data manipulation and statistical analysis" },
    { name: "React", description: "Interactive frontend development" },
    { name: "FastAPI", description: "RESTful API backend" },
    { name: "TensorFlow.js", description: "Machine learning in the browser" },
    { name: "Teachable Machine", description: "No-code machine learning" },
    { name: "Seaborn & Matplotlib", description: "Data visualization" },
    { name: "Tailwind CSS", description: "Responsive UI design" }
  ];

  const achievements = [
    {
      title: "Data Processing",
      description: "Successfully processed 15,474 house records across 415+ cities",
      icon: Database
    },
    {
      title: "Machine Learning",
      description: "Trained image classification model with 105 manually categorized images",
      icon: Brain
    },
    {
      title: "Statistical Analysis",
      description: "Discovered 0.58 correlation between square footage and price",
      icon: Code
    },
    {
      title: "Full-Stack Development",
      description: "Built complete web application with RESTful API and interactive frontend",
      icon: ExternalLink
    }
  ];

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="bg-blue-800 text-white py-8 rounded-lg mb-8">
            <h1 className="text-4xl font-bold mb-4">About This Project</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A comprehensive data science project combining statistical analysis, machine learning, 
              and full-stack development to predict Southern California house prices
            </p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <User size={32} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Goals</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Analyze factors influencing house prices in Southern California</li>
                <li>• Develop both traditional statistical and AI-powered prediction models</li>
                <li>• Create an interactive web application to showcase findings</li>
                <li>• Provide actionable insights for various real estate stakeholders</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Discoveries</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Square footage is the strongest price predictor (0.58 correlation)</li>
                <li>• Location has massive impact on pricing (10x+ variation)</li>
                <li>• Coastal areas command significant premium over inland regions</li>
                <li>• Bedroom/bathroom counts have weaker correlation than expected</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Data Processing Pipeline</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Data Collection</p>
                  <p className="text-sm text-blue-800">15,474 house records with images, prices, and features</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Statistical Analysis</p>
                  <p className="text-sm text-blue-800">Correlation analysis, distribution studies, outlier detection</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Visualization</p>
                  <p className="text-sm text-blue-800">Comprehensive charts, maps, and interactive displays</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Machine Learning Workflow</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Image Classification</p>
                  <p className="text-sm text-blue-800">105 images manually categorized into 3 price ranges</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Model Training</p>
                  <p className="text-sm text-blue-800">Google Teachable Machine for rapid prototyping</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-blue-900">Prediction API</p>
                  <p className="text-sm text-blue-800">Real-time inference with confidence scores</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Technologies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-xs text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Achievements */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Project Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What I Learned</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                              <h3 className="font-semibold text-gray-900 mb-3">Data Science</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Correlation analysis and statistical significance</li>
                <li>• Data visualization best practices</li>
                <li>• Handling large datasets efficiently</li>
                <li>• Identifying meaningful patterns in complex data</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Machine Learning</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Image classification model training</li>
                <li>• No-code ML with Teachable Machine</li>
                <li>• Model evaluation and validation</li>
                <li>• Combining AI with traditional analysis</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Full-Stack Development</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• RESTful API design and implementation</li>
                <li>• Interactive frontend development</li>
                <li>• Real-time data processing</li>
                <li>• User experience optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Improvements */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Future Improvements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-purple-900 mb-3">Enhanced Modeling</h3>
              <ul className="space-y-2 text-purple-800 text-sm">
                <li>• Increase training dataset size for better accuracy</li>
                <li>• Implement advanced neural network architectures</li>
                <li>• Add temporal analysis for market trends</li>
                <li>• Include additional features like neighborhood amenities</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-900 mb-3">Platform Expansion</h3>
              <ul className="space-y-2 text-purple-800 text-sm">
                <li>• Extend to other geographic regions</li>
                <li>• Add real-time market data integration</li>
                <li>• Implement user accounts and saved searches</li>
                <li>• Mobile app development for on-the-go predictions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;