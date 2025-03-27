import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Cultural() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <div className="main-content">
            <section id="cultural" className="section light-section project-info">
                <h2>Cultural-Fitness</h2>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-2.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-3.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-4.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-5.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-6.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cultural-fitness-img-7.png`
                    ]}
                />
                <p>This project was made by me and a team of other students as a project for the class “OOP in java”. The idea was to create a GUI so that a final user could retrieve specific live  information about his drone(s).</p>
                <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
                <p>Our final java application establishes a connection with an API provided by the teacher of the class to retrieve all the available information about the drones posted on the API. </p>
                <CustomVideoPlayer video="https://github.com/Lenis-jf/portfolio-2.0-react/raw/refs/heads/main/public/assets/videos/cultural-fitness-project.mp4?download=" poster="cultural-fitness-assets/cultural-fitness-img-1.png" />
                <p>Besides the API connection gets refreshed either automatically every 5 minutes or the user refreshes it through a refresh button. In order to establish the connection successfully, the user must be connected to the university's WiFi   </p>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default Cultural;