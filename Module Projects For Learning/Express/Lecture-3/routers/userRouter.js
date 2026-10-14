const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userControllers');

routers.get('/', userController.getUsers);

module.exports = routers;