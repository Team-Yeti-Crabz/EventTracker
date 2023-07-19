import React, { useState } from 'react';
// import '../styles.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Signup() {
  const location = useLocation();
  const { email, accessToken, username } = location.state;
  console.log('email', email, 'accessToken', accessToken, 'username', username);
  const [city, setUserCity] = useState('');
  const [state, setUserState] = useState('');
  const navigate = useNavigate();

  // send the location and email to the database!!
  //get access token!
  // on submit, the inputs are sent in a req body to the server at /api/signup
  const handleNewUser = async (e) => {
    e.preventDefault();
    try {
      const userCity = e.target.elements.city.value;
      setUserCity(userCity);
      const userState = e.target.elements.state.value;
      setUserState(userState);
      const signupReq = {
        email: email,
        username: username,
        city: userCity,
        state: userState,
        accessToken: accessToken,
      };

      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupReq),
      });
      navigate('/preferences', {
        state: { email, accessToken, username },
      });
    } catch (err) {
      console.log('handleNewUser error:', err);
    }
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <h1>It looks like you're new to EventTracker. Welcome!</h1>
        {/* send a post request to the database with the location */}
        {/* make sure to pass in email from OAuth as well! */}
        <form onSubmit={handleNewUser} autoComplete="off" id="signupinfo">
          <h4>add your location:</h4>
          <input
            name="city"
            type="text"
            placeholder="New York"
            required
          ></input>
          <br></br>
          <input name="state" type="text" placeholder="NY" required></input>
          <br></br>
          <br></br>
          <input className="Btn" type="submit" value="Add"></input>
        </form>
      </div>
    </div>
  );
}
//next: Preference Page
