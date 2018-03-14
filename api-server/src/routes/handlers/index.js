const list = require('./list')
const listOrchard = require('./listOrchard')
const create = require('./create')
const update = require('./update')
const _delete = require('./delete')
const retrieve = require('./retrieve')
//...

module.exports = {
    list,
    listOrchard,
    create,
    update,
    delete: _delete,
    retrieve
}