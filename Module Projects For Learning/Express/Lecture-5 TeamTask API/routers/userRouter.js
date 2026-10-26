const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/createUser', controller.createUser);
router.get('/getUsers', controller.getUsers);
router.get('/getUserById/:id', controller.getUserById);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);

// Login
router.post('/login', controller.login);

module.exports = router;