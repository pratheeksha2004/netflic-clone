import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails'; // Corrected path
import SplashScreen from './components/SplashScreen'; // Import SplashScreen
import Navbar from './components/Navbar'; // Import Navbar
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider

function App() {
    const [isLoading, setIsLoading] = React.useState(true); // Corrected useState
    const handleAnimationComplete = () => {
        setIsLoading(false);
    };

    return (
        <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
            <div className="app-container"> {/* Apply the main flex container */}
                {isLoading ? (
                    <SplashScreen onAnimationComplete={handleAnimationComplete} />
                ) : (
                    <Router>
                        <Navbar />
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
        </ThemeProvider>
    );
}

export default App;