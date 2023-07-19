const express = require('express');

// add in any controllers
const authController = require('../controllers/authController');
const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');

const router = express.Router();

// initially request user authentication from Spotify
router.get('/', authController.initializeAuth, (req, res) => {
  console.log('reached authentication router.get redirect');
  return res.status(200).json(res.locals.reqAuthentication);
});

// user is redirected here from spotify after entering their credentials
// if the user's credentials were authenticated, make get request to obtain refresh and access tokens from spotify
// TODO: if succesful, send the logged res.locals info to server to store for duration of user session
router.get(
  '/callback',
  authController.checkState,
  authController.getTokens,
  (req, res) => {
    console.log('router acces token: ', res.locals.accessToken);
    console.log('router refresh token: ', res.locals.refreshToken);
    console.log(
      'options to pass into spotify api requests: ',
      res.locals.options
    );
    return res.status(200).json(res.locals.accessToken);
  }
);

// TODO: get user email from spotify and check if the user exists in the database

router.post(
  '/email',
  spotifyController.getAccountInfo,
  userController.addToken,
  (req, res) => {
    const email = res.locals.email;
    const username = res.locals.username;
    const exists = res.locals.exists;

    //TODO: frontEnd expects response:
    const responseObj = {
      email: email,
      exists: exists,
      accessToken: req.body.accessToken,
      username: username,
    };
    console.log('responseObj', responseObj);
    return res.status(200).json(responseObj);
  }
);

module.exports = router;
