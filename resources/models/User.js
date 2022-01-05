const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

module.exports = { User }