const User = require('../models/User')
const Orchard = require('../models/Orchard')
const validate = require('./validate')
const uuid = require('uuid/v4')

module.exports = {
    register(name, surname, email, username, password, description) {
        return Promise.resolve()
            .then(() => {
                validate({ name, surname, email, username, password })

                return User.findOne({ username })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                const id = uuid()

                return User.create({ id, name, surname, email, username, password, description })
                    .then(() => id)
            })
    },


    registerOrchard(name, location, m2, collaborators, consulting, description){
        return Promise.resolve()
            .then(() => {
                validate({ name, location, m2})

                return Orchard.findOne({ name })
            })
            .then(orchard => {
                if (orchard) throw Error('orchard already exists')

                const id = uuid()

                return Orchard.create({ name, location, m2, collaborators, consulting, description })
                    .then(() => id)
            })
    },


    list() {
        return User.find({}, { _id: 0, id: 1, name: 1, surname: 1, email: 1, username: 1 })
    },


    listOrchard() {
        return Orchard.find()
    },


    update(id, name, surname, email, username, password, newUsername, newPassword) {
        return Promise.resolve()
            .then(() => {
                validate({ id, name, surname, email, username, password, newUsername, newPassword })

                return User.findOne({ username: newUsername })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                return User.findOne({ id })
            })
            .then(user => {
                if (!user) throw Error('user does not exists')

                if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                //return User.updateOne({ id }, { $set: { name, surname, email, username: newUsername, password: newPassword } }) // NOTE $set also works here, but it can be simplified as following statement
                return User.updateOne({ id }, { name, surname, email, username: newUsername, password: newPassword })
            })
    },


    retrieve(id) {
        return Promise.resolve()
            .then(() => {
                validate({ id })

                //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
                return User.findOne({ id }, { _id: 0, password: 0 })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                return user
            })
    },


    remove(id, username, password) {
        return Promise.resolve()
            .then(() => {
                validate({ id, username, password })

                return User.findOne({ id })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                return User.deleteOne({ id })
            })
    }
}