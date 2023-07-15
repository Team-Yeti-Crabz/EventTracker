import React from 'react';
import '../styles.css';

export default function Signup() {
  // send the location and email to the database!!
  //get access token!
  // on submit, the inputs are sent in a req body to the server at /api/signup
  const handleNewUser = async (e) => {
    e.preventDefaul();
    try {
      const signupReq = {
        email: e.target.elements.email.value,
        city: e.target.elements.city.value,
        state: e.target.elements.city.state,
        //add tokens
      };
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupReq),
      });
      await fetch('/preferences', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log('handleNewUser error:', err);
    }
  };

  return (
    <div className="signupPage">
      <div className="signup">
        <h1>It looks like you're new to Event Tracker. Welcome!</h1>
        <h4>add your email:</h4>
        {/* send a post request to the database with the location */}
        {/* make sure to pass in email from OAuth as well! */}
        <form onSubmit={handleNewUser} autoComplete="off">
          <input name="email" type="text" placeholder="email" required></input>
          <br></br>
          <br></br>
          <h4>add your location:</h4>
          <input
            name="city"
            type="text"
            placeholder="New York"
            required
          ></input>
          <br></br>
          <input name="state" type="password" placeholder="NY" required></input>
          <br></br>
          <br></br>
          <input className="Btn" type="submit" value="Add"></input>
        </form>
      </div>
    </div>
  );
}
//next: Preference Page
