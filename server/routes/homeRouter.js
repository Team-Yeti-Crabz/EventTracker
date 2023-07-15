const express = require('express');

//add in any controllers

const router = express.Router();

//add routers as needed
/*
-received request from hope page with username in body
-pull user document from database
-request show info from seatgeek based on preferences
-sending back event data to client
Expect request body:
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

router.post('/', userController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});
