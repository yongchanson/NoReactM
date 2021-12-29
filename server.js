// import express from "express";

const express = require('express');
const path = require('path');
const movieRouter = express.Router();

let initial_path = path.join(__dirname, "movie");

let app = express();

app.use(express.static(initial_path));


app.get("/:id[a-z]", (req, res) => {
    res.sendFile(path.join(initial_path, "person.html"));
})
// movieRouter.get("person/:id", (req, res) => {
//     res.sendFile(path.join(initial_path, "person.html"));
// })


// app.get('/:id[0-9]', (req, res) => {
//     res.sendFile(path.join(initial_path, "detail.html"));
// })
app.use("/:id", (req, res) => {
    return res.sendFile(path.join(initial_path, "detail.html"));
})


// app.get('/search', (req, res) => {
//     res.sendFile(path.join(initial_path, "search.html"));
// })

app.get('/', (req, res) => {
    return res.sendFile(path.join(initial_path, "home.html"));
})

app.use((req, res) => {
    res.json("404 Not Found!");
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`listenting on http://localhost:${PORT}`);
})

