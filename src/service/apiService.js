// apiService.js

{/**const API_KEY = "8e88baf0"; // Your OMDb API key

const apiService = {
  searchMovies: async (searchTerm, page = 1) => {
    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
      const response = await fetch(url);
      console.log("Search API URL:", url); // Log the search API URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search API Response:", data); // Log the search API response

      if (data.Response === "False") {
        // API returned an error (e.g., no results found)
        return { Search: [], totalResults: 0, Error: data.Error };
      }

      return {
        Search: data.Search,
        totalResults: parseInt(data.totalResults), // Convert to number
      };
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error; // Re-throw the error for the component to handle
    }
  },

  getMovieDetails: async (imdbID) => {
    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
      console.log("Movie Details API URL:", url); // Log the movie details API URL
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data;
      let rawData; // Declare rawData
      try {
        // Attempt to parse the JSON response
        rawData = await response.text(); // First, get the raw text
        console.log("Raw Data:", rawData); // Log rawData
        data = JSON.parse(rawData); // Then, parse it
        console.log("Movie Details API Response:", data); // Log the movie details API response

      } catch (error) {
        console.error("JSON Parse Error:", error);
        console.error("Raw Data that failed:", rawData);
        // If JSON parsing fails, throw a custom error
        throw new Error("Failed to parse movie details. The data may be corrupted.");
      }

      // Check if the response indicates an error from OMDb
      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      return data;
    } catch (error) {
      console.error("Error getting movie details:", error);
      throw error; // Re-throw the error for the component to handle
    }
  },
};

export default apiService;



 */}
// src/service/apiService.js
// src/service/apiService.js
const API_KEY = '8e88baf0';
const BASE_URL = 'https://www.omdbapi.com/';

const apiService = {
    getMovieDetails: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            throw error;
        }
    },
    searchMovies: async (searchTerm, page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}?s=${searchTerm}&page=${page}&apikey=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error searching movies:", error);
            throw error;
        }
    },
    searchTVShows: async (searchTerm, page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}?s=${searchTerm}&type=series&page=${page}&apikey=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error searching TV shows:", error);
            throw error;
        }
    },
    getTrendingMovies: async () => {
        // Simulate trending movies using a hardcoded list of IMDb IDs
        const trendingMovieIds = [
            'tt0816692', // Interstellar
            'tt1375666', // Inception
            'tt0468569', // The Dark Knight
            'tt0111161', // The Shawshank Redemption
            'tt0068646', // The Godfather
            'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
            'tt0133093', // The Matrix
            'tt0109830', // Forrest Gump
            'tt0317219', // Cars
            'tt1130884'  // Shutter Island

        ];

        try {
            const trendingMovies = await Promise.all(
                trendingMovieIds.map(async (id) => {
                    return await apiService.getMovieDetails(id);
                })
            );
            return trendingMovies;
        } catch (error) {
            console.error("Error fetching trending movies:", error);
            throw error;
        }
    },
    getNewReleases: async () => {
        // Simulate new releases by searching for movies from the current year
        const currentYear = new Date().getFullYear();
        try {
            // Search for movies with the current year
            const response = await apiService.searchMovies(currentYear.toString(), 1);  //Use search movies to find movies
            const data = await response

            return data.Search ? data.Search.slice(0, 10) : []; // Limit to 10 movies and return empty array if no results
        } catch (error) {
            console.error("Error fetching new releases:", error);
            throw error;
        }
    }
};

export default apiService;