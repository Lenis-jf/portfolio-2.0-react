import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return(
        <div>
            <header className="light-section">
                <label className="menu brown-color light-theme">
                <input type="checkbox"/>
                </label>
                <div className="menu-buttons-container">
                <Link to="/" className="menu-button brown-color light-theme">
                    <span>Home</span>
                </Link>
                <a href="/" className="menu-button brown-color light-theme">
                    <span>Projects</span>
                </a>
                <Link to="/contact" className="menu-button brown-color light-theme">
                    <span>Contact</span>
                </Link>
                <Link to="/about" className="menu-button brown-color light-theme">
                    <span>About</span>
                </Link>
                <label className="darkmode-button-container brown-color light-theme">
                    <input type="checkbox"/>
                </label>
                </div>
                <div className="logo-container"></div>
            </header>
        </div>
      );
}

export default Header;