import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <p>Questions? Call <a href="tel:000-800-919-1743">000-800-919-1743</a></p>
            </div>
            <div className="footer-links">
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Help Centre</a></li>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Media Centre</a></li>
                    <li><a href="#">Investor Relations</a></li>
                    <li><a href="#">Jobs</a></li>
                </ul>
                <ul>
                    <li><a href="#">Ways to Watch</a></li>
                    <li><a href="#">Terms of Use</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Cookie Preferences</a></li>
                    <li><a href="#">Corporate Information</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <ul>
                    <li><a href="#">Speed Test</a></li>
                    <li><a href="#">Legal Notices</a></li>
                    <li><a href="#">Only on Netflix</a></li>
                </ul>
            </div>
            <div className="language-selector">
                <select>
                    <option>English</option>
                    <option>Hindi</option>
                </select>
            </div>
            <div className="footer-bottom">
                <p>Netflix India</p>
            </div>
        </footer>
    );
}

export default Footer;