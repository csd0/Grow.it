import React from 'react'
import './styles/main.css'
import connect from './styles/images/connect.jpeg'
import grow from './styles/images/grow.jpg'
import share from './styles/images/share.jpeg'


function Aboutus() {

    return (
        <div>
            <div className="aboutUs container">


                <div className="row">
                    <div className="col-lg-4">

                        <div className="card img-fluid">
                            <img className="card-img-top" src={connect} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Connect</h4>
                                <p className="card-text">with a emerging urban farmers community </p>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="card img-fluid">
                            <img className="card-img-top" src={grow} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Grow</h4>
                                <p className="card-text">organic plantations on your own, with a group, whatever </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card img-fluid">
                            <img className="card-img-top" src={share} alt="Card promo" />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Share</h4>
                                <p className="card-text">your knowledge, experience, harvest… everything you want </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Aboutus