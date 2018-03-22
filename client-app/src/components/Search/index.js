import React, { Component } from 'react'
import api from 'users-api-client-0'
import './styles/main.css'


class Search extends Component {

    constructor() {
        super()

        this.state = {
            orchards: [],
            postalCode: '',
            keyword: '',
            searchResults: []
        }
    }


    componentDidMount() {
        api.listOrchard()
            .then(orchards => this.setState({ orchards: orchards.data }))
            .catch(console.error)
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
            <div>
                <div className="searchBar container">
                    <form className="form_search" method="post" onSubmit={(e) => {e.preventDefault(); this.submit()}}>
                        <div className="row align-items-center">
                            
                            <div className="col-lg-4">
                                <input type="text" maxLength="5" className="form-search" placeholder="Location? Postal code?" name= "postalCode" onChange={this.inputField}/>
                            </div>
                            <div className="col-lg-4">

                                <input type="text" className="form-search" placeholder="Plantation? Keyword?" name= "keyword" onChange={this.inputField}/>

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
                                <a href={`#/orchard/${orchard._id}`} className="btn btn-success">Go</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Search