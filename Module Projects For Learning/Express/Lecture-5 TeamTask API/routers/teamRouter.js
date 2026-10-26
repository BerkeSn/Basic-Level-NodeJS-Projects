const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamController');
const middleware = require('../middleware/middleware');

router.get(
    '/getTeams',
    controller.getTeams
);
router.post(
    '/createTeam/',
    middleware.verifyToken,
    controller.createTeam
);

router.put(
    '/updateTeam/:id',
    middleware.verifyToken,
    controller.updateTeam
);

router.delete(
    '/deleteTeam/:id',
    middleware.verifyToken,
    controller.deleteTeam
)

router.post(
    '/addUserToTeam',
    middleware.verifyToken,
    controller.addUserToTeam
)

router.delete(
    '/deleteUserFromTeam/:id',
    middleware.verifyToken,
    controller.deleteUserFromTeam,
)

router.get(
    "/getTeamById/:id",
    middleware.verifyToken,
    controller.getTeamById
)

router.get(
    '/getUsersInTeam/:id',
    middleware.verifyToken,
    controller.getUsersInTeam
)

module.exports = router;