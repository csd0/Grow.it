import React, { Component } from 'react'
import api from '../../api-client'
// import api from 'users-api-client-0'
import './styles/main.css'


class AddCollaborator extends Component {

    constructor() {
        super()

        this.state = {
            orchardId: '',
            searchUser: '',
            collaborators: [],
            usersMatch: []
        }
    }

    componentDidMount() {

        //orchard ID is stored from url path in order to point to specific document
        let pathName = this.props.location.pathname
        let pathNameLength = (this.props.location.pathname).length
        let orchardToRetrieve = pathName.substring(17, pathNameLength)

        this.setState({
            orchardId: orchardToRetrieve,
        })

        //collaborators data are populated and stored 
        this.refreshCollaborators(orchardToRetrieve)

    }

    refreshCollaborators = (orchardId) => {
        api.getUsersByOrchard(orchardId)
            .then(users => {
                let collaborators = users.data.filter((user) => user.role === 'collaborator')
                return collaborators
            })
            .then(collaborators =>
                this.setState({
                    collaborators: collaborators
                }),
        )
            .catch(console.error)
    }

    //Next method fill user search data
    inputField = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }


    anchorClic = () => {
        console.log('anchor click')
    }

    //Search users matching input string 
    searchUser = () => {
        if (this.state.searchUser != '')
            api.searchUser(this.state.searchUser)
                .then(users =>
                    this.setState({
                        usersMatch: users.data
                    }))
                .catch(console.error)
    }

    delete = (user) => {
        api.deleteCollaborator(this.state.orchardId, user)
            .then(() => {
                return this.refreshCollaborators(this.state.orchardId)
            })
            .catch(console.error)

    }

    add = (user) => {
        api.addCollaborator(this.state.orchardId, user)
            .then(() => {
                return this.refreshCollaborators(this.state.orchardId)
            })
            .catch(console.error)

    }



    render() {

        return (
            <div>
                <div className="fields">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.collaborators.map((user, i) =>
                                    <tr className="table-success" key={user._id}>
                                        <th scope="row">{user.user.name}</th>
                                        <td>{user.user.email}</td>
                                        <td><a onClick={() => this.delete(user.user._id)}>❌</a></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <form method="post" onSubmit={(e) => { e.preventDefault(); this.searchUser() }}>
                        <input className="inputCol" type='text' name='searchUser' value={this.state.searchUser} onChange={this.inputField} />
                        <button className="btn btn-success btnCol" type='submit'>Search user</button>
                    </form>

                    {
                        this.state.usersMatch.length > 0 ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Surname</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.usersMatch.map((user, i) =>
                                            <tr className="table-success" key={user._id}>
                                                <th scope="row">{user.name}</th>
                                                <td>{user.surname}</td>
                                                <td><a onClick={() => this.add(user._id)}>➕</a></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            :
                            undefined
                    }

                </div>

            </div>

        )
    }
}

export default AddCollaborator