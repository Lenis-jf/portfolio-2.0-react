import React, { useEffect } from "react";
import Contact from "./pages/Contact";
import Dronesim from "./pages/Dronesim";
import Home from "./pages/Home";
import Header from "./components/Header";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {

  useEffect(() => {
    const sections = document.querySelectorAll('section.section');
    const logo = document.querySelector('.logo-container');
    const labelMenu = document.querySelector('label.menu');
    const menuButtonsContainer = document.querySelector('div.menu-buttons-container');
    const imagesWrapper = document.querySelector('div.images-wrapper')
    const dronesimImages = document.querySelectorAll('div.images-wrapper div.img');
    const radioButtons = document.querySelectorAll('div.radio-button');
    const arrows = document.querySelectorAll('div.arrow');
    const cards = document.querySelectorAll('.project-card');

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
          } else if (entry.target.classList.contains('dark-section')) {
            labelMenu.classList.add('light-color');
            labelMenu.classList.remove('brown-color');

            menuButtonsContainer.classList.add('light-color');
            menuButtonsContainer.classList.remove('brown-color');
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

    function handleCardClick(event) {
      if (event.target.matches("a.button.card-button")) {
        event.stopPropagation();
        return;
      };

      event.stopPropagation();

      const card = event.currentTarget;

      card.classList.toggle('flipped');
      console.log("Card clickeada:", card);
    }

    cards.forEach(card => { card.addEventListener('click', handleCardClick) });

    document.addEventListener('click', () => {
      cards.forEach(card => {
        if (card.classList.contains('flipped')) {
          card.classList.remove('flipped');
        }
      });
    });

    var currentVisibleImageId = null;

    const sliderObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentVisibleImageId = entry.target.id;
          console.log("Imagen visible:", currentVisibleImageId);

          radioButtons.forEach(radioButton => {
            radioButton.classList.toggle('active', radioButton.id.includes(currentVisibleImageId));
          });

          arrows.forEach(arrow => {
            if (currentVisibleImageId === "first-img" && arrow.classList.contains("left-arrow")) {
              arrow.classList.add("unenabled");
            } else if 
            (currentVisibleImageId === "last-img" && arrow.classList.contains("right-arrow")) {
              arrow.classList.add("unenabled");
            } else {
              arrow.classList.remove("unenabled");
            }
          });
        }
      });
    }, { threshold: 0.8 });

    dronesimImages.forEach(image => {
      sliderObserver.observe(image);
    });

    function handleRBClick(event) {
      event.stopPropagation();
      const radioButton = event.target;

      if (radioButton) {
        const currentImgId = radioButton.getAttribute('id');
        const targetImg = document.getElementById(currentImgId);

        if (targetImg && imagesWrapper) {
          imagesWrapper.scrollTo({
            left: targetImg.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }

    radioButtons.forEach(radioButton => { radioButton.addEventListener('click', handleRBClick) });

    function handleArrowClick(event) {
      event.stopPropagation();
      const arrow = event.target;

      const currentImg = document.getElementById(currentVisibleImageId);
      console.log("currentImg: ", currentImg);

      if(arrow) {
        if(arrow.classList.contains('left-arrow') && currentVisibleImageId != "first-img") {
          let previousImg = currentImg.previousElementSibling;
          console.log("nextSibling: ", previousImg);

          if(previousImg)
            imagesWrapper.scrollTo({
              left: previousImg.offsetLeft,
              behavior: "smooth"
            })
        } else if
        (arrow.classList.contains("right-arrow") && currentVisibleImageId != "last-img") {
          let nextImg = currentImg.nextElementSibling;
          console.log("nextSibling: ", nextImg);

          if(nextImg)
            imagesWrapper.scrollTo({
              left: nextImg.offsetLeft,
              behavior: "smooth"
            })
        }
      }
    }

    arrows.forEach(arrow => {arrow.addEventListener('click', handleArrowClick)});

    return () => {
      sectionObserver.disconnect();
      sliderObserver.disconnect();
      if(cards)
        cards.forEach(card => {
          card.removeEventListener('click', handleCardClick);
        });
      if(radioButtons)
        radioButtons.forEach(radioButton => {
          radioButton.removeEventListener('click', handleRBClick)
        });
      if(arrows)
        arrows.forEach(arrow => {
          arrow.removeEventListener('click', handleArrowClick);
        });
    }

  }, []);

  return (
    <div>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dronesim" element={<Dronesim />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
