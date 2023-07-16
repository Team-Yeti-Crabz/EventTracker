import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// import styles from './styles.css';
//import all pages
import Home from './pages/Home.jsx';
// import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Preferences from './pages/Preferences.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

//create app HTML structure
const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Add each page as a route */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <Preferences />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
