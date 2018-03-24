const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { orchardid } } = req

    logic.getUsersByOrchard(orchardid)
        .then(data => {
            res.json(success(data[0].users))
        })
        .catch(err => {
            res.json(fail(err.message))
        })
}