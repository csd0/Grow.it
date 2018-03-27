const login = require('./login')
const list = require('./list')
const create = require('./create')
const update = require('./update')
const _delete = require('./delete')
const retrieve = require('./retrieve')
const searchUser = require('./searchUser')

const listOrchard = require('./listOrchard')
const createOrchard = require('./createOrchard')
const updateOrchard = require('./updateOrchard')
const deleteOrchard = require('./deleteOrchard')
const retrieveOrchard = require('./retrieveOrchard')
const searchOrchard = require('./searchOrchard')
const addCollaborator = require('./addCollaborator')
const deleteCollaborator = require('./deleteCollaborator')
const addPlantation = require('./addPlantation')
const deletePlantation = require('./deletePlantation')
const updatePlantation = require('./updatePlantation')
const getUsersByOrchard = require('./getUsersByOrchard')


module.exports = {
    login,
    list,
    create,
    update,
    delete: _delete,
    retrieve,
    searchUser,
    listOrchard,
    createOrchard,
    updateOrchard,
    deleteOrchard,
    retrieveOrchard,
    searchOrchard,
    addCollaborator,
    deleteCollaborator,
    addPlantation,
    deletePlantation,
    updatePlantation,
    getUsersByOrchard
}