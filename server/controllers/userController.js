const { Users } = require('../models/userModels.js');

const userController = {};

//fetching user document from 'Users' collection in database
userController.getUserInfo = async (req, res, next) => {
  const email = req.query.email;
  if (!email)
    return next({
      log: `userController.getUserInfo ERROR: email missing from req body`,
      message: {
        err: 'userController.getUserInfo: ERROR: email missing from req body',
      },
    });
  try {
    const userInfo = await Users.findOne({ email });
    res.locals.userInfo = userInfo;
    /* Expect userInfo to come back as:
    { 
    email: String,
    location: {
        city: String,
        state: String,
        }
    artists: [Artist1, Artist2, Artist3]
    genres: [Genre1, Genre2, Genre3]
    }
    */

    return next();
  } catch {
    return next({
      log: `userController.getUserInfo ERROR: trouble getting user data from database`,
      message: {
        err: 'userController.getUserInfo: ERROR: trouble getting user data from database',
      },
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { email, city, state } = req.body;
  if (!email || !city || !state)
    return next({
      log: `userController.createUser ERROR: missing email or location on req body`,
      message: {
        err: 'userController.createUser: ERROR: missing email or location on req body',
      },
    });
  try {
    const newUser = await Users.create({ email, location: { city, state } });
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next({
      log: `userController.createUser ERROR: trouble creating new user`,
      message: {
        err: `userController.createUser ERROR: ${err}`,
      },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  const email = req.query.email;
  const { artists, genres } = req.body;
  console.log(artists);
  console.log(genres);
  // console.log(req.body);
  if (!artists && !genres)
    return next({
      log: `userController.updateUser ERROR: missing artist or genre on req body`,
      message: {
        err: 'userController.updateUser: ERROR: missing artist or genre on req body',
      },
    });

  try {
    if (artists) {
      const updatedUser = await Users.findOneAndUpdate(
        { email: email },
        { $push: { artists: artists} },
        { new: true }
      );
      res.locals.updatedUser = updatedUser;
    }
    if (genres) {
      const updatedUser = await Users.findOneAndUpdate(
        { email: email },
        { genres: genres },
        { new: true }
      );
      res.locals.updatedUser = updatedUser;
    }
    console.log(res.locals.updatedUser);

    return next();
  } catch (err) {
    return next({
      log: `userController.updateUser ERROR: trouble updating user`,
      message: {
        err: `userController.updateUser ERROR: ${err}`,
      },
    });
  }
};
//initially updates users prefered artists
userController.updateUserSpotify = async (req, res, next) => {
  const email = res.locals.email;
  const artists = res.locals.spotifyArtists;
  if (!artists || !email)
    return next({
      log: `userController.updateUserSpotify ERROR: missing artist or email`,
      message: {
        err: 'userController.updateUserSpotify: ERROR: missing artist or email',
      },
    });

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { artists },
      { new: true }
    );
    res.locals.updatedUser = updatedUser;
    return next();
  } catch (err) {
    return next({
      log: `userController.createUser ERROR: trouble creating new user`,
      message: {
        err: `userController.createUser ERROR: ${err}`,
      },
    });
  }
};


//add middleware to send access token to database

module.exports = userController;
