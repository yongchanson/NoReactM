// import express from "express";
// import "./db";
import mongoose from "mongoose";
import express from "express";
import path from "path";
const bodyParser = require('body-parser');
const config = require('./resources/config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./resources/models/User');
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

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)
  
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
    })
  })

app.post('/api/users/login', (req, res) => {
    //이메일이 db에 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.join({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
        })
    }
    
    //이메일이 있다면, 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)
      // console.log('isMatch',isMatch)
    
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
    //비밀번호 맞다면, 토큰생성
    user.generateToken((err, user) => { //user에 token이 저장되어 있음
        if(err) return res.status(400).send(err);
        
        //token을 저장, 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
        
    
      })
    })
  })
})

app.get('/api/users/auth', auth , (req, res) => {
  //여기까지 미들웨어를 통과해 왔다 -> Authentication = ture
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false : true, //0=일반유저, 그외는 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) =>{
  User.findOneAndUpdate({ _id:req.user._id }, 
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
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

  
