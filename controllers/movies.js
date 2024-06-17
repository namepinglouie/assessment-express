const express = require("express");
const movies = express.Router();
const moviesArr = require("../data/movies.js");

movies.get("/", (_, response) => {
    try {
        response.status(200).json(moviesArr);
    } catch (e) {
        response.status(404).json({e});
    }
});

movies.get("/:id", (request, response) => {
    try {
        const {id} = request.params;
        const movie = moviesArr.find(movie => movie.id === Number(id));
        response.status(200).json(movie);
    } catch (e) {
        response.status(404).json({e});
    }
});

movies.put("/:id", (request, response) => {
    try {
        const {id} = request.params;
        const movie = request.body;
        const i = moviesArr.findIndex(movie => movie.id === Number(id));
        if(i !== -1) {
            moviesArr.splice(i, 1, movie);
            response.status(200).json(moviesArr[i]);
        } else throw "Can Not Update Movie!";
    } catch (e) {
        response.status(400).json({e});
    }
});

movies.post("/", (request, response) => {
    try {
        const movie = request.body;
        moviesArr.push(movie);
        response.status(201).json(moviesArr[moviesArr.length - 1]);
    } catch (e) {
        response.status(400).json({e});
    }
});

movies.delete("/:id", (request, response) => {
    try {
        const {id} = request.params;
        const i = moviesArr.findIndex(movie => movie.id === Number(id));
        if(i !== -1) {
            moviesArr.splice(i, 1);
            response.status(200).json(moviesArr);
        } else throw "Can Not Find Movie!";
    } catch (e) {
        response.status(404).json({e});
    }
});

module.exports = movies;