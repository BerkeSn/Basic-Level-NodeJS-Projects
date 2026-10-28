const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const controller = require('../controllers/taskController');

router.post(
    '/createTask/:id',
    middleware.verifyToken,
    controller.createTask
)

router.get(
    '/getTasksForTeams/:id',
    middleware.verifyToken,
    controller.getTasksForTeams
)

router.put(
    '/updateTask/:teamId/:taskId',
    middleware.verifyToken,
    controller.updateTask
)

router.delete(
    '/deleteTask/:teamId/:taskId',
    middleware.verifyToken,
    controller.deleteTask
)

module.exports = router;