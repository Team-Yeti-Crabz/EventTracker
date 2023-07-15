import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './styles.css';
import HomePage from './pages/Home.jsx';

//create app HTML structure
const App = () => {
  return (
    <div>
      <Routes>
        {/* TODO:Add each page as a route */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/peakInfo" element={<PeakInfo />} /> */}
      </Routes>
    </div>
  );
};

export default App;
