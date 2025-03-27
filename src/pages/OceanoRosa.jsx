import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function OceanoRosa() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <div className="main-content">
            <section id="oceano-rosa" className="section light-section project-info">
                <h2>Océano Rosa</h2>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-2.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-3.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-4.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-5.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/oceano-rosa-assets/oceano-rosa-img-6.png`
                    ]}
                />
                <p>This project was made by me and a team of other students as a project for the class “OOP in java”. The idea was to create a GUI so that a final user could retrieve specific live  information about his drone(s).</p>
                <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
                <p>Our final java application establishes a connection with an API provided by the teacher of the class to retrieve all the available information about the drones posted on the API. </p>
                <CustomVideoPlayer video="oceano-rosa-project.mp4" poster="oceano-rosa-assets/oceano-rosa-img-1.png" />
                <p>Besides the API connection gets refreshed either automatically every 5 minutes or the user refreshes it through a refresh button. In order to establish the connection successfully, the user must be connected to the university's WiFi   </p>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default OceanoRosa;