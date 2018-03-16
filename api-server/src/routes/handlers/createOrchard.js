const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, location, m2, collaborators, consulting, description } } = req

    logic.registerOrchard(name, location, m2, collaborators, consulting, description)
        .then(id => {
            res.json(success({ id }))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}