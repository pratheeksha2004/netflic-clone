import React, { useState, useEffect, useContext } from 'react';
import apiService from '../service/apiService';
import { Link } from 'react-router-dom';
import './Home.css';
import movieData from './movieData'; // Import my movieData.js
import { ThemeContext } from '../contexts/ThemeContext';

function Home() {
  const { theme } = useContext(ThemeContext); // Access the theme

  const [latestMovie, setLatestMovie] = useState(null);
  const [movies, setMovies] = useState([]); // Movies from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  // Genre filtering state
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreFilteredMovies, setGenreFilteredMovies] = useState([]); // Movies from movieData

  // Defining available genres 
  const genres = [
    'Action',
    'Drama',
    'Comedy',
    'Horror'
  ];

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchLatestMovie = async () => {
    try {
      const trendingMovieId = 'tt0816692';
      const movieData = await apiService.getMovieDetails(trendingMovieId);
      setLatestMovie(movieData);
    } catch (error) {
      console.error('Error fetching latest movie:', error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      let trendingData = await apiService.getTrendingMovies();

      //Add Rating to Trending Movies 
      trendingData = trendingData.map(movie => ({
        ...movie,
        rating: getRating(movie) || 'N/A' // Using the combined rating logic
      }));
      setTrendingMovies(trendingData || []);

    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  const fetchNewReleases = async () => {
    try {
      let newReleasesData = await apiService.getNewReleases();

      // Add Rating to New Releases (if possible)
      newReleasesData = newReleasesData.map(movie => ({
        ...movie,
        rating: getRating(movie) || 'N/A' // Use the combined rating logic
      }));
      setNewReleases(newReleasesData || []);

    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };

  useEffect(() => {
    fetchLatestMovie();
    fetchTrendingMovies();
    fetchNewReleases();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Construct the search term based on genre and/or keyword
        let finalSearchTerm = searchTerm;
        if (selectedGenre) {
          finalSearchTerm = `${searchTerm} ${selectedGenre}`;  //Append genre to search term
        }

        console.log("finalSearchTerm:", finalSearchTerm); 

        const data = await apiService.searchMovies(finalSearchTerm, currentPage);

        if (data && data.Response === "True") {  
          //Add Rating to Movies
          const moviesWithRating = data.Search.map(movie => ({
            ...movie,
            rating: getRating(movie) || 'N/A' 
          }));
          setMovies(moviesWithRating);

          setTotalResults(parseInt(data.totalResults) || 0);
        } else {
          // Handle the case where no movies are found or there's an error
          setMovies([]);
          setTotalResults(0);
          if (data && data.Error) {
            setError(data.Error); 
          } else {
            setError("No movies found or an unexpected error occurred.");
          }
        }

      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error("Error fetching data:", err); 
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false); 
      }
    }

    if (searchTerm !== '' || selectedGenre !== '') {  
      fetchData();
    } else {
      
      setMovies([]);
    }

  }, [searchTerm, currentPage, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie)) {
      setFavorites(favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movie) => {
    return favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
  };

  // Genre selection handler and filter
  const handleGenreChange = (event) => {
    const selectedGenreValue = event.target.value;
    setSelectedGenre(selectedGenreValue);
    setCurrentPage(1); // Reset page when genre changes
    filterMoviesByGenre(selectedGenreValue);
  };

  // Filter movies based on genre from your local movieData.js
  const filterMoviesByGenre = (genre) => {
    if (!genre) {
      setGenreFilteredMovies([]); // Clear the filtered movies if no genre is selected
      return;
    }

    const filteredMovies = movieData.filter(movie => {
      // Check if the movie has the selected genre in its genre array.
      return movie.genre.includes(genre);
    });
    setGenreFilteredMovies(filteredMovies);
  };

  // Helper function to extract IMDb rating from the Ratings array
  const getRatingFromRatingsArray = (ratings, source) => {
    if (!ratings || !Array.isArray(ratings)) {
      return null;
    }

    const rating = ratings.find(rating => rating.Source === source);
    return rating ? rating.Value : null;
  };

  // Combined function to get rating from either Ratings array or imdbRating
  const getRating = (movie) => {
    // Try to get rating from the Ratings array first
    const ratingFromRatings = getRatingFromRatingsArray(movie.Ratings, 'Internet Movie Database');
    if (ratingFromRatings) {
      return ratingFromRatings;
    }

    // If not found in Ratings, try to get it from imdbRating directly
    if (movie.imdbRating) {
      return movie.imdbRating;
    }
    if (movie.rating) {
      return movie.rating;
    }

    // If neither is found, return null
    return null;
  };


  return (
    <div className="home-page">

      {/* Hero Banner */}
      {latestMovie && (
        <div className="hero-banner" style={{ backgroundImage: `url(${latestMovie.Poster})` }}>
          <div className="hero-content">
            <h1>{latestMovie.Title}</h1>
            <p>{latestMovie.Plot}</p>
            <Link to={`/movie/${latestMovie.imdbID}`} className="btn btn-primary">
              Watch Now
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Genre Dropdown */}
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Conditionally render the movie grid if there is a search term */}
      {(searchTerm || selectedGenre) && !genreFilteredMovies.length && (  
        <>
          <div className="movie-grid">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {movies.map((movie) => (
                  <div key={movie.imdbID} className="movie-card">
                    <Link to={`/movie/${movie.imdbID}`}>
                      <img src={movie.Poster} alt={movie.Title} />
                      <h3>{movie.Title}</h3>
                      <p><strong>Rating:</strong> {movie.rating}</p>
                    </Link>

                  </div>
                ))}
              </>
            )}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

{selectedGenre && genreFilteredMovies.length > 0 && (
    <div className="genre-filtered-movies">
        <h2>Genre {selectedGenre}</h2>
        <div className="movie-grid">
            {genreFilteredMovies.map(movie => (
                <div key={movie.imdbID} className="movie-card">
                    <Link to={`/movie/${movie.imdbID}`}>
                        <img src={movie.poster} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>Rating :{movie.rating}</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
)}


      {/* If no search term and no genre filter, show trending movies and new releases */}
      {(!searchTerm && !selectedGenre) && (
        <>
          {/* Trending Movies Section */}
          <div className="trending-movies">
            <h2>Trending Movies</h2>
            <div className="trending-list">
              {trendingMovies.map((movie) => (
                <div key={movie.imdbID} className="trending-movie-card">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* New Releases Section */}
          <div className="new-releases">
            <h2>New Releases</h2>
            <div className="new-releases-list">
              {newReleases.map((movie) => (
                <div key={movie.imdbID} className="new-release-card">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Home;