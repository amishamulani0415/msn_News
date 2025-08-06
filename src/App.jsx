import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="p-4">Home Page</h1>} />
        <Route path="/india" element={<h1 className="p-4">India News</h1>} />
        <Route path="/world" element={<h1 className="p-4">World News</h1>} />
        <Route path="/weather" element={<h1 className="p-4">Weather</h1>} />
        <Route path="/for-you" element={<h1 className="p-4">For You</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
