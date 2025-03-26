// MovieCard.jsx (with lazy loading)
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = memo(({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} loading="lazy" />
                <h3>{movie.Title}</h3>
                <p><strong>Rating:</strong> {movie.rating}</p>
            </Link>
        </div>
    );
});

export default MovieCard;