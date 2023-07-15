import React, { useState } from 'react';
import '../styles.css';

export default function Preference() {
  //Manage states: location, artists, genres
  const [location, setLocation] = useState({});

  const username = 'halia';
  const city = 'Makawao';
  const state = 'HI';
  return (
    <div className="preferencesPage">
      <div className="preferences">
        <div className="basicInfo">
          <h1>Basic Info</h1>
          <p>Username: {username}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          {/* add update function! */}
        </div>
      </div>
    </div>
  );
}
