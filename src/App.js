import React, { useEffect } from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dronesim from "./pages/Dronesim";
import Cultural from "./pages/Cultural";
import Batatabit from "./pages/Batatabit";
import Svq from "./pages/Svq";
import Tyc from "./pages/Tyc";
import OceanoRosa from "./pages/OceanoRosa";
import Home from "./pages/Home";
import Header from "./components/Header";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
// import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter>
        <RouterComponent />
      </HashRouter>
    </div>
  );
}

function RouterComponent() {

  const location = useLocation(); 

  useEffect(() => {
    const sections = document.querySelectorAll('section.section');
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo-container');
    const labelMenu = document.querySelector('label.menu');
    const menuButtonsContainer = document.querySelector('div.menu-buttons-container');
    const sectionChangers = document.querySelectorAll('div.section-changer');

    function goToSection(event) {
      const targetClasses = ["projects", "abilities", "home", "last-part"];
      const target = event.target.closest('.section-changer');

      console.log("Section to go: ", target)
      
      var matchedClass = null;

      if(target)
         matchedClass = targetClasses.find(targetClass => target.classList.contains(targetClass));

      if(matchedClass)
        document.getElementById(matchedClass).scrollIntoView();
    }

    sectionChangers.forEach(sectionChanger => {sectionChanger.addEventListener('click', goToSection);});

    console.log("Secciones totales detectadas:", sections);

    const observerOptions = {
      root: null,
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          localStorage.setItem('lastSection', id);

          console.log("Sección visible:", id);
          console.log("Sección visible:", entry.target.classList);

          if (entry.target.classList.contains('light-section')) {
            labelMenu.classList.add('brown-color');
            labelMenu.classList.remove('light-color');

            menuButtonsContainer.classList.add('brown-color');
            menuButtonsContainer.classList.remove('light-color');

            header.classList.add('light-section');
            header.classList.remove('dark-section');
          } else if (entry.target.classList.contains('dark-section')) {
            labelMenu.classList.add('light-color');
            labelMenu.classList.remove('brown-color');

            menuButtonsContainer.classList.add('light-color');
            menuButtonsContainer.classList.remove('brown-color');

            header.classList.add('dark-section');
            header.classList.remove('light-section');
          }

          if (id == 'home' || id == 'last-part') {
            logo.classList.add('hidden');
          } else {
            logo.classList.remove('hidden');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    const lastSection = localStorage.getItem('lastSection');

    if (lastSection && document.getElementById(lastSection)) {
      document.getElementById(lastSection).scrollIntoView();
    } else if (document.getElementById('home')) {
      document.getElementById('home').scrollIntoView();
    }

    return () => {
      sectionObserver.disconnect();
      if(sectionChangers) {
        sectionChangers.forEach(sectionChanger => {
          sectionChanger.removeEventListener('click', goToSection);
        });
      }
    }

  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dronesim" element={<Dronesim />} />
        <Route path="/cultural-fitness" element={<Cultural />} />
        <Route path="/batatabit" element={<Batatabit />} />
        <Route path="/svq" element={<Svq />} />
        <Route path="/tyc" element={<Tyc />} />
        <Route path="/oceano-rosa" element={<OceanoRosa />} />
      </Routes>
      {/* <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dronesim" element={<Dronesim />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
  
}

export default App;
