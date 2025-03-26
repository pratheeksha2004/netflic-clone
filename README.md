# Netflix Clone Project (Frontend)

[![Project Screenshot](link-to-your-screenshot.png)](link-to-your-live-site)

A visually engaging movie streaming platform mimicking the Netflix experience.

## Project Overview

This project develops a movie streaming platform replicating the frontend experience of Netflix. The platform allows users to browse movies, view details, search, filter by categories, curate personalized favorite lists, and seamlessly toggle between light and dark viewing modes. This is a purely frontend focused application.

## Technologies Used

React, React Router, HTML, CSS, Bootstrap, JavaScript, OMDB API

## Description

This project is a Netflix Clone (Frontend Only) where a fully responsive and dynamic movie streaming UI is developed. The project focuses on building an interactive and visually appealing web application using React, JavaScript, HTML, CSS, and Bootstrap. The application allows users to: Browse movie listings, View movie details, Search for movies, Filter by genre, Add movies to a favorites list, Switch between light/dark mode.

## Project Goals

*   Craft a visually appealing and responsive UI that adheres to industry standards.
*   Dynamically render movie content using efficient JavaScript techniques.
*   Implement seamless navigation using React Router.
*   Provide persistent storage of favorite movies using LocalStorage.
*   Elevate user experience through a dynamic dark mode toggle.
*   Successfully deploy the project on Netlify or Vercel.

## Features & Functionalities

Homepage (Movie Dashboard): Hero Spotlight: A captivating banner showcasing the latest or featured movie. Movie Grid: A visually organized grid displaying movies with engaging images, titles, and ratings. Effortless Navigation: Clicking a movie card directs users to the dedicated Movie Details Page.

Navigation & Routing: Intuitive Navbar: A top navigation bar providing easy access to the Home, Favorites, and Search functionalities. Seamless Transitions: Utilizes React Router for smooth, single-page application-like navigation.

Movie Details Page: Comprehensive Information: Displays the movie's title, captivating description, associated genres, release date, and viewer rating. Personalized Action: An "Add to Favorites" button to easily curate a personal movie list.

Favorites Page: Curated Collection: A dedicated page displaying a user's saved favorite movies. Easy Management: Allows users to effortlessly remove movies from their favorites list. Persistent Data: Leverages LocalStorage to retain user data even after a browser refresh.

Search & Filter Functionality: Intelligent Search: A dynamic search bar enables users to quickly find movies by title. Categorized Browsing: A genre filter dropdown empowers users to refine their search by specific movie categories. Real-time Updates: The movie listings respond dynamically to search and filter inputs, providing a fluid browsing experience.

Dark Mode Toggle: Personalized Viewing: A dedicated button facilitates seamless switching between light and dark themes. Context API Implementation: The React Context API ensures a consistent theme across the application.

UI/UX Enhancements: Interactive Movie Cards: Engaging hover effects on movie cards enhance user interaction. Fluid Transitions: Carefully implemented animations & transitions create a polished and seamless experience. Loading Indicator: A visually clear loading spinner indicates data fetching activity.

Fully Responsive Design: Cross-Device Compatibility: A consistent and optimized experience across mobile phones, tablets, and desktop computers. Adaptive Layout: Employs Bootstrap Grid and CSS media queries to achieve a responsive layout.

Deployment: Cloud Hosting: The project is deployed on Vercel (or Netlify). Open Source: Access the complete source code on the shared GitHub repository.

## Installation (Prerequisites)

*   Node.js (version >= 16)
*   npm (or yarn)

