const express = require('express');
const seatGeekController = require('../controllers/seatGeekController.js');
const userController = require('../controllers/userController.js');

//add in any controllers

const router = express.Router();

//add routers as needed
/* Route steps:
-received request from hope page with username in body
-pull user document from database (attached to res.locals.userInfo)
-request show info from seatgeek based on preferences
-sending back event data to client
Expect response body:
    { 
    Email: String,
    Location: {
        City: String,
        State: String,
        }
    Artists: [Artist1, Artist2, Artist3]
    Genres: [Genre1, Genre2, Genre3]
    }
    */

router.get(
  '/artist',
  userController.getUserInfo,
  seatGeekController.getArtistEvents,
  (req, res) => {
    return res.status(200).json(res.locals.artistEvents);
  }
);

router.get(
  '/genre',
  userController.getUserInfo,
  seatGeekController.getGenreEvents,
  (req, res) => {
    return res.status(200).json(res.locals.genreEvents);
  }
);

module.exports = router;
