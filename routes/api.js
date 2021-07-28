// requires
const mongoose = require("mongoose");
const Workout = require("../models/workoutSchema");
const router = require("express").Router();
const WorkoutSchema = require("../models/workoutSchema");

// sends info to body
router.post("/api/workouts", ({ body }, res) => {
    WorkoutSchema.create(body).then(dbWorkoutSchema => {
        res.json(dbWorkoutSchema);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

// need another put? for updating
router.put("/api/workouts/:id", {

})

// need a get
router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).sort({ date: -6 }).then(dbWorkoutSchema => {
        res.json(dbWorkoutSchema);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;