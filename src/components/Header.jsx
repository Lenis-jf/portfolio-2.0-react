import React from "react";
import { Link } from "react-router-dom";

function Header() {
    // Función para manejar clics en secciones internas
    const handleSectionClick = (hash, e) => {
    e.preventDefault();
    const section = document.getElementById(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    // Actualiza la URL sin recargar
      window.history.replaceState(null, "", `/#${hash}`);
    }
  };

    return(
        <div>
            <header>
                <label className="menu brown-color light-theme">
                <input type="checkbox"/>
                </label>
                <div className="menu-buttons-container">
                <Link to="/" className="menu-button brown-color light-theme">
                    <span>Home</span>
                </Link>
                <a href="#projects" 
                onClick={(e) => handleSectionClick("projects", e)}
                className="menu-button brown-color light-theme">
                    <span>Projects</span>
                </a>
                <Link to="/Contact" className="menu-button brown-color light-theme">
                    <span>Contact</span>
                </Link>
                <Link to="/About" className="menu-button brown-color light-theme">
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