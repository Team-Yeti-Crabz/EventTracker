import React from 'react';
import '../styles.css';

export default function Signup() {
  //pass down email from OAuth
  return (
    <div className="signupPage">
      <div className="signup">
        <h1>Welcome to EventTracker!</h1>
        <h4>add your location:</h4>
        {/* send a post request to the database with the location */}
        {/* make sure to pass in email from OAuth as well! */}
        <form method="POST" action="/api/signup" autoComplete="off">
          <input name="city" type="text" placeholder="New York"></input>
          <br></br>
          <br></br>
          <input name="state" type="password" placeholder="NY"></input>
          <br></br>
          <br></br>
          <input className="Btn" type="submit" value="Add"></input>
        </form>
      </div>
    </div>
  );
}
//next: Preference Page
