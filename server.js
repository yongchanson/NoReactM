// import express from "express";

const express = require('express');
const path = require('path');
// const movieRouter = express.Router();

let initial_path = path.join(__dirname, 'resources');

let app = express();

// app.use(express.static(initial_path));
app.use('/static', express.static('resources'));

// app.get("/:id[a-z]", (req, res) => {
//     res.sendFile(path.join(initial_path, "person.html"));
// })

app.get("/person/:id", (req, res) => {
    res.sendFile(path.join(initial_path, "person.html"));
})


// app.get('/:id[0-9]', (req, res) => {
//     res.sendFile(path.join(initial_path, "detail.html"));
// })
app.get("/movies/:id", (req, res) => {
    res.sendFile(path.join(initial_path, "detail.html"));
})

app.get('/search', (req, res) => {
    res.sendFile(path.join(initial_path, "search.html"));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.use((req, res) => {
    res.json("404 Not Found!");
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`listenting on http://localhost:${PORT}`);
})

