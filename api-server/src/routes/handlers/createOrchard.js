const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description } } = req

    logic.registerOrchard(name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description)
        .then(id => {
            res.json(success({ id }))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}