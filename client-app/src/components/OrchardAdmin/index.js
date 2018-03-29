import React, { Component } from 'react'
import api from '../../api-client'
import './styles/main.css'
import swal from 'sweetalert2'


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
                    id: orchard.data._id,
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
            .then(res => {
                res.status === 'OK' ?

                    (swal({
                        type: 'success',
                        title: 'orchard updated',
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
    }

    deleteOrchard = () => {


        (swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.value) {
                    api.removeOrchard(this.state.id)
                        .then(res => {
                            res.status === 'OK' ?
                                swal(
                                    'Deleted!',
                                    'Your orchard has been deleted.',
                                    'success'
                                )
                                :
                                (swal({
                                    type: 'error',
                                    title: res.error,
                                    showConfirmButton: false,
                                    timer: 1500
                                }))
                            let flagStatus = res.status
                            return flagStatus
                        })
                        .then(flagStatus => {
                            flagStatus === 'OK' ?
                                this.props.history.push('/search')
                                :
                                undefined
                        })

                }
            }))

    }



    render() {

        return (
            <div className="orchard-admin">
                <div className="container global-admin">
                    <form className="form-orchard" method="post" onSubmit={(e) => { e.preventDefault(); this.updateDetails() }}>

                        <input type="text" className="form-control" name='name' placeholder="Name" value={this.state.name} onChange={this.inputField} readOnly/>
                        <input type="text" className="form-control" name='location' placeholder="Location" value={this.state.location} onChange={this.inputField} />
                        <input type="number" className="form-control" name='m2' placeholder="M2" value={this.state.m2} onChange={this.inputField} />
                        <input type="number" className="form-control" name='postalCode' placeholder="postal code" value={this.state.postalCode} onChange={this.inputField} />
                        <div className="checkbox" name='collaborators' value={this.state.collaborators} onChange={this.checkCollaborators}>
                            <label><input type="checkbox" checked={this.state.collaborators} /> Collaborators</label>
                        </div>
                        <div className="checkbox" name='consulting' value={this.state.consulting} onChange={this.checkConsulting}>
                            <label><input type="checkbox" checked={this.state.consulting} /> Consulting</label>
                        </div>
                        <textarea className="form-control" rows="2" name='description' placeholder="Description" value={this.state.description} onChange={this.inputField}></textarea>
                        <button type="submit" className="btn btn-success">Update details</button>
                    </form>

                    <div className="form-group">
                        <div className="management-btn">
                            <button className="btn btn-success" onClick={() => this.props.history.push(`/managecollaborators/${this.state.orchard._id}`)}>Manage collaborators</button>
                            <button className="btn btn-success" onClick={() => this.props.history.push(`/manageplantations/${this.state.orchard._id}`)}>Manage plantations</button>
                        </div>
                        <div className="delete-btn">
                            <button className="btn btn-danger" onClick={this.deleteOrchard}>Delete orchard</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrchardAdmin