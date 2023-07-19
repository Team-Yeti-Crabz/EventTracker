import React, { useEffect, useState, useContext } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { ValuesContext } from '../pages/Contexts';


// user is redirected to '/callback' from spotify after entering their credentials
// if the user's credentials were authenticated, make get request to obtain refresh and access tokens from spotify
export default function Callback() {
  //heavy CSS!

  // const [email, setEmail] = useState('');
  // const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();
  const { setGlobalValues } = useContext(ValuesContext);
  

  // // const routeChange = (path) =>{
  // //     navigate(path);
  // // }

  // // get the redirect url path (this includes the code query we will need to send to spotify to retrieve user specific tokens)
  // const href = window.location.href;
  // console.log('href: ', href)
  // const index = href.indexOf('callback');
  // const path = '/api/authentication/' + href.slice(index);
  // console.log('path: ', path);

  // // use code in request query to get access and refresh tokens from spotify
  // const getTokens = async () => {
  //   try {
  //     const response = await fetch(path, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'Application/JSON',
  //       },
  //     });
  //     //   const initiateAuth = await response.status;
  //     console.log('getTokens fetch response: ', response);
  //     const accessToken = await response.json();
  //     // if (response.status === 200) {
  //     // }
  //     console.log('access Token:', accessToken);
  //     console.log(typeof accessToken);
  //     return checkUserType(accessToken);
  //   } catch (err) {
  //     return console.log(
  //       'error making fetch request to server to retrieve spotify tokens: ',
  //       err
  //     );
  //   }
  // };



  useEffect(() => {
    const href = window.location.href;
    const index = href.indexOf('callback');
    const urlQuery = href.slice(index)
    console.log(urlQuery)

    async function getData() {
      try {
        //~ pass it through checkState and getToken to get the access_token
        const response = await fetch(`/api/authentication/${urlQuery}`);
        const access_token = await response.json()
        console.log(access_token)

        //~ set global value to have updated access_token
        //TODO: set it to have updated email
        setGlobalValues({access_token:access_token, email:'nacho.cheese999@gmail.com', username: 'currymonstanacho'})

        //~ use access token to get profile data
        const headers = { 'Authorization': `Bearer ${access_token}` }
        const response2 = await fetch('https://api.spotify.com/v1/users/currymonstanacho',
          { headers: headers });
        const profile = await response2.json()
        console.log('PROFILE INFORMATION')
        console.log(profile)
        //~ get top artists
        const response3 = await fetch('https://api.spotify.com/v1/me/top/artists', { headers: headers });
        const topArtists = await response3.json()
        console.log('TOP ARTISTS')
        console.log(topArtists)

        //~ add navigation here
        navigate('/home')
        
      }
      catch (err) {
        console.log(err)
      }
    }

    getData()

  }, []);



  function updateProgres() {

  }

  return (
    <div className="signinPage">
      <div className="signin">
        <h2>Confirming Spotify account</h2>
        <p>Please wait...</p>
        {/* <button id="test" onClick={updateProgress}> Test Button </button> */}
      </div>
    </div>
  );
}