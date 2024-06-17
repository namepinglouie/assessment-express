const express = require("express");
const app = express();
const moviesController = require("./controllers/movies.js");

app.use(express.json());
app.use("/movies", moviesController);

app.get("/", (_, response) => {
    response.send("Welcome to my Movie Server");
});
app.get("*", (_, response) => {
    response.status(404).send("This Request Does Not Exist!");
});

module.exports = app;