import React, { useEffect, useState } from 'react';
import '../styles.css';
import { useNavigate } from "react-router-dom";

// user is redirected to '/callback' from spotify after entering their credentials
// if the user's credentials were authenticated, make get request to obtain refresh and access tokens from spotify
export default function Callback() {
    //heavy CSS!

    const [confirmed, setConfirm] = useState(false);
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');

    // get the redirect url path (this includes the code query we will need to send to spotify to retrieve user specific tokens)
    const href = window.location.href;
    const index = href.indexOf('callback');
    const path = '/api/authentication/' + href.slice(index);
    console.log( 'path: ', path);

    // use code in request query to get access and refresh tokens from spotify
    const getTokens = async () => {
      try {
          
          const response = await fetch(path, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/JSON'
          }
        })
      //   const initiateAuth = await response.status;
        console.log('getTokens fetch response: ', response);
      if (response.status === 200) {
        
        // TODO: UNCOMMENT BELOW LINES
        //   setConfirm(true);
        //   return checkUserType();
        }

      }  catch (err) {
        return console.log('error making fetch request to server to retrieve spotify tokens: ', err);
      }
    }

    

    // TODO: get user email from spotify and check db to see if user exists
    const checkUserType = async () => {
        //TODO: get request to spotify to get user email
        // setEmail(response);

        // TODO: check db for user email
        // if user is not in db
        // setUserType('new');

        // if user already exists in db
        // setUserType('old')
        console.log('entered Callback.jsx checkUserType');

        return;
    }
    
    



  const navigate = useNavigate(); 
  const routeChange = (path) =>{ 
      navigate(path);
  }


//   useEffect(() => {
//     let path = '';
//     if (confirmed === true && userType === 'new') {
//         path = '/signup';
//     }
//     else if (confirmed === true && userType === 'old') {
//         path = '/home';
//     }
//     return routeChange(path);

//   }, [userType]);

  getTokens();

  return (
    <div >
        <h2>Confirming Spotify authentication...</h2>
        <p>Please wait</p>
    </div>
  );
}