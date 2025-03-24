import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css'; // Import CSS

function Favorites() {
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
        <div className="favorites-page">
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite movies yet.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="favorite-card">
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