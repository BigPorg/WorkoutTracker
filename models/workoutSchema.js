// need to start by making a schema for the workout itself

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// should have name, date, reps, distance/length/time, lots of ways to measure
// reordered after seeing seed.js
const workoutSchema = new Schema({
    exercise: [
        {
            type: {
                type: String,
                trim: true,
                require: "What type of exercise did you do today?"
            },
            name: {
                type: String,
                trim: true,
                require: "Be more specific?"
            },
            duration: {
                type: String,
                trim: true,
                require: "For how long?"
            },
            weight: {
                type: Number,
            },
            distance: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            }
        },
    ],
    day: {
        type: Date,
        default: Date.now,
    }
});

const Workout = mongoose.model("WorkoutShema", WorkoutSchema);

module.exports = Workout;