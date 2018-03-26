import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/main.css'


function Header() {

    return (
        <header className="fixed-top">
            <nav>
                <div className="container">
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="#">🌱</a>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/search">Search</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/registeruser">Register user</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/registerorchard">Register orchard</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </nav>
        </header>

    
    )
}

export default Header