const express = require('express');

// add in any controllers

const router = express.Router();

// initially request user authentication from Spotify 
router.get('/', authController.initializeAuth, (req, res) => {
  return res.redirect('https://accounts.spotify.com/authorize?' +
    res.locals.reqAuthentication);
});

// user is redirected here from spotify after entering their credentials
// if the user's credentials were authenticated, make get request to obtain refresh and access tokens from spotify
// TODO: if succesful, send the logged res.locals info to server to store for duration of user session
router.get('/callback', authController.checkState, authController.getTokens, (req, res) => {
    console.log('acces token: ', res.locals.accessToken);
    console.log('refresh token: ', res.locals.refreshToken);
    console.log('options to pass into spotify api requests: ', res.locals.options);
    return res.sendStatus(200);

});

module.exports = router;