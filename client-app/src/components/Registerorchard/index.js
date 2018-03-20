import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from 'users-api-client-0'
import './styles/main.css'


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
            description: '',
            toSuccess: false,
            toFail: false
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
        .then(res => {res.status === 'OK'?
                    this.setState({toSuccess: true})
                    :
                    this.setState({toFail: true})    
})
    }



    render(){
    if (!this.state.toSuccess && !this.state.toFail) {
    return (
        <form className="form-orchard" action="/registerorchard" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>

            <div className="form-group">
                <input type="text" className="form-control" name='name' placeholder="Name" onChange={this.inputField}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name='location' placeholder="Location"  onChange={this.inputField}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name='m2' placeholder="M2"  onChange={this.inputField}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name='postalCode' placeholder="postal code"  onChange={this.inputField}/>
            </div>
            <div className="checkbox" name='collaborators' onChange={this.checkCollaborators}>
                <label><input type="checkbox" value="" /> Collaborators</label>
            </div>
            <div className="checkbox" name='consulting' onChange={this.checkConsulting}>
                <label><input type="checkbox" value="" /> Consulting</label>
            </div>
            <div className="form-group">
                <textarea className="form-control" rows="2" name='description' placeholder="Description"  onChange={this.inputField}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Save</button>
        </form>
    )}
    else if (this.state.toSuccess){
        return <Redirect to='/register/successreg' />
    }
    else if (this.state.toFail){
        return <Redirect to='/register/failreg' />
    }
}
}

export default Registerorchard