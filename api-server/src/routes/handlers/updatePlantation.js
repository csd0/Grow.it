const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { orchardid, plantation, m2, releaseDate, shared } } = req

    logic.updatePlantation( orchardid, plantation, m2, releaseDate, shared )
        .then(id => {
            res.json(success({ id }))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}