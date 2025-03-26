import React, { useState, useEffect, useContext, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';
import { ThemeContext } from '../contexts/ThemeContext';

// Create the Favorite Card
const FavoriteCard = memo(({ movie, theme, removeFromFavorites }) => (
    <div className={`favorite-card ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} loading="lazy" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </Link>
        <button className="remove-button" onClick={() => removeFromFavorites(movie)}>
            Remove
        </button>
    </div>
));

function Favorites() {
    const { theme } = useContext(ThemeContext);

    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const removeFromFavorites = useCallback((movie) => {
        setFavorites(prevFavorites => prevFavorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID));
    }, []);

    return (
        <div className={`favorites-page ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite movies yet.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map((movie) => (
                        <FavoriteCard
                            key={movie.imdbID}
                            movie={movie}
                            theme={theme}
                            removeFromFavorites={removeFromFavorites}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;