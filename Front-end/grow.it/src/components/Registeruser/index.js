import React from 'react'
import man from './styles/img/man.png'

function Registeruser () {

    return (
        <div>
            <form className="form-user">
                <img src={man} className="img-fluid user-img" alt="Responsive profile" />
                <button type="button" className="btn btn-success">Upload</button>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserName" placeholder="Name" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserLastName" placeholder="Lastname" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserEmail" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserUserName" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="formUserPassword" placeholder="Password" />
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="3" id="formUserDescription" placeholder="Description"></textarea>
                </div>
                <button type="submit" className="btn btn-success">Save</button>

            </form>
        </div>
    )
}

export default Registeruser