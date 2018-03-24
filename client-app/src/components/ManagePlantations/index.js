import React, { Component } from 'react'
import api from '../../api-client'
import Moment from 'react-moment';
import './styles/main.css'


class ManagePlantations extends Component {

    constructor() {
        super()

        this.state = {
            orchardId: '',
            plantations: [],
            selectedPlantationId: '',
            selectedPlantationSpecies: '',
            selectedPlantationM2: '',
            selectedPlantationReleaseDate: '',
            selectedPlantationShared: '',
            newPlantationSpecies: '',
            newPlantationM2: '',
            newPlantationReleaseDate: '',
            newPlantationShared: ''


        }
    }

    componentDidMount() {

        //orchard ID is stored from url path in order to point to specific document
        let pathName = this.props.location.pathname
        let pathNameLength = (this.props.location.pathname).length
        let orchardToRetrieve = pathName.substring(19, pathNameLength)

        this.refreshPlantations(orchardToRetrieve)

        this.setState({
            orchardId: orchardToRetrieve
        })

    }


    //Next method map to states forms data
    inputField = (e) => {
        let prop = e.target.name
        this.setState({ [prop]: e.target.value })
    }


    refreshPlantations = (id) => {
        api.retrieveOrchard(id)
            .then(orchard =>
                this.setState({
                    plantations: orchard.data.plantations
                }),
        )
            .catch(console.error)
    }


    delete = (id) => {
        api.deletePlantation(this.state.orchardId, id)
            .then(() => {
                this.refreshPlantations(this.state.orchardId)
            })
            .catch(console.error)

    }

    // load details of selected plantation
    detail = (id) => {
        let selectedPlantation = this.state.plantations.filter((plantation) => plantation._id === id)
        this.setState({
            selectedPlantationId: selectedPlantation[0]._id,
            selectedPlantationSpecies: selectedPlantation[0].species,
            selectedPlantationM2: selectedPlantation[0].m2,
            selectedPlantationReleaseDate: selectedPlantation[0].releaseDate,
            selectedPlantationShared: selectedPlantation[0].shared
        })
    }


    update = () => {
        api.updatePlantation(
            this.state.orchardId,
            this.state.selectedPlantationId,
            this.state.selectedPlantationM2,
            this.state.selectedPlantationReleaseDate,
            this.state.selectedPlantationShared
        )
        .then(() => {
            this.refreshPlantations(this.state.orchardId)
        })
        .catch(console.error)
    }

    add = () => {
        api.addPlantation(
            // orchardid, species, m2, releaseDate, shared
            this.state.orchardId,
            this.state.newPlantationSpecies,
            this.state.newPlantationM2,
            this.state.newPlantationReleaseDate,
            this.state.newPlantationShared
        ).then((res) => {
            console.log(res)
            this.refreshPlantations(this.state.orchardId)
        })
        .catch(console.error)
    }


    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">

                        {/* Table of current plantations */}
                        <table className="table plantations">
                            <thead>
                                <tr>
                                    <th>Spec</th>
                                    <th>m2</th>
                                    <th>Release Date</th>
                                    <th>Shared</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.plantations.map((plantation, i) =>
                                        <tr className="table-success" key={i}>
                                            <th scope="row">{plantation.species}</th>
                                            <td>{plantation.m2}</td>
                                            <td><Moment format="DD/MM/YYYY">{plantation.releaseDate}</Moment></td>
                                            {
                                                plantation.shared ?
                                                    <td>✅</td>
                                                    :
                                                    <td>⛔</td>
                                            }
                                            <td><a onClick={() => this.detail(plantation._id)}>ℹ</a></td>
                                            <td><a onClick={() => this.delete(plantation._id)}>❌</a></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        {/* Form to load selected plantation, (i) button */}
                        <form className="form-plantations" method="post" onSubmit={(e) => { e.preventDefault(); this.update() }}>
                            <input readOnly type="text" className="form-control" name='selectedPlantationSpecies' value={this.state.selectedPlantationSpecies} placeholder="Species" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.selectedPlantationM2} name='selectedPlantationM2' placeholder="m2" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.selectedPlantationReleaseDate} name='selectedPlantationReleaseDate' placeholder="Release date" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.selectedPlantationShared} name='selectedPlantationShared' placeholder="Shared" onChange={this.inputField} />
                            <button type="submit" className="btn btn-success">Update</button>
                        </form>
                    </div>
                    
                    {/* Form to create a new plantation in target orchard */}

                    <div className="col-lg-6">
                    <form className="form-plantCreation" method="post" onSubmit={(e) => { e.preventDefault(); this.add() }}>
                            <input type="text" className="form-control" name='newPlantationSpecies' value={this.state.newPlantationSpecies} placeholder="Species" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.newPlantationM2} name='newPlantationM2' placeholder="m2" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.newPlantationReleaseDate} name='newPlantationReleaseDate' placeholder="Release date" onChange={this.inputField} />
                            <input type="text" className="form-control" value={this.state.newPlantationShared} name='newPlantationShared' placeholder="Shared" onChange={this.inputField} />
                            <button type="submit" className="btn btn-success">Add</button>
                        </form>                          
                    </div>


                </div>






            </div>
        )

    }

}

export default ManagePlantations