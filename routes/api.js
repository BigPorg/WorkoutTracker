// requires
const mongoose = require("mongoose");
const router = require("express").Router();
const WorkoutSchema = require("../models/workoutSchema");

// sends info to body
router.post("/api/workoutSchema", ({ body }, res) => {
    WorkoutSchema.create(body).then(dbWorkoutSchema => {
        res.json(dbWorkoutSchema);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;