const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

const User = new Schema({ // TODO end data types definitions
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    description: String
})

const Plantation = new Schema({
    species: {
        type: String,
        enum: ['carrot', 'onion'], // TODO end enum values
        required: true
    },
    releaseDate: Date,
    shared: Boolean,
    m2: {
        type: Number,
        required: true
    }
})

const Orchard = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    m2: {
        type: Number,
        required: true
    },
    admitsCollaborators: Boolean,
    admitsConsulting: Boolean,
    plantations: [Plantation],
    users: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
                required: true
            },

            role: {
                type: String,
                enum: ['admin', 'collaborator'],
                required: true
            }
        }
    ]
})

module.exports = {
    User: mongoose.model('User', User),
    Orchard: mongoose.model('Orchard', Orchard)
}