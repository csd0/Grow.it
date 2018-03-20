const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { postalCode, keyword } } = req
    logic.searchOrchard( postalCode, keyword )
        .then(orchards => {
            res.json(success(orchards))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}