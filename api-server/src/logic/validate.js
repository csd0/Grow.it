function validate(user) {
    for (const prop in user) {
        const value = user[prop]

        if (typeof value === 'undefined' || !value.trim().length) throw Error(`${prop} cannot be undefined or empty`)
    }
}

module.exports = validate