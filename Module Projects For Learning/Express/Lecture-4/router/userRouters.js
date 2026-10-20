const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/getUsers', controller.getUsers);
router.post('/createUser', controller.createUser);
router.get('/getUserById/:id', controller.getUserById);
router.put(`/updateUser/:id`, controller.updateUser);
router.delete(`/deleteUser/:id`, controller.deleteUser);

router.get('/getUserWithBook/:id', controller.getUserWithBook);

module.exports = router;