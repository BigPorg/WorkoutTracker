// requires
const mongoose = require("mongoose");
const Workout = require("../models/workoutSchema");
const router = require("express").Router();
// const WorkoutSchema = require("../models/workoutSchema");

// sends info to body
router.post("/api/workouts", (req, res) => {
    Workout.create({}).then(dbWorkoutSchema => {
        res.json(dbWorkoutSchema);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

// need put for updating
// gonna be aggregating
router.put("/api/workouts/:id", (req, res) => {
    let id = ObjectId(req.params.id);

    Workout.collection.findOneAndUpdate(id, {
        $push:
            { exercise: body }
        // validator
    }, { new: true, runValidators: true }
    )
        .then(dbWorkoutSchema => {
            res.json(dbWorkoutSchema);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
)

router.get("/api/workout", (req, res) => {
    Workout.aggregate([{
        // put $addFields into object
        $addFields:
        {
            totalDuration: { $sum: '$exercise.duration' }
        }
    }])
        .sort({ _id: 1 }).then(dbWorkoutSchema => {
            res.json(dbWorkoutSchema);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// need a get
// gonna be aggregating, maybe use the aggregate from above?
// need to work on range
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addFields:
        {
            totalDuration: { $sum: '$exercise.duration' }
        }
    }]).sort({ date: -1 }).limit(7).then(dbWorkoutSchema => {
        res.json(dbWorkoutSchema);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;