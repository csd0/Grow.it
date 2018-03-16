import React from 'react'
// TO DO : Import all this images from archive
import tomato from './styles/img/tomato.png'
import lettuce from './styles/img/lettuce.png'
import corn from './styles/img/corn.png'
import carrot from './styles/img/carrot.png'
import potato from './styles/img/potato.png'
import artichoke from './styles/img/artichoke.png'
import beetroot from './styles/img/beetroot.png'
import flower from './styles/img/flower.png'
import garlic from './styles/img/garlic.png'
import ginger from './styles/img/ginger.png'
import green_pepper from './styles/img/green_pepper.png'
import hot_pepper from './styles/img/hot_pepper.png'
import leek from './styles/img/leek.png'
import onion from './styles/img/onion.png'
import radish from './styles/img/radish.png'
import red_pepper from './styles/img/red_pepper.png'
import soybean from './styles/img/soybean.png'
import aubergine from './styles/img/aubergine.png'


function Orchard () {

    return(
        <div>
    <div className="container orchard-header">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <h1>
                    Orchard title
                </h1>
                <span className="badge badge-success">Collaborators</span>
                <span className="badge badge-success">Consulting</span>
                
            </div>
            <div className="col-lg-6">
                <button type="button" className="btn btn-success contact-button">Contact</button>
            </div>
        </div>
    </div>

    <div className="container orchard-body">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <h3>Description</h3>
                <p>Lorem ipsum bla blabla blablaaaaaa</p>
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
                        <tr className="table-success">
                            <th scope="row">Admin</th>
                            <td>Marc</td>
                            <td>marc@mail.com</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Collaborator</th>
                            <td>Jacob</td>
                            <td>jacob@mail.com</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Collaborator</th>
                            <td>Pili</td>
                            <td>pili@mail.com</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Collaborator</th>
                            <td>Mili</td>
                            <td>mili@mail.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="col-lg-6">

                <h3>Plantations</h3>

                <div className="orchardGround">
                <img src={tomato} className="img-fluid orchard-img2" alt="Responsive image"/>
                <img src={lettuce} className="img-fluid orchard-img2" alt="Responsive image"/>
                <img src={corn} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={carrot} className="img-fluid orchard-img2" alt="Responsive image"/>
                <img src={potato} className="img-fluid orchard-img2" alt="Responsive image"/>
                <img src={aubergine} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={artichoke} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={beetroot} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={flower} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={garlic} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={ginger} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={green_pepper} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={hot_pepper} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={leek} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={onion} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={radish} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={red_pepper} className="img-fluid orchard-img" alt="Responsive image"/>
                <img src={soybean} className="img-fluid orchard-img" alt="Responsive image"/>
             
                
                </div>

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
                        <tr className="table-success">
                            <th scope="row">Potatoe</th>
                            <td>24</td>
                            <td>01/06/2018</td>
                            <td>✅</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Carrot</th>
                            <td>8</td>
                            <td>01/10/2018</td>
                            <td>❌</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Lettuce</th>
                            <td>16</td>
                            <td>01/06/2018</td>
                            <td>✅</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Tomato</th>
                            <td>8</td>
                            <td>01/10/2018</td>
                            <td>❌</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
    )

}

export default Orchard