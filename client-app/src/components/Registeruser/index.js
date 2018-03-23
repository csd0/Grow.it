import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../api-client'
// import api from 'users-api-client-0'
import man from './styles/img/man.png'
import './styles/main.css'
import swal from 'sweetalert2'


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

    //Next method fill registration user data

    inputField = (e) => {
        let prop = e.target.name
        this.setState({[prop]: e.target.value})
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
        
                    (swal({
                        type: 'success',
                        title: 'user registered',
                        showConfirmButton: false,
                        timer: 1500
                    }))
                    :
                    (swal({
                        type: 'error',
                        title: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }))
                })                    
            }


    render()

    {if (!this.state.toSuccess && !this.state.toFail) {
    return (
        <div>
            <form className="form-user" action="/register" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>
                <img src={man} className="img-fluid user-img" alt="Responsive profile" />
                <button type="button" className="btn btn-success">Upload</button>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.inputField}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="surname" placeholder="Surname" onChange={this.inputField}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="email" placeholder="Email" onChange={this.inputField}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.inputField}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="password" placeholder="Password" onChange={this.inputField}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="3" name="description" placeholder="Description" onChange={this.inputField}></textarea>
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