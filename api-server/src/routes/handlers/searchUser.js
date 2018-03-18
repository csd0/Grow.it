const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { query } } = req

    logic.searchUser(query)
        .then(users => {
            res.json(success(users))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}