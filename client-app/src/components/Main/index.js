import React from 'react'
import { Route } from 'react-router-dom'
import Cover from '../Cover'
import Aboutus from '../Aboutus'
import Registeruser from '../Registeruser'
import Login from '../Login'
import Registerorchard from '../Registerorchard'
import Search from '../Search'
import Orchard from '../Orchard'
import SuccessMsg from '../SuccessMsg'
import ErrorMsg from '../ErrorMsg'


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
            <Route path="/register/successreg" component={SuccessMsg} />
            <Route path="/register/failreg" component={ErrorMsg} />
            
        </div>
    )
}

export default Main