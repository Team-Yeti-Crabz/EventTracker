const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const {spotify} = require('../models/secrets')

const client_id = spotify.clientId; // Your client id
const client_secret = spotify.clientSecret; // Your secret
// ! SET TO 8080 TO RUN IN DEV MODE. CHANGE TO 3000 IF IN PRODUCTION
const redirect_uri = 'http://localhost:8080/api/authentication/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';


const authController = {};

// initialize state to request user authentication from Spotify 
authController.initializeAuth = (req, res, next) => 
{
  try {
      const state = generateRandomString(16);
      // store state on a cookie for spotify oauth communication with server
      res.cookie(stateKey, state);
    
      // object sent as res.query to spotify so your application can request authorization
      const scope = 'user-read-private user-read-email';
      res.locals.reqAuthentication =  querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })  
      console.log('initialize auth complete');
      return next();
  } catch (err) {
    return next({
        log: 'error in authController.initializeAuth: ' + err,
        message: 'An error occured while redirecting to Spotify'
    })
  }

};

// check spotify's response for state parameter
authController.checkState = (req, res, next) => {
    // the state parameter will tell us if the user was authenticated by spotify, if they did not choose to redirect to spotify, or if there was an error
  try {

    const state = req.query.state || null;
  
    if (state === null || state !== storedState) {
      // user choose not to redirect to spotify or there was an error
  
      //! spotify's example:
      /*
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
      */
  
      return next({
      log: 'spotify authentication: state mismatch. No error.', 
      message: 'Error authenticating user. Please try again.'
     })
  
    } else {
      // spotify authenticated user credentials
      return next();
    }
  } catch (err) {
    return next({
        log: 'error in authController.checkState: ' + err,
        message: 'Error authenticating user. Please try again.'
    })
  }

}

// ! bad practice - making a post request in middleware
// need to update the structure of this middleware and add the post request to router, but just checking if functional for now based off spotify examples
// request access tokens from spotify
authController.getTokens = (req, res, next) => {
    const code = req.query.code || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    // clear statekey that was stored on cookie as it's no longer needed. Will be using access and refresh token to communicate with spotify api
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    // request refresh and access tokens from spotify
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        res.locals.accessToken = body.access_token;
        res.locals.refreshToken = body.refresh_token;

        res.locals.options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        return next();

        // ! spotify example
        /*
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });
        */

        // ! spotify example
        /*
        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
        */
      } else {
        return next({
            log: 'spotify authentication: invalid token'
        });
        
      }
    });



}

  

module.exports = authController;