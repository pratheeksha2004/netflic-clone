import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import netflixLogo from '../assets/logo1.jpg';
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext
import { FaMoon, FaSun } from 'react-icons/fa'; // Import Icons

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext); 

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
                    <Link to="/tvshows">TV Shows</Link>
                </li>
                <li>
                    <Link to="/kids">Kids</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
                <li className="theme-toggle-container">
                    <button className="theme-toggle-button" onClick={toggleTheme}>
                        {theme === 'dark' ? <FaSun color="yellow" size="1.5em" /> : <FaMoon size="1.5em" />}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;