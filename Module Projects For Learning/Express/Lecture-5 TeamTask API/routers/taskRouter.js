const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const controller = require('../controllers/taskController');

router.post(
    '/createTask',
    middleware.verifyToken,
    controller.createTask
)

router.get(
    '/getTasksForTeams/:id',
    middleware.verifyToken,
    controller.getTasksForTeams
)

router.get(
    '/getTasks',
    middleware.verifyToken,
    controller.getTasks
)

module.exports = router;