import React from 'react'
import './styles/main.css'


function Login() {

    return (

        <form className="form-login">
            <div className="form-group">
                <input type="text" className="form-control" id="formLoginName" placeholder="Username" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formLoginLastName" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-success">Log in</button>

        </form>
    )
}

export default Login