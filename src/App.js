import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Import the Signup component
import Navbar from "./components/Navbar";
import "./App.css";  // Optional: To include any global styles

const App = () => {
  const [user, setUser] = useState(null);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set the user if authenticated
    });

    return () => unsubscribe();  // Clean up subscription on component unmount
  }, []);

  return (
    <Router>
      {/* Gym Management System Tag in Top Left Corner */}
      <div className="app-header">
        <span className="gym-tag">Gym Management System</span>
      </div>

      <Navbar />
      <div className="app-container">
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Route for the signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* If logged in, show the Dashboard */}
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2025 Gym Management System. All rights reserved.</p>
      </footer>
    </Router>
  );
};

export default App;
