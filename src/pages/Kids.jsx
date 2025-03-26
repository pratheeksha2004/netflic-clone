// src/pages/Kids.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Kids.css';
import kidsData from './Kidsdata'; 
import { ThemeContext } from '../contexts/ThemeContext';

function Kids() {
    const { theme } = useContext(ThemeContext); // Access the theme

    return (
        <div className={`kids-page ${theme === 'dark' ? 'dark' : 'light'}`}>
            <h2>Kid-Friendly Movies and TV Shows</h2>
            <div className="kids-grid">
                {kidsData.map(item => (
                    <div key={item.imdbID} className="kids-card">
                        <Link to={`/movie/${item.imdbID}`}>
                            <img src={item.poster} alt={item.title} />
                            <h4>{item.title}</h4>
                            <p><strong>Rating:</strong> {item.rating}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Kids;