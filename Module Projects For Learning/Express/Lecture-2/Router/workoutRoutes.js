const express = require('express');
const router = express.Router();
const controllers = require('../controllers/workoutControllers');

router.get('/getWorkouts', controllers.getWorkouts);
router.post('/createWorkouts', controllers.createWorkout);
router.get('/getWorkoutsById/:id', controllers.getWorkoutsById);
router.put('/updateWorkout/:id', controllers.updateWorkout);
router.delete('/deleteWorkout/:id', controllers.deleteWorkout)

module.exports = router;