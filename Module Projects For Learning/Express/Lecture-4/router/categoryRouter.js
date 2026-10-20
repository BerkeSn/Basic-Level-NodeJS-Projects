const express = require("express");
const router = express.Router();
const controller = require('../controllers/categoryController');

router.post('/createCategory', controller.createCategory);

module.exports = router;