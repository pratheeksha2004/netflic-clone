import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails'; // Corrected path
import SplashScreen from './components/SplashScreen'; // Import SplashScreen
import Navbar from './components/Navbar'; // Import Navbar
import Favorites from './components/Favorites';
import Footer from './components/Footer';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleAnimationComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="app-container"> {/* Apply the main flex container */}
            {isLoading ? (
                <SplashScreen onAnimationComplete={handleAnimationComplete} />
            ) : (
                <Router>
                    <Navbar /> {/* Navbar outside Routes */}
                    <main className="main-content"> {/* Wrap Routes in a main element with class */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/movie/:imdbID" element={<MovieDetails />} />
                        </Routes>
                    </main>
                    <Footer /> {/* Footer outside Routes */}
                </Router>
            )}
        </div>
    );
}

export default App;