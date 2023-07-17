const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
//use get userinfo to grab document, 
// router.get('/', userController.getUserInfo) => //send back

router.post('/', userController.getUserInfo, (req, res) => {
  req.body
  res.locals.userInfo
})

