import React, { Component } from 'react'
import api from '../../api-client'
import './styles/main.css'
import swal from 'sweetalert2'

class ManageCollaborators extends Component {

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
        let orchardToRetrieve = pathName.substring(21, pathNameLength)
        

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


        (swal({
            title: 'Are you sure?',
            text: "This action remove collaborator from your orchard!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.value) {
                    api.deleteCollaborator(this.state.orchardId, user)
                        .then(res => {
                            res.status === 'OK' ?
                                swal(
                                    'Deleted!',
                                    'Collaborator has been removed.',
                                    'success'
                                )
                                :
                                (swal({
                                    type: 'error',
                                    title: res.error,
                                    showConfirmButton: false,
                                    timer: 1500
                                }))

                        })
                        .then(() => {
                            return this.refreshCollaborators(this.state.orchardId)
                        })

                }
            })
        )

    }



    add = (user) => {
        api.addCollaborator(this.state.orchardId, user)

            .then(res => {
                res.status === 'OK' ?

                    (swal({
                        type: 'success',
                        title: 'user is now a collaborator',
                        showConfirmButton: false,
                        timer: 1500
                    }))
                    :
                    (swal({
                        type: 'error',
                        title: res.error,
                        showConfirmButton: false,
                        timer: 1500
                    }))
            })

            .then(() => {
                return this.refreshCollaborators(this.state.orchardId)
            })

    }



    render() {

        return (
            <div className="container-fluid">
                <div className="row fields">
                    <div className="col-lg-5">
                    <h1 className="collaborators_title">Collaborators</h1>
                        <table className="table coltable">
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
                                            <td><a className="action_links" onClick={() => this.delete(user.user._id)}>❌</a></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-1">
                    </div>
                    <div className="col-lg-5">
                        <form className="form_searchcol" method="post" onSubmit={(e) => { e.preventDefault(); this.searchUser() }}>
                            <input className="inputCol form-control" type='text' name='searchUser' value={this.state.searchUser} onChange={this.inputField} autoComplete="off"/>
                            <button className="btn btn-success btnCol" type='submit'>Search user</button>
                        </form>

                        {
                            this.state.usersMatch.length > 0 ?
                                <table className="table add-users">
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
                                                    <td><a className="action_links" onClick={() => this.add(user._id)}>➕</a></td>
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

            </div>
        )
    }
}

export default ManageCollaborators