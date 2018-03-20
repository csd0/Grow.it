const { Router } = require('express')
const bodyParser = require('body-parser')
const { list, create, update, delete: _delete, retrieve, searchUser, listOrchard, createOrchard, updateOrchard, deleteOrchard, retrieveOrchard, searchOrchard } = require('./handlers')

const router = Router()
const jsonBodyParser = bodyParser.json()




//////////// USERS /////////////////
router.get('/users', list)
router.post('/user', jsonBodyParser, create)
router.put('/user/:_id', jsonBodyParser, update)
router.delete('/user/:_id', jsonBodyParser, _delete)
router.get('/user/:_id', retrieve)
router.get('/userq/:query', searchUser)


//////////// ORCHARDS /////////////////
router.get('/orchards', listOrchard)
router.post('/orchard', jsonBodyParser, createOrchard)
router.put('/orchard/:_id', jsonBodyParser, updateOrchard)
router.delete('/orchard/:_id', jsonBodyParser, deleteOrchard)
router.get('/orchard/:_id', retrieveOrchard)
router.post('/orchardq', jsonBodyParser, searchOrchard)

module.exports = router