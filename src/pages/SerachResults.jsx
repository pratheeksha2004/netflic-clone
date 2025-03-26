// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/apiService';
import './SearchResults.css'; 

function SearchResults() {
  const { searchTerm } = useParams(); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const data = await apiService.searchMovies(searchTerm);
        setMovies(data.Search || []);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchTerm]); 

  if (loading) {
    return <p>Loading search results...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (movies.length === 0) {
    return <p>No movies found for "{searchTerm}".</p>;
  }

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchTerm}"</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}> 
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;