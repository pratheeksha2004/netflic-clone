// MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../service/apiService';
import './MovieDetails.css'; // Import CSS for styling (create this file)

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        console.log("Fetching movie details for:", imdbID); // Log imdbID

        const data = await apiService.getMovieDetails(imdbID);
        console.log("Movie details data:", data); // Log the movie details
        console.log(JSON.stringify(data));

        setMovie(data);
      } catch (err) {
        console.error("FetchData Error:", err);
        // Specific error handling for different error types
        if (err.message === "Failed to parse movie details. The data may be corrupted.") {
          setError("Sorry, the movie details are currently unavailable due to corrupted data. Please try another movie.");
          console.log("Failed to parse details due to corrupted error");
        } else if (err.message === "Movie not found!") {
          setError("Sorry, the movie was not found.");
          console.log("Failed because the movie was not found!");
        }
        else {
          setError(err.message || 'An error occurred');
          console.log("AN unknown error occured");
        }
        setMovie(null);
      } finally {
        setLoading(false);
        console.log("Fetch details loading:", loading, "With an error:",error);
      }
    }

    fetchData();
  }, [imdbID]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Movie not found or invalid IMDb ID.</p>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <h1>{movie.Title}</h1>
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movie-info">
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
         {/* Display Ratings */}
         {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="ratings">
              <strong>Ratings:</strong>
              <ul>
                {movie.Ratings.map((rating, index) => (
                  <li key={index}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p><strong>imdbRating:</strong> {movie.imdbRating} (IMDb)</p>
        </div>
        {/* Add "Add to Favorites" button here */}
      </div>
    </div>
  );
}

export default MovieDetails;