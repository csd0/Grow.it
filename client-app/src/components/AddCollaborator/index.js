import React, { Component } from 'react'
import api from 'users-api-client-0'
import './styles/main.css'


class AddCollaborator extends Component {

    constructor() {
        super()

        this.state = {
            orchardId: '',
            searchUser: '',
            users: [],
            usersMatch: []
        }
    }

    componentDidMount() {

        //orchard ID is stored from url path in order to point to specific document
        let pathName = this.props.location.pathname
        let pathNameLength = (this.props.location.pathname).length
        let orchardToRetrieve = pathName.substring(17, pathNameLength)

        api.retrieveOrchard(orchardToRetrieve)
        .then(orchard =>
            this.setState({
                orchardId: orchardToRetrieve,
                users: orchard.data.users
            }))
        .catch(console.error)
    }

    //Next method fill user search data
    inputField = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }

    submit = () => {
        console.log('submit')
    }

    anchorClic = () => {
        console.log('anchor click')
    }

    searchUser = () => {
        api.searchUser(this.state.searchUser)
        .then(users =>
            this.setState({
                usersMatch: users.data
            }))
        .catch(console.error)
    }




    render() {

        return (
            <div>
                <div className="fields">
                <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((user, i) =>
                                            <tr className="table-success" key={i}>
                                                <th scope="row">{user.rol}</th>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                    <form method="post" onSubmit={(e) => { e.preventDefault(); this.submit() }}>
                        <input className="inputCol" type='text' name='searchUser' value={this.state.searchUser} onChange={this.inputField} />
                        <button className="btn btn-success btnCol" type='submit' onClick={() => this.searchUser()} >Search user</button>
                    </form>
                    <div className="list-group">
                        {
                        this.state.usersMatch.length>0?
                        this.state.usersMatch.map((user, i)  =>                                     
                        <a className="list-group-item list-group-item-action list-group-item-success" onClick={()=> this.anchorClic()}>{user.email}</a>)
                        :
                        undefined
                        }   
                        <button className="btn btn-success btnCol" >Add collaborator</button>   
                        <button className="btn btn-success btnCol" >Delete Collaborator</button>               
                    </div>
                </div>
                
            </div>

        )
    }
}

export default AddCollaborator