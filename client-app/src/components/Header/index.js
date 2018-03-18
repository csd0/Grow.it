import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/main.css'
// import { Navbar,Nav,NavItem,NavDropdown, MenuItem } from 'react-bootstrap'


function Header() {

    return (
        <header className="fixed-top">
            <nav>
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="/#/login">Log in</a>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home
                                    <span className="sr-only" >(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/#/aboutus">About us
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/registeruser">Register user</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/search">Search</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/registerorchard">Register orchard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/orchard">Orchard</a>
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