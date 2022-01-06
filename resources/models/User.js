const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        uniqeu: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 35
    },
    role: {//관리자
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save', function(next){
    let user = this;
    
    if(user.isModified('password')){//비밀번호가 바뀔때만 암호화
    //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
          cb(null, isMatch); //비밀번호가 같다면, isMatch은 true
    })    
}

userSchema.methods.generateToken = function(cb) {
    let user = this;

    //jsonwebtoken으로 token생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    //token = user._id + 'secrtToken'
    //token해석시 'secrtToken'을 넣으면 user._id을 얻을 수 있음
    
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user) //에러가 null이면 user정보만 전달
    })
}

userSchema.statics.findByToken = function(token, cb) {
    let user = this;

    //토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해, 유저를 찾고
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id" : decoded, "token": token }, function (err, user){
            if (err) return cb(err);
            cb(null, user)
        })

    })
}
const User = mongoose.model('User', userSchema)

module.exports = { User }