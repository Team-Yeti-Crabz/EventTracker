const { seatgeek } = require('../models/secrets.js');

const seatGeekController = {};

//add this to end of any request url
// `?client_id=${seatgeek.client_id}&client_secret=${seatgeek.client_secret}`

//get request to SeatGeek based on user preferences
seatGeekController.getEvents = (req, res, next) => {
  const data = async () => {
    const response = await fetch(
      `https://api.seatgeek.com/2/events/?performers.slug=drake&client_id=${seatgeek.client_id}&client_secret=${seatgeek.client_secret}`
    );
    const artistData = await response.json();
    res.locals.artistEvents = artistData;
    console.log(artistData);
    return artistData;
  };
  data();
  return next();
};

module.exports = seatGeekController;
