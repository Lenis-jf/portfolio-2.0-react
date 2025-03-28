import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Svq() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <div className="main-content">
            <section id="svq" className="section light-section project-info">
                <h2>SVQ</h2>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/svq-assets/svq-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/svq-assets/svq-img-2.png`
                    ]}
                />
                <p>My "almost-real-client" experience! Partnered with a designer friend to create a cleaning service site based in New York City. Learned to make disinfection look chic!</p>
                <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
                <p>We had big plans—animation mops that danced on scroll! But life happened, and the project cleaned up early. Still, wanting to create crazy animations for the project with the new things i have learned until know :(.</p>
                <CustomVideoPlayer video="svq-project.mp4" poster="svq-assets/svq-img-1.png" />
                <p>Silver lining? Discovered I love making mundane services look extraordinary!</p>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default Svq;