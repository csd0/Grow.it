const mongoose = require('mongoose')

const User = mongoose.model('User', {
    id: String,
    name: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    description: String
})

module.exports = User