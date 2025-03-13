import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dronesim() {
    const [videoCurrentTime, updateVideoCurrentTime] = useState(0);
    const [videoDuration, updateVideoDuration] = useState(0);
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    useEffect(() => {
      const video = document.querySelector('video');

          if(video) {
            video.addEventListener("timeupdate", updateTime);
          }
      
          function updateTime() {
            updateVideoCurrentTime(video.currentTime);
            updateVideoDuration(video.duration);
      
            const durationCounter = document.querySelector('div.video-bottom div.time');
            if (durationCounter) {
              durationCounter.textContent = `${formatTime(videoCurrentTime)}/${formatTime(videoDuration)}`;
            };
          }

          return () => {
            if(video) {
              video.removeEventListener('timeupdate', updateTime);
            }
          }
    }, [videoCurrentTime, videoDuration]);

    const progressBarWidth = videoDuration ? (videoCurrentTime/videoDuration) * 100 : 0;

    useEffect(() => {
      const videoPlayControl = document.querySelector('div.video-container div.controls'); 
      const videoPlayControlSmall = document.querySelector('div.smallerControls');
      const video = document.querySelector('video');
      
      if(video) {
        videoPlayControl.addEventListener('click', playManager);
        videoPlayControlSmall.addEventListener("click", playManager);
        video.addEventListener("click", showControls);
      }
      
      function showControls() {
        videoPlayControl.classList.add('show');
  
        setTimeout(() => {videoPlayControl.classList.remove('show')}, 1000);
      }

      function playManager() {
        if(video.paused) {
          videoPlayControl.classList.toggle('paused');
          videoPlayControl.classList.toggle('playing');
          videoPlayControlSmall.classList.toggle('playing');
          videoPlayControlSmall.classList.toggle('paused');
          video.play();
        } else if(videoPlayControl.classList.contains('playing')){
          video.pause();
          videoPlayControl.classList.toggle('playing');
          videoPlayControl.classList.toggle('paused');
          videoPlayControlSmall.classList.toggle('playing');
          videoPlayControlSmall.classList.toggle('paused');
        }
      }

      return () => {
        if(video)
          video.removeEventListener('click', showControls);
        if(videoPlayControl)
          videoPlayControl.removeEventListener('click', playManager)
        if(videoPlayControlSmall)
          videoPlayControlSmall.removeEventListener('click', playManager);
      }
    });

  return (
    <div>
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
        <div className="video-container">
          <div className="controls paused"></div>
          <video src="assets/videos/dronesim.mp4"></video>
        </div>
        <div className="video-bottom">
            <div className="smallerControls paused"></div>
            <div className="video-duration-bar">
              <div className="video-progress-bar" style={{width: `${progressBarWidth}%`}}></div>
            </div>
            <div className="time">
              {formatTime(videoCurrentTime)}/{formatTime(videoDuration)}
            </div>
          </div>
        <p>Besides the API connection gets refreshed either automatically every 5 minutes or the user refreshes it through a refresh button. In order to establish the connection successfully, the user must be connected to the university's WiFi   </p>
        <span className="copy-right">©juanfelenis 2025</span>
      </section>
    </div>
  );
}

export default Dronesim;