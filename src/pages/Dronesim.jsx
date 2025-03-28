import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Dronesim() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, []);

  return (
    <div className="main-content">
      <section id="dronesim" className="section light-section project-info">
        <h2>Drones Simulation</h2>
        <CustomImageSlider
          images={[
            `${process.env.PUBLIC_URL}/assets/imgs/dronesim-assets/dronesim-img-1.png`,
            `${process.env.PUBLIC_URL}/assets/imgs/dronesim-assets/dronesim-img-2.png`,
            `${process.env.PUBLIC_URL}/assets/imgs/dronesim-assets/dronesim-img-3.png`
          ]}
        />
        <p>My first big Java project! 🚀 Developed for our OOP class, this GUI app taught me the magic of APIs and teamwork. We created different sections to display live drone data from a website provided by our university with search filters and calculated metrics like current battery consumption (yes, we did math for fun!).</p>
        <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
        <p>The catch? It only worked on campus WiFi! Though challenging, this project made me fall in love with problem-solving. Who knew connecting to an API could feel like cracking a secret code?</p>
        <CustomVideoPlayer video="dronesim.mp4" poster="dronesim-assets/dronesim-img-1.png" />
        <p>Looking back, it’s raw and beginner-friendly—exactly how learning should feel. My proudest moment? When our pagination function actually worked!</p>
        <span className="copy-right">©juanfelenis 2025</span>
      </section>
    </div>
  );
}

export default Dronesim;