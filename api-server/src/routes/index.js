const { Router } = require('express')
const bodyParser = require('body-parser')
const { list, listOrchard, create, createOrchard, update, delete: _delete, retrieve } = require('./handlers')

const router = Router()

router.get('/users', list)

router.get('/orchards', listOrchard)

const jsonBodyParser = bodyParser.json()

router.post('/user', jsonBodyParser, create)

router.post('/orchard', jsonBodyParser, createOrchard)

router.put('/user/:id', jsonBodyParser, update)

router.delete('/user/:id', jsonBodyParser, _delete)

router.get('/user/:id', retrieve)

module.exports = router