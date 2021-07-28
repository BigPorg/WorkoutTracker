// need to start by making a schema for the workout itself

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// should have name, date, reps, distance/length/time, lots of ways to measure
// reordered after seeing seed.js
const workoutSchema = new Schema({
    exercise: {
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,

    },
    day: {
        type: Date,
        default: Date.now,
    }
});

const Workout = mongoose.model("WorkoutShema", workoutSchema);

module.exports = Workout;