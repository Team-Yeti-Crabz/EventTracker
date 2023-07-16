import React, { useState } from 'react';
import '../styles.css';

export default function Preference() {
  //Manage states: location, artists, genres
  //update location
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useState({});
  const [currArtists, setCurrArtists] = useState([]);
  const [currGenres, setCurrGenres] = useState([]);
  const username = 'halia';
  const city = 'Makawao';
  const state = 'HI';

  //fetch user data object
  const fetchingData = async () => {
    try {
        //query?
      const response = await fetch('/api/preferences?email=', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // response:
      // {
      // city:
      // state:
      // artists:[1,2,3]
      // genres: [a,b,c]
      // }
      setUserData(data);
    } catch {
      throw new Error('Error with initial fetch request!');
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  console.log('userData: ', userData);

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
        <div className="add">
          <div className="addArtists">
            <h2>Add Artists:</h2>
            <h2>Add Genres:</h2>
          </div>
        </div>
        <div className="current">
          <div className="currentArtists">
            <h2>Current Artists Tracked:</h2>
            {/* <h4>{currentArtists}</h4> */}
          </div>
          <div className="currentGenres">
            <h2>Current Genres Tracked:</h2>
            {/* <h4>{currentArtists}</h4> */}
          </div>
        </div>
      </div>
    </div>
  );
}
