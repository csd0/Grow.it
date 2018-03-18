const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    // const { body: { username, password } } = req
    const { params: { _id } } = req

    // logic.remove(_id, username, password)
    logic.removeOrchard(_id)
        .then(() => {
            res.json(success())
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}