import React, { useState, useEffect, useContext, useCallback, memo } from 'react';
import apiService from '../service/apiService';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TVShows.css';
import LoadingSpinner from '../components/LoadingSpinner';
import { ThemeContext } from '../contexts/ThemeContext';

//Create TV Show Card
const TVShowCard = memo(({ show }) => (
    <div className="tvshow-card">
        <Link to={`/movie/${show.imdbID}`}>
            <img src={show.Poster} alt={show.Title} loading="lazy" />
            <h3>{show.Title}</h3>
        </Link>
    </div>
));

function TVShows() {
    const { theme } = useContext(ThemeContext);

    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const showsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [userSearchTerm, setUserSearchTerm] = useState('');

    const fetchTVShows = useCallback(async (searchTerm, page) => {
        try {
            setLoading(true);
            setError(null);

            const data = await apiService.searchTVShows(searchTerm, page);

            if (data && data.Search) {
                setTvShows(data.Search);
                setTotalResults(parseInt(data.totalResults) || 0);
            } else {
                setTvShows([]);
                setTotalResults(0);
                setError(data && data.Error ? data.Error : 'No TV shows found');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
            setTvShows([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTVShows(userSearchTerm || 'popular', currentPage);
    }, [fetchTVShows, userSearchTerm, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = useCallback((event) => {
        event.preventDefault();
        setUserSearchTerm(searchTerm);
        setCurrentPage(1);
    }, [searchTerm]);

    const totalPages = Math.ceil(totalResults / showsPerPage);

    return (
        <div className={`tvshows-page ${theme === 'dark' ? 'dark' : 'light'}`}>
            <h2>TV Shows</h2>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for TV shows..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="btn">Search</button>
            </form>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <div className="tvshow-grid">
                        {tvShows.map(show => (
                            <TVShowCard key={show.imdbID} show={show} />
                        ))}
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
        </div>
    );
}

export default TVShows;