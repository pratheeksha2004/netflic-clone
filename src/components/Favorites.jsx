import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { ThemeContext } from '../contexts/ThemeContext';

function Favorites() {
    const { theme } = useContext(ThemeContext);

    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const removeFromFavorites = (movie) => {
        const updatedFavorites = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
        setFavorites(updatedFavorites);
    };

    return (
        <div className={`favorites-page ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite movies yet.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className={`favorite-card ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
                            <Link to={`/movie/${movie.imdbID}`}>
                                <img src={movie.Poster} alt={movie.Title} />
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                            </Link>
                            <button className="remove-button" onClick={() => removeFromFavorites(movie)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;