## Setup & Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/pratheeksha2004/netflix-clone.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd netflix-clone
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```
    
Add your API key:

OMDB_API_KEY=YOUR_API_KEY (8e88baf0)

Please respect the use of this demonstration version.

Running the Application

npm run dev

Browse to http://localhost:5173 in your browser.(default port)

Building for Production

npm run build

This will create a /dist folder with production code.

Project Structure


## Project Structure

The project's directory structure is organized as follows:

| Directory/File          | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `Netflix-Clone/`        | Root directory of the project                                              |
| `src/`                  | Contains all the source code                                                |
| `src/components/`        | Reusable React components                                                  |
| `src/components/Favorites.jsx`  | Displays list of favorite movies                                     |
| `src/components/Favorites.css`  | Styles for Favorites component                                         |
| `src/components/Footer.jsx`     | Footer component                                                        |
| `src/components/Footer.css`     | Styles for Footer component                                                        |
| `src/components/LoadingSpinner.jsx` | Loading indicator component                                           |
| `src/components/MovieCard.jsx`  | Individual movie display component                                      |
| `src/components/MovieDetails.jsx` | Displays details for a specific movie                                  |
| `src/components/MovieDetails.css` | Styles for MovieDetails component                                      |
| `src/components/Navbar.jsx`       | Navigation bar component                                                 |
| `src/components/Navbar.css`       | Styles for Navbar component                                                 |
| `src/components/SearchBar.jsx`    | Search bar component                                                    |
| `src/components/SplashScreen.jsx` | Splash screen component                                                |
| `src/components/SplashScreen.css` | Styles for SplashScreen component                                        |
| `src/components/ThemeToggle/`   | Theme toggle component                                                 |
| `src/components/ThemeToggle/ThemeToggle.jsx` | Theme toggle logic and UI                                          |
| `src/contexts/`         | Contains React context files                                              |
| `src/contexts/ThemeContext.jsx`| Manages dark/light theme context                                       |
| `src/pages/`             | Contains different pages of the application                               |
| `src/pages/Home.jsx`        | Main movie dashboard                                                      |
| `src/pages/Home.css`        | Styles for Home component                                                      |
| `src/pages/Kids.jsx`        | Page for kids' movies                                                    |
| `src/pages/Kids.css`        | Styles for Kids component                                                    |
| `src/pages/KidsData.js`     | Data for kids' movies                                                      |
| `src/pages/movieData.js`    | Data for movie genres                                                      |
| `src/pages/SearchResults.jsx`| Displays search results                                                  |
| `src/pages/SearchResults.css`| Styles for SearchResults component                                          |
| `src/pages/TVShows.jsx`     | Page for TV shows                                                        |
| `src/pages/TVShows.css`     | Styles for TVShows component                                                |
| `src/service/`           | Contains API service files                                                |
| `src/service/apiService.js`| Handles API calls to OMDB API                                             |
| `src/assets/`            | Contains static assets                                                       |
| `src/assets/`           | Directory for logo images (some .png files)                               |
| `App.jsx`               | Top-level component                                                        |
| `App.css`               | Global CSS styles                                                                  |
| `main.jsx`              | Entry point for React                                                        |
| `public/`               | Contains static assets (e.g., images, fonts)                               |
| `.gitignore`            | Specifies intentionally untracked files                                    |
| `README.md`             | Instructions and project info (this file)                                 |
| `package.json`          | Project metadata and dependencies                                           |
| `vite.config.js`        | Vite build configuration file                                              |


Coding & Naming Conventions
Indentation: 2 spaces

React components: PascalCase (e.g., MovieCard)

Variables and functions: camelCase (e.g., fetchData, searchTerm)

CSS classes: kebab-case (e.g., movie-card, search-bar)

Usability & Best Practices
Semantic HTML elements

Optimized images

Lazy loading,memoization

Accessibility (WCAG)

API Reference
Data was consumed via the OMDB API.

Endpoint: http://www.omdbapi.com/

Authentication via API key.

Screenshots
Mobile
A movie streaming app on a phone
![alt text](path-to-mobile-screenshot.png)

Tablet
Screenshot of app running on tablet
![alt text](path-to-tablet-screenshot.png)

Desktop
Screen shot of app running on desktop
![alt text](path-to-desktop-screenshot.png)

UI/UX Design Principles
Minimalist design

Clear typography

Consistent experience across devices

Debugging & Troubleshooting
Browser dev tools

console.log tracking

Error Management
Implemented API error handling

Displayed user-friendly messages

Deployment Strategy
Deployed to Vercel for instant availability.

## Performance Analysis (Lighthouse)

This section summarizes the performance analysis of the application using Google Lighthouse. The scores and metrics provide insights into areas for potential optimization.

### Scores

*   **Performance:** 68/100 (Medium)
*   **Accessibility:** 100/100
*   **Best Practices:** 100/100
*   **SEO:** 83/100

### Key Metrics

*   **First Contentful Paint (FCP):** 1.9 s
*   **Largest Contentful Paint (LCP):** 3.5 s
*   **Total Blocking Time (TBT):** 0 ms
*   **Cumulative Layout Shift (CLS):** 0 ms
*   **Speed Index:** 2.5 s
