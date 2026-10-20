const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/getAllBooks', controller.getAllBooks);
router.post('/createBook', controller.createBook);
router.get('/getBookById/:id', controller.getBookById);
router.put('/updateBook/:id', controller.updateBook);
router.get('/getBooksByPages/:page', controller.getBooksByPages);

module.exports = router;