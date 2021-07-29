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
    let id = ObjectID(req.params.id);

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

// courtesy of Malcom Mason
// router.get("/api/workout", (req, res) => {
//     Workout.aggregate().project({ 'day': 1, 'exercise.duration': 1, 'exercise.sets': 1, 'exercise.weight': 1, 'exercise.reps': 1, 'exercise.distance': 1, 'exercise.type': 1, 'exercise.name': 1 }).
//     // put $addFields into object
//     $addFields(
//         {
//             totalDuration: { $sum: '$exercise.duration' }, totalSets: { $sum: '$exercise.sets' }, totalWeight: { $sum: '$exercise.weight' }, totalReps: { $sum: '$exercise.reps' },
//             totalDistance: { $sum: '$exercise.distance' }
//             // xxx
//         })
//         .sort({ day: 1 }).then(dbWorkoutSchema => {
//             res.json(dbWorkoutSchema);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         })
// })

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


// need a get for the aggregation part
// router.get("/api/workouts", (req, res) => {
//     Workout.aggregate().project({ day, duration, weight, reps, sets })
//         .sort(day).then(dbWorkoutSchema => {
//             res.json(dbWorkoutSchema);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });

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


// need another get for the api to find each exercise
// router.get("/exercise", (req, res) => {
//     Workout.find({}).sort({ day: 1 }).then(dbWorkoutSchema);
// })
//     .catch(err => {
//         res.status(400).json(err);
//     });

module.exports = router;