const { success, fail } = require('./api-utils')
const logic = require('../../logic')

module.exports = (req, res) => {
    logic.listOrchard()
        .then(orchards => res.json(success(orchards)))
        .catch(err => res.json(fail(err.message)))
}