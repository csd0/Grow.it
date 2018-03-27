const { Router } = require('express')
const bodyParser = require('body-parser')
const { login, list, create, update, delete: _delete, retrieve, searchUser, listOrchard, createOrchard, updateOrchard, deleteOrchard, retrieveOrchard, searchOrchard,addCollaborator, deleteCollaborator, addPlantation, deletePlantation, updatePlantation, getUsersByOrchard } = require('./handlers')
const jwtValidator = require('../routes/handlers/jwtValidator')

const router = Router()
const jsonBodyParser = bodyParser.json()




//////////// USERS /////////////////
router.post('/login', jsonBodyParser, login)
router.get('/users', list)
router.post('/user', jsonBodyParser, create)
router.put('/user/:_id', jsonBodyParser, update)
router.delete('/user/:_id', jsonBodyParser, _delete)
router.get('/user/:_id', retrieve)
router.get('/userq/:query', searchUser)

//TODO : Associate jwtValidator to routes
// router.delete('/user/:id', [jwtValidator, jsonBodyParser], _delete)

// router.get('/user/:id', jwtValidator, retrieve)



//////////// ORCHARDS /////////////////
router.get('/orchards', listOrchard)
router.post('/orchard', jsonBodyParser, createOrchard)
router.put('/orchard/:_id', jsonBodyParser, updateOrchard)
router.delete('/orchard/:_id', jsonBodyParser, deleteOrchard)
router.get('/orchard/:_id', retrieveOrchard)
router.post('/orchardq', jsonBodyParser, searchOrchard)
router.post('/orchard/addcollaborator', jsonBodyParser, addCollaborator)
router.post('/orchard/deletecollaborator', jsonBodyParser, deleteCollaborator)
router.post('/orchard/addplantation', jsonBodyParser, addPlantation)
router.post('/orchard/deleteplantation', jsonBodyParser, deletePlantation)
router.post('/orchard/updateplantation', jsonBodyParser, updatePlantation)
router.get('/orchard/populateusers/:orchardid', getUsersByOrchard)

module.exports = router