const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { newName, newLocation, newM2, newPostalCode, newAdmitsCollaborators, newAdmitsConsulting, newDescription } } = req
    const { params: { _id } } = req

    logic.updateOrchard(_id, newName, newLocation, newM2, newPostalCode, newAdmitsCollaborators, newAdmitsConsulting, newDescription)
        .then(() => {
            res.json(success())
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}