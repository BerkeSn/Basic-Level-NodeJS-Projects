const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControllers');

router.get("/getUsers", controllers.getUsers);
router.get('/getUserById/:id', controllers.getUserById);
router.post('/createUser', controllers.createUser);
router.put('/updateUser/:id', controllers.updateUser);
router.delete('/deleteUser/:id', controllers.deleteUser);

module.exports = router;