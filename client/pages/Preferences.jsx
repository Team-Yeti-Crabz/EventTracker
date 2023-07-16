import React, { useEffect, useState } from 'react';
import '../styles.css';
import { useLocation } from 'react-router-dom';

export default function Preference() {
  //Manage states: location, artists, genres
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  //   const [location, setLocation] = useState({});
  const [newArtist, setNewArtist] = useState('');
  const [currArtists, setCurrArtists] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [currGenres, setCurrGenres] = useState([]);

  useEffect(() => {
    if (location.state && location.state.email) {
      const userEmail = location.state.email;
      setEmail(userEmail);
      //fetch user data object
      const fetchingData = async () => {
        try {
          const response = await fetch(
            `/api/preferences?email=${encodeURIComponent(userEmail)}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          );
          const data = await response.json();
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
      fetchingData();
    }
  }, [[location]]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const addInfo = {
        email: email,
        artists: e.target.elements.artistName,
        genres: e.target.elements.artistName,
      };
      await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addInfo),
      });
      setNewArtist(artists);
      setNewGenre(genres);
    } catch (err) {
      console.log(err);
    }
  };

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
          <form onSubmit={handleAdd} autoComplete="off">
            <div className="addArtists">
              <h2>Add Artists:</h2>
              <input
                name="artistName"
                type="text"
                placeholder="Artist's Name"
                required
                onChange={handleChangeAddArtist}
              ></input>
              <br></br>
            </div>
            <div className="addGenre">
              <h2>Add Genre:</h2>
              <input
                name="genreName"
                type="text"
                placeholder="Genre Name"
                required
                onChange={handleChangeAddArtist}
              ></input>
              <br></br>
            </div>
            <input className="Btn" type="submit" value="add"></input>
          </form>
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
  );
}
