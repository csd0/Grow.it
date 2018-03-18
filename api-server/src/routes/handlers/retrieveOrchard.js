const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { _id } } = req

    logic.retrieveOrchard(_id)
        .then(orchard => {
            res.json(success(orchard))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}