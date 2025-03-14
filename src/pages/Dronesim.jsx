import React, { useEffect, useState } from "react";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Dronesim() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    const imagesWrapper = document.querySelector('div.images-wrapper')
    const dronesimImages = document.querySelectorAll('div.images-wrapper div.img');
    const radioButtons = document.querySelectorAll('div.radio-button');
    const arrows = document.querySelectorAll('div.arrow');

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
    }, { threshold: 0.2 });

    dronesimImages.forEach(image => {
      sliderObserver.observe(image);
    });

    function handleRBClick(event) {
      event.stopPropagation();
      const radioButton = event.target;

      console.log("radioButton clicked: ", radioButton);

      if (radioButton) {
        const currentImgIdRB = radioButton.getAttribute('id');
        const targetImg = document.getElementById(currentImgIdRB);

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

      console.log("Arrow clicked: ", arrow);

      const currentImgA = document.getElementById(currentVisibleImageId);
      console.log("currentImg: ", currentImgA);

      if (arrow && imagesWrapper) {
        if (arrow.classList.contains('left-arrow') && currentVisibleImageId != "first-img") {
          let previousImg = currentImgA.previousElementSibling;
          console.log("previousSibling: ", previousImg);

          if (previousImg)
            imagesWrapper.scrollTo({
              left: previousImg.offsetLeft,
              behavior: "smooth"
            })
        } else if
          (arrow.classList.contains("right-arrow") && currentVisibleImageId != "last-img") {
          let nextImg = currentImgA.nextElementSibling;
          console.log("nextSibling: ", nextImg);

          if (nextImg)
            imagesWrapper.scrollTo({
              left: nextImg.offsetLeft,
              behavior: "smooth"
            })
        }
      }
    }

    arrows.forEach(arrow => { arrow.addEventListener('click', handleArrowClick) });

    return () => {
      sliderObserver.disconnect();

      if (radioButtons)
        radioButtons.forEach(radioButton => {
          radioButton.removeEventListener('click', handleRBClick)
        });
      if (arrows)
        arrows.forEach(arrow => {
          arrow.removeEventListener('click', handleArrowClick);
        });
    }
  }, []);

  return (
    <div className="main-content">
      <section id="dronesim" className="section light-section project-info">
        <h2>Drones Simulation</h2>
        <div className="img-presentator-container">
          <div className="left-arrow arrow"></div>
          <div className="images-wrapper">
            <div id="first-img" className="img"></div>
            <div id="img-2" className="img"></div>
            <div id="last-img" className="img"></div>
          </div>
          <div className="right-arrow arrow"></div>
        </div>
        <div className="radio-buttons-container">
          <div id="first-img" className="radio-button first-rb"></div>
          <div id="img-2" className="radio-button second-rb"></div>
          <div id="last-img" className="radio-button third-rb"></div>
        </div>
        <p>This project was made by me and a team of other students as a project for the class “OOP in java”. The idea was to create a GUI so that a final user could retrieve specific live  information about his drone(s).</p>
        <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
        <p>Our final java application establishes a connection with an API provided by the teacher of the class to retrieve all the available information about the drones posted on the API. </p>
        <CustomVideoPlayer />
        <p>Besides the API connection gets refreshed either automatically every 5 minutes or the user refreshes it through a refresh button. In order to establish the connection successfully, the user must be connected to the university's WiFi   </p>
        <span className="copy-right">©juanfelenis 2025</span>
      </section>
    </div>
  );
}

export default Dronesim;