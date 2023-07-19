import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FetchContext } from './pages/Contexts';


import styles from './styles.css';
//import all pages
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Preferences from './pages/Preferences.jsx';
import Callback from './pages/Callback.jsx';

//create app HTML structure
const App = () => {
  const [globalFetch, setGlobalFetch] = useState(false);

  return (
    <div className="App">
      <FetchContext.Provider value={{ globalFetch, setGlobalFetch }}>
        <Routes>
          {/* Add each page as a route */}
          <Route path="/" element={<Signin />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </FetchContext.Provider>
    </div>
  );
};

export default App;
