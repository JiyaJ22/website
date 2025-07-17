import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ImageClassifier from "./components/ImageClassifier";
import DataVisualizations from "./components/DataVisualizations";
import ComparativeAnalysis from "./components/ComparativeAnalysis";
import LocationAnalysis from "./components/LocationAnalysis";
import Conclusion from "./components/Conclusion";
import About from "./components/About";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classifier" element={<ImageClassifier />} />
          <Route path="/visualizations" element={<DataVisualizations />} />
          <Route path="/analysis" element={<ComparativeAnalysis />} />
          <Route path="/location" element={<LocationAnalysis />} />
          <Route path="/conclusion" element={<Conclusion />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;