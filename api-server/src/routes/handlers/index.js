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


module.exports = {
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
    searchOrchard
}