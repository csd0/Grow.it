const mongoose = require('mongoose')
const { Schema, Schema: { ObjectId } } = mongoose

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: String
})

const Plantation = new Schema({
    species: {
        type: String,
        enum: [ 'tomato', 'lettuce', 'corn', 'carrot', 'potato', 'artichoke', 'beetroot', 'flower', 'garlic', 'ginger', 'green_pepper', 'hot_pepper', 'leek', 'onion', 'radish', 'red_pepper', 'soybean', 'aubergine'],
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
    postalCode: {
        type: String,
        required: true
    },
    admitsCollaborators: Boolean,
    admitsConsulting: Boolean,
    description: String,
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