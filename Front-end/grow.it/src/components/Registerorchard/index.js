import React from 'react'


function Registerorchard() {

    return (
        <form className="form-orchard">

            <div className="form-group">
                <input type="text" className="form-control" id="formOrchardName" placeholder="Name" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formOrchardLocation" placeholder="Location" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formOrchardM2" placeholder="M2" />
            </div>
            <div className="checkbox">
                <label><input type="checkbox" value="" /> Collaborators</label>
            </div>
            <div className="checkbox">
                <label><input type="checkbox" value="" /> Consulting</label>
            </div>
            <div className="form-group">
                <textarea className="form-control" rows="2" id="formOrchardDescription" placeholder="Description"></textarea>
            </div>
            <button type="submit" className="btn btn-success">Save</button>
        </form>

    )

}

export default Registerorchard