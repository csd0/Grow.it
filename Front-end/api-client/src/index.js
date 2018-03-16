require('dotenv').config()
const rp = require('request-promise')

// const protocol = process.env.protocol
// const host = process.env.host
// const port = process.env.port

const api = {
    _baseUrl() {
        with (this) {
            return 'http://localhost:5000/api'
            // return `${protocol}://${host}:${port}/api`
        }
    },

    _call(method, path, body) {
        return rp({
            method,
            uri: `${this._baseUrl()}/${path}`,
            body,
            json: true
        })
    },

    list() {
        return this._call('get', 'users')
    },

    listOrchard() {
        return this._call('get', 'orchards')
    },

    register(name, surname, email, username, password, description) {
        return this._call('post', 'user', { name, surname, email, username, password, description })
    },

    registerOrchard( name, location, m2, collaborators, consulting, description){
        return this._call('post', 'orchard', { name, location, m2, collaborators, consulting, description })
    },

    remove(id, username, password) {
        return this._call('delete', `user/${id}`, { username, password })
    },

    retrieve(id) {
        return this._call('get', `user/${id}`)
    },

    update(id, name, surname, email, newUsername, newPassword, username, password) {
        return this._call('put', `user/${id}`, { name, surname, email, newUsername, newPassword, username, password })
    }
}

module.exports = api