// import express from "express";
// import "./db";
import mongoose from "mongoose";
import express from "express";
import path from "path";

// const express = require('express');
// const path = require('path');


let initial_path = path.join(__dirname, 'resources');

let app = express();
// var app = require('mongoose');
// const mongoose = require('mongoose');


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

// app.get('/join', (req, res) => {
//     res.sendFile(path.join(initial_path, "join.html"));
// })

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(initial_path, "login.html"));
// })

// app.get('/profile', (req, res) => {
//     res.sendFile(path.join(initial_path, "profile.html"));
// })
app.post('/register', (req, res) => { //로그인에 필요한 정보를 client에서 가져오면 -> 데이터베이스에 넣어줌
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.use((req, res) => {
    res.json("404 Not Found!");
})

const bodyParser = require('body-parser');
const { User } = require('./resources/models/User');
const config = require('./resources/config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());




const PORT = 5000;

app.listen(PORT, () => {
    console.log(`listenting on http://localhost:${PORT}`);
})


mongoose.connect(config.mongoURI,
    {}
);
  
  const db = mongoose.connection;
  
  const handleOpen = () => console.log("✅  Connected to DB");
  const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);
  
  db.once("open", handleOpen);
  db.on("error", handleError);

  
