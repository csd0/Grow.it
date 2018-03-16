import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from 'users-api-client-0'


class Registerorchard extends Component {

    constructor(){
        super()

        this.state = {
            name: '',
            location: '',
            m2: '',
            collaborators : false,
            consulting: false,
            description: '',
            toSuccess: false,
            toFail: false
        }
    }

    //Next 6 methods fill registration required user data

    fillName = (event) => {
        this.setState({ name: event.target.value })
    }

    fillLocation = (event) => {
        this.setState({ location: event.target.value })
    }

    fillm2 = (event) => {
        this.setState({ m2: event.target.value })
    }

    fillCollaborators = (event) => {
        let currentValue = this.state.collaborators
        this.setState({ collaborators: !currentValue })
    }

    fillConsulting = (event) => {
        let currentValue = this.state.consulting
        this.setState({ consulting: !currentValue })
    }

    fillDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    //orchard registration
    submit = () => {
        api.registerOrchard(
            this.state.name,
            this.state.location,
            this.state.m2,
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
                <input type="text" className="form-control" id="formOrchardName" placeholder="Name" onChange={this.fillName}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formOrchardLocation" placeholder="Location"  onChange={this.fillLocation}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formOrchardM2" placeholder="M2"  onChange={this.fillm2}/>
            </div>
            <div className="checkbox"  onChange={this.fillCollaborators}>
                <label><input type="checkbox" value="" /> Collaborators</label>
            </div>
            <div className="checkbox"  onChange={this.fillConsulting}>
                <label><input type="checkbox" value="" /> Consulting</label>
            </div>
            <div className="form-group">
                <textarea className="form-control" rows="2" id="formOrchardDescription" placeholder="Description"  onChange={this.fillDescription}></textarea>
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