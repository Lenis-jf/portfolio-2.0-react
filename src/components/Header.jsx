import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // 2. Estado inicial desde localStorage
        return localStorage.getItem("dark-theme") === "true";
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            store(newValue);
            return newValue;
        });
    };

    function store(value) {
        localStorage.setItem("dark-theme", value.toString());
    }

    useEffect(() => {
        const root = document.documentElement;
        const sections = document.querySelectorAll('section.section');
        const divHR = document.querySelector('div.hr');
        const githubLogos = document.querySelectorAll("div.face.back img");
        const header = document.querySelector('header');

        if (isDarkMode) {
            root.classList.add("dark-theme");

            header.classList.add("dark-theme");

            sections.forEach(section => section.classList.add("dark-theme"));

            divHR?.classList.add('dark-theme');

            githubLogos?.forEach(logo => logo.src = `${process.env.PUBLIC_URL}/assets/icons/github-logo-light.svg`);
        } else {
            root.classList.remove("dark-theme");

            header.classList.remove("dark-theme");

            sections.forEach(section => section.classList.remove("dark-theme"));

            divHR?.classList.remove('dark-theme');

            githubLogos?.forEach(logo => logo.src = `${process.env.PUBLIC_URL}/assets/icons/github-logo.svg`);
        }

        console.log(localStorage.getItem("dark-theme"));

    }, [isDarkMode, location]);

    useEffect(() => {
        const sections = document.querySelectorAll('section.section');
        const sectionChangers = document.querySelectorAll('div.section-changer');
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
                    if (!isDarkMode) {
                        if (entry.target.classList.contains('light-section')) {
                            labelMenu.classList.add('brown-color');
                            labelMenu.classList.remove('light-color');

                            menuButtonsContainer.classList.add('brown-color');
                            menuButtonsContainer.classList.remove('light-color');

                            document.body.style.backgroundColor = "#F8F3D9"
                        } else if (entry.target.classList.contains('dark-section')) {
                            labelMenu.classList.add('light-color');
                            labelMenu.classList.remove('brown-color');

                            menuButtonsContainer.classList.add('light-color');
                            menuButtonsContainer.classList.remove('brown-color');

                            document.body.style.backgroundColor = "#3F4F44";
                        }
                    } else if (isDarkMode) {
                        if (entry.target.classList.contains('light-section')) {
                            document.body.style.backgroundColor = "#3C3D37"
                        } else if (entry.target.classList.contains('dark-section')) {
                            document.body.style.backgroundColor = "#1E201E";
                        }
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

        if (isDarkMode) {
            sectionChangers.forEach(sectionChanger => {
                if (sectionChanger.classList.contains("section-changer-dark")) {
                    sectionChanger.classList.remove('section-changer-dark');
                    sectionChanger.classList.add('section-changer-light');
                    sectionChanger.style.marginTop = "100px";
                }
            });
        } else if (!isDarkMode) {
            sectionChangers.forEach(sectionChanger => {
                const parentSection = sectionChanger.closest('section');

                if (parentSection && parentSection.classList.contains('light-section')) {
                    if (sectionChanger.classList.contains("section-changer-light")) {
                        sectionChanger.classList.remove('section-changer-light');
                        sectionChanger.classList.add('section-changer-dark');
                    }
                }
            });
        }

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
                <div className={`menu-buttons-container ${isDarkMode ? 'dark-theme' : ''} brown-color`}>
                    <Link to="/" className={`menu-button ${isDarkMode ? 'dark-theme' : ''}`}>
                        <span>Home</span>
                    </Link>
                    <a href="/" className={`menu-button ${isDarkMode ? 'dark-theme' : ''}`}>
                        <span>Work</span>
                    </a>
                    <Link to="/contact" className={`menu-button ${isDarkMode ? 'dark-theme' : ''}`}>
                        <span>Me</span>
                    </Link>
                    <Link to="/about" className={`menu-button ${isDarkMode ? 'dark-theme' : ''}`}>
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