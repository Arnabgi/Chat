const express = require('express');
const route = express.Router();
const userController = require('../controller/user.controller');
route.post('/login',userController.signIn);
route.post('/user',userController.addUser);
module.exports = route;