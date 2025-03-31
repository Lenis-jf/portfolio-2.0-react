import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // 2. Estado inicial desde localStorage
        return localStorage.getItem("theme") === "dark";
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    // 3. Efecto para aplicar el tema
    useEffect(() => {
        const sections = document.querySelectorAll('section.section');
        const header = document.querySelector('header');

        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark-theme");

            sections.forEach(section => {
                section.classList.add('dark-theme')
            });
            header.classList.add('dark.theme');

            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark-theme");

            sections.forEach(section => {
                section.classList.remove('dark-theme')
            });
            header.classList.remove('dark.theme');

            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const sections = document.querySelectorAll('section.section');
        const header = document.querySelector('header');
        const labelMenu = document.querySelector('label.menu');
        const menuButtonsContainer = document.querySelector('div.menu-buttons-container');
        const logo = document.querySelector('.logo-container');

        const observerOptions = {
            root: null,
            threshold: 0.3
        };

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(!isDarkMode) {
                        if (entry.target.classList.contains('light-section')) {
                            labelMenu.classList.add('brown-color');
                            labelMenu.classList.remove('light-color');

                            menuButtonsContainer.classList.add('brown-color');
                            menuButtonsContainer.classList.remove('light-color');

                            header.classList.add('light-section');
                            header.classList.remove('dark-section');

                            document.body.style.backgroundColor = "#F8F3D9"
                        } else if (entry.target.classList.contains('dark-section')) {
                            labelMenu.classList.add('light-color');
                            labelMenu.classList.remove('brown-color');

                            menuButtonsContainer.classList.add('light-color');
                            menuButtonsContainer.classList.remove('brown-color');

                            header.classList.add('dark-section');
                            header.classList.remove('light-section');

                            document.body.style.backgroundColor = "#3F4F44";
                        }
                    } else if(isDarkMode) {

                    }

                    if (entry.target.id === "home" || entry.target.id === "last-part") {
                        if (logo)
                            logo.classList.add('hidden');
                    } else {
                        if (logo)
                            logo.classList.remove('hidden');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        return () => {
            sectionObserver.disconnect();
        }

    }, [location, isDarkMode]);

    return (
        <div>
            <header className="light-section">
                <label className="menu brown-color light-theme">
                    <input type="checkbox" />
                </label>
                <div className="menu-buttons-container">
                    <Link to="/" className="menu-button brown-color light-theme">
                        <span>Home</span>
                    </Link>
                    <a href="/" className="menu-button brown-color light-theme">
                        <span>Work</span>
                    </a>
                    <Link to="/contact" className="menu-button brown-color light-theme">
                        <span>Me</span>
                    </Link>
                    <Link to="/about" className="menu-button brown-color light-theme">
                        <span>About</span>
                    </Link>
                    <label className="darkmode-button-container brown-color light-theme">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                    </label>
                </div>
                <div className="logo-container"></div>
            </header>
        </div>
    );
}

export default Header;