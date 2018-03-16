import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from 'users-api-client-0'
import man from './styles/img/man.png'

class Registeruser extends Component {

    constructor(){
        super()

        this.state = {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            description: '',
            toSuccess: false,
            toFail: false
        }
    }

    //Next 6 methods fill registration required user data

    fillName = (event) => {
        this.setState({ name: event.target.value })
    }

    fillSurname = (event) => {
        this.setState({ surname: event.target.value })
    }

    fillEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    fillUsername = (event) => {
        this.setState({ username: event.target.value})
    }

    fillPassword = (event) => {
        this.setState({ password: event.target.value})
    }

    fillDescription = (event) => {
        this.setState({ description: event.target.value})
    }

    // user registration
    submit = () => {
        api.register(
            this.state.name,
            this.state.surname,
            this.state.email,
            this.state.username,
            this.state.password,
            this.state.description
        )

        .then(res => {res.status === 'OK'?
                    this.setState({toSuccess: true})
                    :
                    this.setState({toFail: true})    
        })
    }


    render() {
    if (!this.state.toSuccess && !this.state.toFail) {
    return (
        <div>
            <form className="form-user" action="/register" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>
                <img src={man} className="img-fluid user-img" alt="Responsive profile" />
                <button type="button" className="btn btn-success">Upload</button>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserName" placeholder="Name" onChange={this.fillName}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserSurName" placeholder="Surname" onChange={this.fillSurname}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserEmail" placeholder="Email" onChange={this.fillEmail}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserUserName" placeholder="Username" onChange={this.fillUsername}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserPassword" placeholder="Password" onChange={this.fillPassword}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="3" id="formUserDescription" placeholder="Description" onChange={this.fillDescription}></textarea>
                </div>
                <button type="submit" className="btn btn-success">Save</button>

            </form>
        </div>
    )
    }
    else if (this.state.toSuccess){
        return <Redirect to='/register/successreg' />
    }
    else if (this.state.toFail){
        return <Redirect to='/register/failreg' />
    }
}
}

export default Registeruser