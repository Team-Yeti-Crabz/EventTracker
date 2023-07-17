import React, { useEffect, useState } from 'react';
import '../styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Preference() {
  //Manage states: location, artists, genres
  const location = useLocation();
  //allows you to navigate/manipulate the browser history
  const { email } = location.state;
  const [userData, setUserData] = useState({});
  const [currArtists, setCurrArtists] = useState([]);
  const [currGenres, setCurrGenres] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          `/api/preferences?email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await response.json();
        console.log(data);
        // {
        // email
        // city:
        // state:
        // artists:[1,2,3]
        // genres: [a,b,c]
        // }
        setUserData(data);
        setCurrArtists(data.artists);
        setCurrGenres(data.genres);
      } catch {
        throw new Error('Error with initial fetch request!');
      }
    };
    fetchingData(email);
  }, [email]);

  //changing state's state
  const handleChangeCity = (e) => {
    const newCity = e.target.value;
    setUserData((curr) => ({
      ...curr,
      city: newCity,
    }));
  };
  //changing city's state
  const handleChangeState = (e) => {
    const newState = e.target.value;
    setUserData((curr) => ({
      ...curr,
      state: newState,
    }));
  };
  //sending PATCH request with updated state
  const handleLocation = async (e) => {
    e.preventDefault();
    try {
      const toUpdate = {
        email: email,
        location: { city: userData.city, state: userData.state },
      };
      await fetch(`/api/preferences?email=${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toUpdate),
      });
    } catch (err) {
      console.log(err);
    }
  };
  //changing artistArr's state
  const handleChangeAddArtist = (e) => {
    const newArtist = e.target.value;
    setCurrArtists((curr) => [...curr, newArtist]);
  };
  //sending a PATCH request with updated artists array
  const handleAddArtist = async (e) => {
    e.preventDefault();
    try {
      const addInfo = {
        email: email,
        artists: currArtists,
      };
      await fetch(`/api/preferences?email=${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addInfo),
      });
    } catch (err) {
      console.log(err);
    }
  };
  //changing genre's state
  const handleChangeAddGenre = (e) => {
    const newGenre = e.target.value;
    setCurrGenres((curr) => [...curr, newGenre]);
  };
  //sending a PATCH request with updated genre array
  const handleAddGenre = async (e) => {
    e.preventDefault();
    try {
      const addInfo = {
        email: email,
        genres: currGenres,
      };
      await fetch(`/api/preferences?email=${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addInfo),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="preferencesPage">
      <button className="Btn">
        <Link to={{ pathname: '/home' }}>Home Page</Link>
      </button>
      <div className="preferences">
        <div className="basicInfo">
          <h1>Basic Info</h1>
          <p>Email: {email}</p>
          <p>City: {userData.city}</p>
          <p>State: {userData.state}</p>
          {/* add update function! */}
          <div className="updateLocation">
            <p>to update location:</p>
            <form onSubmit={handleLocation} autoComplete="off">
              <div className="addCity">
                <p>new city:</p>
                <input
                  name="newCity"
                  type="text"
                  placeholder="new city"
                  required
                  onChange={handleChangeCity}
                ></input>
                <br></br>
              </div>
              <div className="addState">
                <p>new state:</p>
                <input
                  name="newState"
                  type="text"
                  placeholder="new state"
                  required
                  onChange={handleChangeState}
                ></input>
                <br></br>
              </div>
              <input className="Btn" type="submit" value="update"></input>
            </form>
          </div>
        </div>
        <div className="add">
          <form onSubmit={handleAddArtist} autoComplete="off">
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
            <input className="Btn" type="submit" value="add"></input>
          </form>
          <form onSubmit={handleAddGenre} autoComplete="off">
            <div className="addGenre">
              <h2>Add Genre:</h2>
              <input
                name="genreName"
                type="text"
                placeholder="Genre Name"
                required
                onChange={handleChangeAddGenre}
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
          <ul>
            {currArtists.map((artist, i) => (
              <li key={artist + i}>{artist}</li>
            ))}
          </ul>
        </div>
        <div className="currentGenres">
          <h2>Current Genres Tracked:</h2>
          <ul>
            {currGenres.map((genre, i) => (
              <li key={genre + i}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
