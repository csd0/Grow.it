import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../api-client'
import farmers from './styles/img/farmers.png'
import './styles/main.css'
import swal from 'sweetalert2'


class Registeruser extends Component {

    constructor() {
        super()

        this.state = {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            description: ''
        }
    }


    //Next method fill registration user data

    inputField = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
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
            .then(res => {
            res.status === 'OK' ?

                (swal({
                    type: 'success',
                    title: 'user registered',
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


    render() {


        return (
            <div className="container">
                <form className="form-user" action="/register" method="post" onSubmit={(e) => { e.preventDefault(); this.submit() }}>
                    <img src={farmers} className="img-fluid user-img" alt="Responsive profile" />
                    <input autoComplete="off" type="text" className="form-control" name="name" placeholder="Name" onChange={this.inputField} />
                    <input autoComplete="off" type="text" className="form-control" name="surname" placeholder="Surname" onChange={this.inputField} />
                    <input autoComplete="off" type="text" className="form-control" name="email" placeholder="Email" onChange={this.inputField} />
                    <input autoComplete="off" type="text" className="form-control" name="username" placeholder="Username" onChange={this.inputField} />
                    <input autoComplete="off" type="password" className="form-control" name="password" placeholder="Password" onChange={this.inputField} />
                    <textarea autoComplete="off" className="form-control" rows="3" name="description" placeholder="Description" onChange={this.inputField}></textarea>
                    <button type="submit" className="btn btn-success">Save</button>

                </form>
            </div>
        )

    }

}


export default Registeruser