import React from 'react';
import '../styles.css';


export default function Signin() {

const handleSignIn = async () => {
  // make get request to initiate oauth with spotify
  try {
    // get request for spotify's authentication page
    console.log('entered signin try');
    const intitiateAuth = await fetch('/api/authentication', {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON'
      }
    })
    // if user successfully signs in with spotify, then expect a response with a state parameter for us to compare to the one we randomly generated for the user in our get request
    console.log( 'intitiateAuth response from spotify: ', intitiateAuth);

  } catch (err) {
    console.log('error in signing in: ', err);
  }
};
//heavy CSS!!
  return (
    <div className="signinPage">
      <div className="signin"> Made it to sign in!</div>
        <button type='button' onClick={handleSignIn}>
          Sign In
        </button>
    </div>
  );
}
