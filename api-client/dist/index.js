'use strict';

require('dotenv').config();
var rp = require('request-promise');

// const protocol = process.env.protocol
// const host = process.env.host
// const port = process.env.port

var api = {
    _baseUrl: function _baseUrl() {
        // with (this) {
        //"this" necessary, instead... this.protocol, this.host...
        // return 'https://secure-shelf-47966.herokuapp.com/api'
        // return 'https://morning-inlet-10973.herokuapp.com/api'
        // return 'http://localhost:5000/api'
        return this.protocol + '://' + this.host + ':' + this.port + '/api';
        // }
    },
    _call: function _call(method, path, body) {
        return rp({
            method: method,
            uri: this._baseUrl() + '/' + path,
            body: body,
            json: true
        });
    },


    //////////////// USERS ////////////////
    list: function list() {
        return this._call('get', 'users');
    },
    register: function register(name, surname, email, username, password, description) {
        return this._call('post', 'user', { name: name, surname: surname, email: email, username: username, password: password, description: description });
    },
    remove: function remove(id, username, password) {
        return this._call('delete', 'user/' + id, { username: username, password: password });
    },
    retrieve: function retrieve(id) {
        return this._call('get', 'user/' + id);
    },
    update: function update(id, name, surname, email, newUsername, newPassword, username, password) {
        return this._call('put', 'user/' + id, { name: name, surname: surname, email: email, newUsername: newUsername, newPassword: newPassword, username: username, password: password });
    },
    searchUser: function searchUser(_searchUser) {
        return this._call('get', 'userq/' + _searchUser);
    },


    //////////////// ORCHARDS ////////////////
    listOrchard: function listOrchard() {
        return this._call('get', 'orchards');
    },
    registerOrchard: function registerOrchard(name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description) {
        return this._call('post', 'orchard', { name: name, location: location, m2: m2, postalCode: postalCode, admitsCollaborators: admitsCollaborators, admitsConsulting: admitsConsulting, description: description });
    },
    retrieveOrchard: function retrieveOrchard(id) {
        return this._call('get', 'orchard/' + id);
    },
    removeOrchard: function removeOrchard(id) {
        return this._call('delete', 'orchard/' + id);
    },
    updateOrchard: function updateOrchard(id, newName, newLocation, newM2, newPostalCode, newAdmitsCollaborators, newAdmitsConsulting, newDescription) {
        return this._call('put', 'orchard/' + id, { id: id, newName: newName, newLocation: newLocation, newM2: newM2, newPostalCode: newPostalCode, newAdmitsCollaborators: newAdmitsCollaborators, newAdmitsConsulting: newAdmitsConsulting, newDescription: newDescription });
    },
    searchOrchard: function searchOrchard(postalCode, keyword) {
        return this._call('post', 'orchardq', { postalCode: postalCode, keyword: keyword });
    },
    addCollaborator: function addCollaborator(orchardid, user) {
        return this._call('post', '/orchard/addcollaborator', { orchardid: orchardid, user: user });
    },
    deleteCollaborator: function deleteCollaborator(orchardid, user) {
        return this._call('post', '/orchard/deletecollaborator', { orchardid: orchardid, user: user });
    },
    addPlantation: function addPlantation(orchardid, species, m2, releaseDate, shared) {
        return this._call('post', '/orchard/addplantation', { orchardid: orchardid, species: species, m2: m2, releaseDate: releaseDate, shared: shared });
    },
    deletePlantation: function deletePlantation(orchardid, plantation) {
        return this._call('post', '/orchard/deleteplantation', { orchardid: orchardid, plantation: plantation });
    },
    updatePlantation: function updatePlantation(orchardid, plantation, m2, releaseDate, shared) {
        return this._call('post', '/orchard/updatePlantation', { orchardid: orchardid, plantation: plantation, m2: m2, releaseDate: releaseDate, shared: shared });
    },
    getUsersByOrchard: function getUsersByOrchard(orchardid) {
        return this._call('get', '/orchard/populateusers/' + orchardid);
    },
    retrieveOrchard2: function retrieveOrchard2(id) {
        return this._call('get', 'orchard/' + id);
    }
};

module.exports = api;
