import React, { Component } from 'react'
import api from '../../api-client'
// import api from 'users-api-client-0'
import './styles/main.css'


class OrchardAdmin extends Component {

    constructor() {
        super()

        this.state = {
            orchard: [],
            plantations: [],
            users: [],
            id: '',
            name: '',
            location: '',
            m2: '',
            postalCode: '',
            collaborators: false,
            consulting: false,
            description: ''
        }
    }

    componentDidMount() {

        //orchard ID is stored from url path in order to point to specific document
        let pathName = this.props.location.pathname
        let pathNameLength = (this.props.location.pathname).length
        let orchardToRetrieve = pathName.substring(14, pathNameLength)


        api.retrieveOrchard(orchardToRetrieve)
            .then(orchard =>
                this.setState({
                    orchard: orchard.data,
                    plantations: orchard.data.plantations,
                    users: orchard.data.users,
                    id : orchard.data._id,
                    name: orchard.data.name,
                    location: orchard.data.location,
                    m2: orchard.data.m2,
                    postalCode: orchard.data.postalCode,
                    collaborators: orchard.data.admitsCollaborators,
                    consulting: orchard.data.admitsConsulting,
                    description: orchard.data.description
                }))
            .catch(console.error)
    }

    //Next method fill registration orchard data
    inputField = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }

    // flip-over checkbox values on change
    checkCollaborators = (e) => {
        this.setState({ collaborators: !this.state.collaborators })
    }

    checkConsulting = (e) => {
        this.setState({ consulting: !this.state.consulting })
    }


    updateDetails = () => {

        console.log('update details')

        api.updateOrchard(
            this.state.id,
            this.state.name,
            this.state.location,
            this.state.m2,
            this.state.postalCode,
            this.state.collaborators,
            this.state.consulting,
            this.state.description
        )
        // TO DO confirm/error with sweetakerts
        .then(res => console.log(res))
        .catch(console.error)
    }


    deleteOrchard = () => {
        api.removeOrchard(this.state.id)
        // TO DO confirm/error with sweetakerts
        .then(res => console.log(res))
        .catch(console.error)
    }


    render() {

        return (

            <div>
                <form className="form-orchard" method="post" onSubmit={(e) => { e.preventDefault(); this.updateDetails() }}>

                    <div className="form-group">
                        <input type="text" className="form-control" name='name' placeholder="Name" value={this.state.name} onChange={this.inputField} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name='location' placeholder="Location" value={this.state.location} onChange={this.inputField} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name='m2' placeholder="M2" value={this.state.m2} onChange={this.inputField} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name='postalCode' placeholder="postal code" value={this.state.postalCode} onChange={this.inputField} />
                    </div>
                    <div className="checkbox" name='collaborators' value={this.state.collaborators} onChange={this.checkCollaborators}>
                        <label><input type="checkbox" checked={this.state.collaborators} /> Collaborators</label>
                    </div>
                    <div className="checkbox" name='consulting' value={this.state.consulting} onChange={this.checkConsulting}>
                        <label><input type="checkbox" checked={this.state.consulting} /> Consulting</label>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows="2" name='description' placeholder="Description" value={this.state.description} onChange={this.inputField}></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Update details</button>
                </form>

                <div className="form-group">

                    <button className="btn btn-success" onClick={this.deleteOrchard}>Delete orchard</button>
                    <button className="btn btn-success" onClick={() =>  this.props.history.push(`/addcollaborator/${this.state.orchard._id}`)}>Manage collaborators</button>
                    <button className="btn btn-success" onClick={() =>  this.props.history.push(`/manageplantations/${this.state.orchard._id}`)}>Manage plantations</button>
                
                </div>
            </div>
        )
    }
}

export default OrchardAdmin