import React from 'react'
import './styles/main.css'
import connect from './styles/images/connect.jpeg'
import grow from './styles/images/grow.jpg'
import share from './styles/images/share.jpeg'


function Aboutus() {

    return (
        <div className="aboutUs_global">
            <div className="aboutUs container">

                <h1 className="title">About us</h1>

                <div className="row">
                    <div className="col-lg-4">

                        <div className="card img-fluid responsivo">
                            <img className="card-img-top" src={connect} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Connect</h4>
                                <p className="card-text"></p>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="card img-fluid responsivo">
                            <img className="card-img-top" src={grow} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Grow</h4>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card img-fluid  responsivo">
                            <img className="card-img-top" src={share} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Share</h4>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
    )

}

export default Aboutus