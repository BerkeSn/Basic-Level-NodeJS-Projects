const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const controller = require('../controllers/commentController');

router.get(
    '/getAllComment',
    middleware.verifyToken,
    controller.getAllComment
)

router.get(
    '/getCommentById/:id',
    middleware.verifyToken,
    controller.getCommentById
)

router.post(
    '/createComment/:taskId',
    middleware.verifyToken,
    controller.createComment
)

router.put(
    '/updateComment/:taskId/:commentId',
    middleware.verifyToken,
    controller.updateComment
)

router.delete(
    '/deleteComment/:taskId/:commentId',
    middleware.verifyToken,
    controller.deleteComment
)

router.get(
    '/getAllCommentByTask/:taskId',
    middleware.verifyToken,
    controller.getAllCommentByTask
)

module.exports = router;