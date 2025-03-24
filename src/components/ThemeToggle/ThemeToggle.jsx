// components/ThemeToggle/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'} btn-sm`}
            onClick={toggleTheme}
        >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}

export default ThemeToggle;