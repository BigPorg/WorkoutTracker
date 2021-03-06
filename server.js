// link everything together here
// requires
const express = require("express");
const mongoose = require("mongoose");
// const Workout = require("./models/workoutSchema");
// look into morgan!
const logger = require("morgan");
// const router = require("router");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
// read about logger and morgan
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// should I put mongosh in here instead? no. always running mongosh.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/WorkoutSchema", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// link in routes
app.use(require("./routes/api.js"));
app.use(require("./routes/homeRoutes.js"));
// app.use(require("router"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});