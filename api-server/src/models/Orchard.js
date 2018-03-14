const mongoose = require('mongoose')

const Orchard = mongoose.model('Orchard', {
    id: String,
    name: String,
    location: String,
    m2: String,
    collaborators: String,
    consulting: String,
    plantations: Array,
    users: Array
})

module.exports = Orchard