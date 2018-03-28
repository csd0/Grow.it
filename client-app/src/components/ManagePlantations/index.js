import React, { Component } from 'react'
import api from '../../api-client'
import Moment from 'react-moment';
import './styles/main.css'
import swal from 'sweetalert2'


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
            newPlantationShared: false


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

        (swal({
            title: 'Are you sure?',
            text: "This action remove plantation from your orchard!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.value) {
                    api.deletePlantation(this.state.orchardId, id)
                        .then(res => {
                            res.status === 'OK' ?
                                swal(
                                    'Deleted!',
                                    'Plantation has been removed.',
                                    'success'
                                )
                                :
                                (swal({
                                    type: 'error',
                                    title: res.error,
                                    showConfirmButton: false,
                                    timer: 1500
                                }))

                        })

                
                        .then(() => {
                            this.refreshPlantations(this.state.orchardId)
                        })
                    }})
        )
    
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
        
        let dateValidator

        var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/
        if ((this.state.newPlantationReleaseDate.match(RegExPattern)) && (this.state.newPlantationReleaseDate!='')) {
                dateValidator = true
        } else {
                dateValidator = false
        }
      
        if (dateValidator){
      
        api.addPlantation(
            this.state.orchardId,
            this.state.newPlantationSpecies,
            this.state.newPlantationM2,
            this.state.newPlantationReleaseDate,
            this.state.newPlantationShared
        )
        .then(res => {
            res.status === 'OK' ?

                (swal({
                    type: 'success',
                    title: 'plantation added',
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
        })

        .then(() => {
            return this.refreshPlantations(this.state.orchardId)
        })
        }
        else{
            swal({
                    type: 'error',
                    title: 'Incorrect date format',
                    showConfirmButton: false,
                    timer: 1500
                })
        }
    }


    // provide correct format to update correctly release date
    formatDate = () => {
        let formatedDate = (this.state.selectedPlantationReleaseDate).substring(0, 10)
        return formatedDate
    }


    checkSelectedPlantationShared = (e) => {
        this.setState({ selectedPlantationShared: !this.state.selectedPlantationShared })
    }

    checkNewPlantationShared = (e) => {
        this.setState({ newPlantationShared: !this.state.newPlantationShared })
    }




    render() {

        return (
            <div className="container-fluid global-plantations">
                <div className="row">
                    <div className="col-lg-6">

                        {/* Table of current plantations */}
                        <h1 className="plantations_title">Plantations</h1>
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
                                            <td><Moment format="YYYY-MM-DD">{plantation.releaseDate}</Moment></td>
                                            {
                                                plantation.shared ?
                                                    <td>✅</td>
                                                    :
                                                    <td>⛔</td>
                                            }
                                            <td><a className="action_links" onClick={() => this.detail(plantation._id)}>ℹ</a></td>
                                            <td><a className="action_links" onClick={() => this.delete(plantation._id)}>❌</a></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        {/* Form to load selected plantation, (i) button */}
                        <form className="form-plantations" method="post" onSubmit={(e) => { e.preventDefault(); this.update() }}>
                            <input autoComplete="off" readOnly type="text" className="form-control" name='selectedPlantationSpecies' value={this.state.selectedPlantationSpecies} placeholder="Species" onChange={this.inputField} />
                            <input autoComplete="off" type="number" className="form-control" value={this.state.selectedPlantationM2} name='selectedPlantationM2' placeholder="m2" onChange={this.inputField} />
                            <input autoComplete="off" type="date" className="form-control" value={this.formatDate()} name='selectedPlantationReleaseDate' placeholder="Release date" onChange={this.inputField} />
                            <div className="checkbox check_plant" name='selectedPlantationShared' value={this.state.selectedPlantationShared} onChange={this.checkSelectedPlantationShared}>
                                <label><input type="checkbox" checked={this.state.selectedPlantationShared} /> Shared</label>
                            </div>
                            <button type="submit" className="btn btn-success">Update</button>
                        </form>
                    </div>

                    {/* Form to create a new plantation in target orchard */}

                    <div className="col-lg-6">
                        <form className="form-plantCreation" method="post" onSubmit={(e) => { e.preventDefault(); this.add() }}>
                            <input autoComplete="off" required type="text" className="form-control" name='newPlantationSpecies' value={this.state.newPlantationSpecies} placeholder="Species (hover for featured species)" onChange={this.inputField} data-toggle="tooltip" data-placement="right" title="tomato, 
lettuce, 
corn, 
carrot, 
potato, 
artichoke, 
beetroot, 
flower, 
garlic, 
ginger, 
green_pepper, 
hot_pepper, 
leek, 
onion, 
radish, 
red_pepper, 
soybean, 
aubergine"/>
                            <input autoComplete="off" required type="number" className="form-control" value={this.state.newPlantationM2} name='newPlantationM2' placeholder="m2" onChange={this.inputField} />
                            <input maxLength="10" minLength="10" autoComplete="off" required type="date" className="form-control" value={this.state.newPlantationReleaseDate} name='newPlantationReleaseDate' placeholder="Release date YYYY-MM-DD" onChange={this.inputField} />
                            <div className="checkbox check_plant" name='newPlantationShared' value={this.state.newPlantationShared} onChange={this.checkNewPlantationShared}>
                                <label><input type="checkbox" checked={this.state.newPlantationShared} /> Shared</label>
                            </div>
                            <button type="submit" className="btn btn-success">Add</button>
                        </form>
                    </div>


                </div>


            </div>
        )

    }

}

export default ManagePlantations