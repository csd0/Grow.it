const rp = require('request-promise')


const api = {
    _baseUrl() {
            return `${this.protocol}://${this.host}:${this.port}/api`
    },

    _call(method, path, body) {
        return rp({
            method,
            uri: `${this._baseUrl()}/${path}`,
            body,
            json: true
        })
    },

    //////////////// USERS ////////////////
    list() {
        return this._call('get', 'users')
    },

    register(name, surname, email, username, password, description) {
        return this._call('post', 'user', { name, surname, email, username, password, description })
    },

    remove(id, username, password) {
        return this._call('delete', `user/${id}`, { username, password })
    },

    retrieve(id) {
        return this._call('get', `user/${id}`)
    },

    update(id, name, surname, email, newUsername, newPassword, username, password) {
        return this._call('put', `user/${id}`, { name, surname, email, newUsername, newPassword, username, password })
    },

    searchUser(searchUser) {
        return this._call('get', `userq/${searchUser}`)
    },


    //////////////// ORCHARDS ////////////////
    listOrchard() {
        return this._call('get', 'orchards')
    },

    registerOrchard( name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description){
        return this._call('post', 'orchard', { name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description })
    },

    retrieveOrchard(id) {
        return this._call('get', `orchard/${id}`)
    },

    removeOrchard(id) {
        return this._call('delete', `orchard/${id}`)
    },

    updateOrchard( id, newName, newLocation, newM2, newPostalCode, newAdmitsCollaborators, newAdmitsConsulting, newDescription ) {
        return this._call( 'put', `orchard/${id}`, { id, newName, newLocation, newM2, newPostalCode, newAdmitsCollaborators, newAdmitsConsulting, newDescription })
    },

    searchOrchard( postalCode, keyword ) {
        return this._call('post', 'orchardq', { postalCode, keyword })
    },

    addCollaborator( orchardid, user ){
        return this._call('post', '/orchard/addcollaborator', { orchardid, user })
    },

    deleteCollaborator( orchardid, user ){
        return this._call('post', '/orchard/deletecollaborator', { orchardid, user })
    },

    addPlantation( orchardid, species, m2, releaseDate, shared ){
        return this._call('post', '/orchard/addplantation', { orchardid, species, m2, releaseDate, shared })
    },

    deletePlantation( orchardid, plantation ){
        return this._call('post', '/orchard/deleteplantation', { orchardid, plantation })
    },

    updatePlantation( orchardid, plantation, m2, releaseDate, shared ){
        return this._call('post', '/orchard/updatePlantation', { orchardid, plantation, m2, releaseDate, shared })
    },
    
    getUsersByOrchard( orchardid ){
        return this._call('get', `/orchard/populateusers/${orchardid}`)
    },

    retrieveOrchard2(id) {
        return this._call('get', `orchard/${id}`)
    }




}

module.exports = api