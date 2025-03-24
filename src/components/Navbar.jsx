import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import netflixLogo from '../assets/logo1.jpg';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={netflixLogo} alt="Netflix" className="logo" />
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;