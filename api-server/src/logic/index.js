const { User, Orchard } = require('../models')
const validate = require('./validate')
const uuid = require('uuid/v4')

module.exports = {

    /////////// USERS ///////////////

    verify(username, password) {
        return Promise.resolve()
            .then(() => {
                validate({ username, password })

                return User.findOne({ username, password })
            })
            .then(user => {
                if (!user) throw Error('username and/or password wrong')

                return user.id
            })
    },
    
    list() {
        return User.find({}, { _id: 0, id: 1, name: 1, surname: 1, email: 1, username: 1 })
    },


    register(name, surname, email, username, password, description) {
        return Promise.resolve()
            .then(() => {
                validate({ name, surname, email, username, password })

                return User.findOne({ username })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                const id = uuid()

                return User.create({ id, name, surname, email, username, password, description })
                    .then(() => id)
            })
    },


    update(_id, name, surname, email, username, password, newUsername, newPassword, description) {
        return Promise.resolve()
            .then(() => {
                validate({ _id, name, surname, email, username, password, newUsername, newPassword, description })

                return User.findOne({ username: newUsername })
            })
            .then(user => {
                if (user) throw Error('username already exists')

                return User.findOne({ _id: _id })
            })
            .then(user => {
                if (!user) throw Error('user does not exists')

                if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                //return User.updateOne({ id }, { $set: { name, surname, email, username: newUsername, password: newPassword } }) // NOTE $set also works here, but it can be simplified as following statement
                return User.updateOne({ _id }, { name, surname, email, username: newUsername, password: newPassword, description })
            })
    },


    retrieve(_id) {
        return Promise.resolve()
            .then(() => {
                validate({ _id })

                //return User.findOne({ id }, 'id name surname email username') // WARN! it returns _id too!
                return User.findOne({ _id: _id }, { _id: 0, password: 0 })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                return user
            })
    },


    remove(_id, username, password) {
        return Promise.resolve()
            .then(() => {
                validate({ _id, username, password })

                return User.findOne({ _id: _id })
            })
            .then(user => {
                if (!user) throw Error('user does not exist')

                if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                return User.deleteOne({ _id })
            })
    },


    searchUser(query) {
        return Promise.resolve()
            .then(() => {
              
                let regExUser = new RegExp(query, "i")

                return User.find( { $or: [ 
                    {  name: regExUser}, 
                    {  surname: regExUser },
                    {  email: regExUser },
                    {  username: regExUser },
                    {  description: regExUser }
                ] } )
                
            })
            .then(user => {
                if (!user) throw Error('no results for specified search')

                return user
            })
    },



    /////////// ORCHARDS ///////////////

    listOrchard() {
        return Orchard.find()
    },


    registerOrchard(name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description){
        return Promise.resolve()
            .then(() => {
                validate({ name, location, m2, postalCode})

                return Orchard.findOne({ name })
            })
            .then(orchard => {
                if (orchard) throw Error('orchard already exists')

                const id = uuid()

                return Orchard.create({ name, location, m2, postalCode, admitsCollaborators, admitsConsulting, description })
                    .then(() => id)
            })
    },


    updateOrchard ( _id, newName, newLocation, newM2,newPostalCode ,newAdmitsCollaborators, newAdmitsConsulting, newDescription ) {
        return Promise.resolve()
            .then(() => {
                validate({ _id, newName, newLocation, newM2, newPostalCode, newDescription })

                return Orchard.findOne({ name: newName })
            })
            .then(orchard => {
                if (!orchard) throw Error('orchard does not exists')

                return Orchard.updateOne({ _id }, { name: newName, location: newLocation, m2: newM2, postalCode: newPostalCode, admitsCollaborators: newAdmitsCollaborators, admitsConsulting: newAdmitsConsulting, description: newDescription })
            })
    },
    
    retrieveOrchard(_id) {
        return Promise.resolve()
            .then(() => {
                validate({ _id })

                return Orchard.findOne({ _id: _id })
            })
            .then(orchard => {
                if (!orchard) throw Error('orchard does not exist')

                return orchard
            })
    },


    removeOrchard(_id) {
        return Promise.resolve()
            .then(() => {
                validate({ _id })

                return Orchard.findOne({ _id: _id })
            })
            .then(orchard => {
                if (!orchard) throw Error('orchard does not exist')

                // if (user.username !== username || user.password !== password) throw Error('username and/or password wrong')

                return Orchard.deleteOne({ _id })
            })
    },

    searchOrchard( postalCode, keyword ) {
        return Promise.resolve()
            .then(() => {
                
                let regExPc = new RegExp( postalCode, "i" )
                let regExKey = new RegExp( keyword, "i" )

                return Orchard
                .find({
                    $and: [
                        {$or: [
                             { name: regExKey },
                             { description: regExKey },
                             {'plantations.species': regExKey }
                        ]},
                        {$or: [
                             { postalCode: regExPc },
                             { location: regExPc }
                        ]}
                        
                    ]
                })
                
            })
            .then(orchards => {
                if (!orchards) throw Error('no results for specified search')

                return orchards
            })
    },



    addCollaborator ( orchardid, user ) {
        return Promise.resolve()

            .then(() => {

                return Orchard.findOne({ "_id" : orchardid })

            })

            .then(orchard => {
                
                let flag = false
                for (i in orchard.users){
                    if(orchard.users[i].user == user)
                    {
                        flag = true}
                    }
                    if (flag) throw Error('User is already a collaborator')
                    
                 if (orchard.users.length === 0)
                     return Orchard.update({ "_id": orchardid },
                    {$push: {users: {user: user,  role: 'admin'}}})
                else
                     return Orchard.update({ "_id": orchardid },
                     {$push: {users: {user: user,  role: 'collaborator'}}})

            })

            
    },

    
    deleteCollaborator ( orchardid, user ) {
        return Promise.resolve()

            .then(() => {

                return Orchard.update({ "_id": orchardid },
                {$pull: {users: {user: user}}})
            })
            
    },


    addPlantation ( orchardid, species, m2, releaseDate, shared ) {
        return Promise.resolve()

        .then(() => {
            return Orchard.findOne({ "_id" : orchardid })
        })

        .then(orchard => {
            
            let flag = false
            for (i in orchard.plantations){
                if(orchard.plantations[i].species == species)
                {flag = true}
            }
            return flag
        })

        .then((flag) => {
            if (flag) throw Error('Plantation already exists')

            return Orchard.update({ "_id": orchardid },
            {$push: {plantations: {species: species,  m2: m2, releaseDate: releaseDate, shared: shared}}})
        })
    },


    deletePlantation(orchardid, plantation){
        return Promise.resolve()

        .then(() => {

            return Orchard.update({ "_id": orchardid },
            {$pull: {plantations: {_id: plantation}}})
        })
    },

    updatePlantation( orchardid, plantation, m2, releaseDate, shared ){
        return Promise.resolve()

        .then(() => {

            return Orchard.update({ "_id": orchardid, "plantations._id": plantation },
            {$set: {"plantations.$.m2": m2, "plantations.$.releaseDate": releaseDate, "plantations.$.shared": shared}})
        })
    },

    getUsersByOrchard( orchardid ) {
        return new Promise((resolve, reject)=> {
            Orchard.find({  _id: orchardid }).then(orchard=>{
                User.populate(orchard, {path: 'users.user'})
                .then(resolve)
            })
            .catch(reject)
        })
    }  


}