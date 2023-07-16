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
    const userInfo = await Users.find({ email });
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

module.exports = userController;
