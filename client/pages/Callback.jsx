import React from 'react';
import '../styles.css';

export default function Callback() {
//heavy CSS!

// expects code from spotify
// if not give error
//  if so 

// user is redirected to '/callback' from spotify after entering their credentials
// if the user's credentials were authenticated, make get request to obtain refresh and access tokens from spotify
//   componentDidMount() {
//     const getTokens = async () => {
//       try {
//         // get request for spotify's authentication page
//         console.log('entered signin try');
//         const intitiateAuth = await fetch('/api/authentication/callback', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'Application/JSON'
//       }
//     })
//     // if user successfully signs in with spotify, then expect a response with a state parameter for us to compare to the one we randomly generated for the user in our get request
//     console.log( 'intitiateAuth response from spotify: ', intitiateAuth);

//       } catch (err) {
//     console.log('error in signing in: ', err);
//   }
//     }
//   }

  return (
    <div >
        <h1>callback</h1>
    </div>
  );
}