import React from "react";

function Header() {
    return(
        <div>
            <header>
                <label className="menu brown-color light-theme">
                <input type="checkbox"/>
                </label>
                <div className="menu-buttons-container">
                <a href="/" className="menu-button brown-color light-theme">
                    <span>Home</span>
                </a>
                <a href="#projects" className="menu-button brown-color light-theme">
                    <span>Projects</span>
                </a>
                <a href="/contact" className="menu-button brown-color light-theme">
                    <span>Contact</span>
                </a>
                <a href="/about" className="menu-button brown-color light-theme">
                    <span>About</span>
                </a>
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