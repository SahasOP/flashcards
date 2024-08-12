import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./index.css"; // Ensure this is the file where Tailwind is configured

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="text-center min-h-screen flex flex-col items-center justify-center bg-violet-200 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
