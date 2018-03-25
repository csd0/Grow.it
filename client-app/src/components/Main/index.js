import React from 'react'
import { Route } from 'react-router-dom'
import './styles/main.css'
import Cover from '../Cover'
import Aboutus from '../Aboutus'
import Registeruser from '../Registeruser'
import Login from '../Login'
import Registerorchard from '../Registerorchard'
import Search from '../Search'
import Orchard from '../Orchard'
import OrchardAdmin from '../OrchardAdmin'
import ManageCollaborators from '../ManageCollaborators'
import ManagePlantations from '../ManagePlantations'



function Main() {

    return (
        <div>   

            <Route exact path="/" component={Cover} />
            <Route path="/aboutus" component={Aboutus} />
            <Route path="/registeruser" component={Registeruser} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/registerorchard" component={Registerorchard} />
            <Route path="/orchard" component={Orchard} />
            <Route path="/orchardadmin" component={OrchardAdmin} />
            <Route path="/managecollaborators" component={ManageCollaborators} />
            <Route path="/manageplantations" component={ManagePlantations} />
            
        </div>
    )
}

export default Main