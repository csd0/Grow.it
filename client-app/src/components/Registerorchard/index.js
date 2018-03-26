import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../api-client'
import './styles/main.css'
import swal from 'sweetalert2'
import plant from './styles/img/plant.png'


class Registerorchard extends Component {

    constructor(){
        super()

        this.state = {
            name: '',
            location: '',
            m2: '',
            postalCode: '',
            collaborators : false,
            consulting: false,
            description: ''
        }
    }

          
    //Next method fill registration orchard data
    inputField = (e) => {
        let prop = e.target.name
        this.setState({[prop]: e.target.value})
    }


    // flip-over checkbox values on change
    checkCollaborators = (e) => {
        let currentValue = this.state.collaborators
        this.setState({ collaborators: !currentValue })
    }

    checkConsulting = (e) => {
        let currentValue = this.state.consulting
        this.setState({ consulting: !currentValue })
    }

    
    //orchard registration
    submit = () => {
        api.registerOrchard(
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
                    title: 'orchard registered',
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



    render(){
    if (!this.state.toSuccess && !this.state.toFail) {
    return (
        <div className="container">
        <form className="form-orchard" action="/registerorchard" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>
                <img src={plant} className="img-fluid plant-img" alt="Responsive profile" />
                <input autoComplete="off" type="text" className="form-control" name='name' placeholder="Name" onChange={this.inputField}/>
                <input autoComplete="off" type="text" className="form-control" name='location' placeholder="Location"  onChange={this.inputField}/>
                <input autoComplete="off" type="number" className="form-control" name='m2' placeholder="M2"  onChange={this.inputField}/>
                <input autoComplete="off" type="number" className="form-control" name='postalCode' placeholder="postal code"  onChange={this.inputField}/>
            <div className="checkbox" name='collaborators' onChange={this.checkCollaborators}>
                <label><input type="checkbox" value="" /> Collaborators</label>
            </div>
            <div className="checkbox" name='consulting' onChange={this.checkConsulting}>
                <label><input type="checkbox" value="" /> Consulting</label>
            </div>
                <textarea autoComplete="off" className="form-control" rows="2" name='description' placeholder="Description"  onChange={this.inputField}></textarea>
            <button type="submit" className="btn btn-success">Save</button>
        </form>
        </div>
    )}
    
}
}

export default Registerorchard