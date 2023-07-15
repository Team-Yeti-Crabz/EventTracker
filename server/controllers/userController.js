const { Users } = require('../models/userModels');

const userController = {};

//fetching user document from 'Users' collection in database
userController.getUserInfo = async (req, res, next) => {
  const email = req.body.email;
  if (!email)
    return next({
      log: `userController.postUserInfo ERROR: fourteener peak name missing`,
      message: {
        err: 'userController.postUserInfo: ERROR: fourteener peak name missing',
      },
    });
  try {
    const userInfo = await Users.find({ email });
    res.locals.userInfo = userInfo;
    /* 
    Expect userInfo to come back as:
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

module.exports = userController;
