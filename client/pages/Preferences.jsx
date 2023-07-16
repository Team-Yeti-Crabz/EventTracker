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
  }, [location]);

  //sending PATCH request with updated state
  const handleLocation = async (e) => {
    e.preventDefault();
    try {
      const toUpdate = {
        email: email,
        city: userData.city,
        state: userData.state,
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
  //changing state
  const handleChangeCity = (e) => {
    const newCity = e.target.value;
    setNewData((curr) => ({
      ...curr,
      city: newCity,
    }));
  };
  //changing state
  const handleChangeState = (e) => {
    const newState = e.target.value;
    setNewData((curr) => ({
      ...curr,
      state: newState,
    }));
  };

  const handleAddArtist = async (e) => {
    e.preventDefault();
    try {
      const addInfo = {
        email: email,
        artist: newArtist,
      };
      await fetch(`/api/preferences?email=${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addInfo),
      });
      setCurrArtists([...currArtists, newArtist]);
      setNewArtist('');
    } catch (err) {
      console.log(err);
    }
  };

  console.log('userData: ', userData);

  const handleChangeAddArtist = (e) => {
    const newArtist = e.target.value;
    setCurrArtists((curr) => [...curr, newArtist]);
  };

  const handleAddGenre = async (e) => {
    e.preventDefault();
    try {
      const addInfo = {
        email: email,
        artist: newArtist,
        genre: newGenre,
      };
      await fetch(`/api/preferences?email=${encodeURIComponent(userEmail)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addInfo),
      });
      setCurrArtists([...currArtists, newArtist]);
      setCurrGenres([...currGenres, newGenre]);
      setNewArtist('');
      setNewGenre('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeAddGenre = (e) => {
    const newGenre = e.target.value;
    setCurrGenres((curr) => [...curr, newGenre]);
  };

  return (
    <div className="preferencesPage">
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
