const mongoose = require('mongoose')
const assert = require('assert')
const { User, Orchard } = require('../src/models')


describe('models', () => {
    before(() => {
        // return mongoose.connect('mongodb://admin:admin@ds219879.mlab.com:19879/growitdb_test')
        return mongoose.connect('mongodb://localhost/grow-it-models-test')
    })
    describe('create an orchard with admin and collaborator', () => {
        let orchard, admin, collaborator

        before(() => {
            admin = new User({
                name: 'name',
                username: 'username-admin'
            })

            orchard = new Orchard({
                name: 'name',
                location: 'location',
                m2: 10,
                users: [
                    {
                        user: admin._id,
                        role: 'admin'
                    }
                ]
            })

            collaborator = new User({
                name: 'name',
                username: 'username-collaborator'
            })

            return Promise.all([
                admin.save().then(_admin => admin = _admin),
                orchard.save().then(_orchard => orchard = _orchard),
                collaborator.save().then(_collaborator => collaborator = _collaborator)
            ])
                .then(() => {
                    orchard.users.push({
                        user: collaborator._id,
                        role: 'collaborator'
                    })

                    return orchard.save()
                })
                .then(_orchard => orchard = _orchard)
                .then(() => {
                    const id = orchard._id.toString()

                    return Orchard.findOne({ _id: id })
                })
                .then(_orchard => orchard = _orchard)
        })

        it('should create an orchard with admin and collaborator', () => {
            assert(admin, 'should admin be created')

            assert(orchard, 'should orchard be created')

            assert(collaborator, 'should collaborator be created')

            assert(orchard.users, 'should orchard have users')

            assert.equal(orchard.users.length, 2, 'should orchard have 1 user')

            const [ userObj, userObj2 ] = orchard.users

            assert.equal(userObj.user.toString(), admin._id.toString(), 'should admin id match')

            assert.equal(userObj.role, 'admin', 'should admin role match')

            assert.equal(userObj2.user.toString(), collaborator._id.toString(), 'should collaborator id match')

            assert.equal(userObj2.role, 'collaborator', 'should collaborator role match')
        })
    })

    after(done => {
        return mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})