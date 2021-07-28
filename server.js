// link everything together here
// requires
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// should I put mongosh in here instead?
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/WorkoutSchema", {
    useNewUrlParser: true,
    useFindAndModify: false,
});

// link in routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});