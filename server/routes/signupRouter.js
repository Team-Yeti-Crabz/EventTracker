const express = require('express');
const userController = require('../controllers/userController.js');

//add in any controllers

const router = express.Router();

//add routers as needed
router.post('/', userController.createUser, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
