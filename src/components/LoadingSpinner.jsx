import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;