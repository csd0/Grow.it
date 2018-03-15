import React, { Component } from 'react'
import api from 'users-api-client-0'


class Search extends Component {

    constructor (){
        super()

        this.state = {
            orchards: []
        }
    }

    componentDidMount() {
        api.listOrchard()
            .then(orchards => this.setState({ orchards: orchards.data }))
            .catch(console.error)
    }



    render(){

        let orchards = this.state.orchards

    return(
        <div>
    <div className="searchBar container">
        <div className="row align-items-center">
            <div className="col-lg-4">
                <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle searchDropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Activity
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <a className="dropdown-item" href="#!">Action</a>
                        <a className="dropdown-item" href="#!">Another action</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle searchDropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Location
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <a className="dropdown-item" href="#!">Action</a>
                        <a className="dropdown-item" href="#!">Another action</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle searchDropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Plantation
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <a className="dropdown-item" href="#!">Action</a>
                        <a className="dropdown-item" href="#!">Another action</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="results container">
        
        {/* {orchards.map((orchard, i) => <h4>{orchard.name}</h4>)} */}
        {orchards.map((orchard, i) => 
        
        <div className="card cardResult">
                            <h3 className="card-header">{orchard.name}</h3>
                            <div className="card-body">
                              <p className="card-text">{orchard.location}</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
        </div>
        )}

        {/* <div className="row align-items-center">
            <div className="col-lg-4">
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
            </div>
            <div className="col-lg-4">
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
            </div>
            <div className="col-lg-4">
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card cardResult">
                            <h3 className="card-header">Featured</h3>
                            <div className="card-body">
                              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                              <a href="#!" className="btn btn-success">Go somewhere</a>
                            </div>
                    </div>
            </div>
        </div> */}
    </div>
  </div>
    )
}
}

export default Search