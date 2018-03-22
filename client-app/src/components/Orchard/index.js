import React, { Component } from 'react'
import api from 'users-api-client-0'
import './styles/main.css'
import { tomato, lettuce, corn, carrot, potato, artichoke, beetroot, flower, garlic, ginger, green_pepper, hot_pepper, leek, onion, radish, red_pepper, soybean, aubergine } from './images'



class Orchard extends Component {

    constructor() {
        super()

        this.state = {
            orchard: [],
            plantations: [],
            users: []
        }
    }


    componentDidMount() {

        //orchard ID is stored from url path in order to point to specific document
        let pathName = this.props.location.pathname
        let pathNameLength = (this.props.location.pathname).length
        let orchardToRetrieve = pathName.substring(9, pathNameLength)

        api.retrieveOrchard(orchardToRetrieve)
            .then(orchard =>
                this.setState({
                    orchard: orchard.data,
                    plantations: orchard.data.plantations,
                    users: orchard.data.users
                }))
            .catch(console.error)
    }

    
    mailContact = () => {
        // filter orchard's admin email as main contact asossiated to Contact button
        let admin =  this.state.users.filter(user => user.rol === 'admin')
        
        return `mailto:${admin[0].email}?subject=Grow it user contact about ${this.state.orchard.name}`

    }

    // activates opacity in vegetables images in case the plantation is in the list
    activateOpacity = (str) => {
        
        let flag 
        let species = []

        for (let i = 0; i<this.state.plantations.length; i++){
           species.push(this.state.plantations[i].species)
        }
        
        species.indexOf(str) === -1 ?
        flag = "img-fluid orchard-img"
        :
        flag = "img-fluid orchard-img2"

        return flag
    
    }

    

    render() {
        return (
            <div>
                <div className="container orchard-header">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1>
                                {this.state.orchard.name}
                            </h1>
                            {
                            this.state.orchard.admitsCollaborators?
                            <span className="badge badge-success">Collaborators</span>
                            :
                            undefined
                            }
                            {
                            this.state.orchard.admitsConsulting?
                            <span className="badge badge-success">Consulting</span>
                            :
                            undefined    
                            }
                        </div>
                        <div className="col-lg-6">
                        <button className="btn btn-success contact-button" onClick={() =>  this.props.history.push(`/orchardadmin/${this.state.orchard._id}`)}>Admin</button>
                            {
                            this.state.users.length>0?
                                <form method="post" action={this.mailContact()}>
                                <button type="submit" className="btn btn-success contact-button" >Contact</button>
                                </form>
                            : 
                                undefined
                            }
                        </div>
                    </div>
                </div>

                <div className="container orchard-body">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h3>Description</h3>
                            <p>{this.state.orchard.description}</p>

                            <h3>Users</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((user, i) =>
                                            <tr className="table-success" key={i}>
                                                <th scope="row">{user.rol}</th>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-6">

                            <h3>Plantations</h3>
                            {                            
                            this.state.plantations.length>0?                                    
                            <div className="orchardGround">
                                <img src={tomato} className={this.activateOpacity('tomato')} alt="tomato" />
                                <img src={lettuce} className={this.activateOpacity('lettuce')} alt="lettuce" />
                                <img src={corn} className={this.activateOpacity('corn')} alt="corn" />
                                <img src={carrot} className={this.activateOpacity('carrot')} alt="carrot" />
                                <img src={potato} className={this.activateOpacity('potato')} alt="potato" />
                                <img src={aubergine} className={this.activateOpacity('aubergine')} alt="aubergine" />
                                <img src={artichoke} className={this.activateOpacity('artichoke')} alt="artichoke" />
                                <img src={beetroot} className={this.activateOpacity('beetroot')} alt="beetroot" />
                                <img src={flower} className={this.activateOpacity('flower')} alt="flower" />
                                <img src={garlic} className={this.activateOpacity('garlic')} alt="garlic" />
                                <img src={ginger} className={this.activateOpacity('ginger')} alt="ginger" />
                                <img src={green_pepper} className={this.activateOpacity('green_pepper')} alt="green_pepper" />
                                <img src={hot_pepper} className={this.activateOpacity('hot_pepper')} alt="hot_pepper" />
                                <img src={leek} className={this.activateOpacity('leek')} alt="leek" />
                                <img src={onion} className={this.activateOpacity('onion')} alt="onion" />
                                <img src={radish} className={this.activateOpacity('radish')} alt="radish" />
                                <img src={red_pepper} className={this.activateOpacity('red_pepper')} alt="red_pepper" />
                                <img src={soybean} className={this.activateOpacity('soybean')} alt="soybean" />

                            </div>
                            :
                            undefined
                            }
                            <table className="table">
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
                                                <td>{plantation.releaseDate}</td>
                                                 {
                                                  plantation.shared?
                                                  <td>✅</td>
                                                  :
                                                  <td>❌</td>                                     
                                                }   
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Orchard