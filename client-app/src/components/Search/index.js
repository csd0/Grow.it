import React, { Component } from 'react'
import api from '../../api-client'
import './styles/main.css'


class Search extends Component {

    constructor() {
        super()

        this.state = {
            postalCode: '',
            keyword: '',
            searchResults: []
        }
    }


    
    // Next method fill registration user data

    inputField = (e) => {
        let prop = e.target.name
        this.setState({[prop]: e.target.value})
    }


    // Call api method that search orchards

    submit = () => {
        api.searchOrchard(
            this.state.postalCode,
            this.state.keyword
        )
        .then(res => {
            this.setState({searchResults: res.data})
        })
    }


    render() {

        let orchards = this.state.searchResults

        return (
            <div className="container global">
                <div className="searchBar container">
                    <form className="form_search" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>
                        <div className="row align-items-center row-search">
                            
                            <div className="col-lg-4">
                                <input autoComplete="off" type="text" className="form-search form-control" placeholder="Location? Postal code?" name= "postalCode" onChange={this.inputField}/>
                            </div>
                            <div className="col-lg-4">

                                <input autoComplete="off" type="text" className="form-search form-control" placeholder="Plantation? Keyword?" name= "keyword" onChange={this.inputField}/>

                            </div>
                            <div className="col-lg-4">
                                <button className="btn-success btn-search" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="results container">

                    {orchards.map((orchard, i) =>

                        <div className="card cardResult" key={orchard._id}>
                            <h3 className="card-header">{orchard.name}</h3>
                            <div className="card-body">
                                <p className="card-text">{orchard.location}</p>
                                <p className="card-text">{orchard.m2} m2</p>
                                {orchard.admitsCollaborators?
                                <p className="card-text">➕ collaborators</p>
                                 :   
                                undefined
                                }
                                {orchard.admitsConsulting?
                                <p className="card-text">🙋 consulting</p>
                                 :   
                                undefined
                                }
                                <a href={`#/orchard/${orchard._id}`} className="btn btn-success">View</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Search