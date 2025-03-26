import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails'; 
import SplashScreen from './components/SplashScreen'; 
import Navbar from './components/Navbar'; 
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import TVShows from './pages/TVShows';
import Kids from './pages/Kids'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './contexts/ThemeContext'; 

function App() {
    const [isLoading, setIsLoading] = React.useState(true); 
    const handleAnimationComplete = () => {
        setIsLoading(false);
    };

    return (
        <ThemeProvider> {/* Wrapinggg the entire app with ThemeProvider */}
            <div className="app-container"> {/* Applyingg the main flex container */}
                {isLoading ? (
                    <SplashScreen onAnimationComplete={handleAnimationComplete} />
                ) : (
                    <Router>
                        <Navbar />
                        <main className="main-content"> {/* Wraping Routes in a main element with class */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/movie/:imdbID" element={<MovieDetails />} />
                                <Route path="/tvshows" element={<TVShows />} /> {/* Addding TVShows route */}
                                <Route path="/kids" element={<Kids />} /> {/* Addding Kids route */}
                            </Routes>
                        </main>
                        <Footer /> 
                    </Router>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;