import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Batatabit() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <div className="main-content">
            <section id="batatabit" className="section light-section project-info">
                <h2>Batatabit</h2>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/batatabit-assets/batatabit-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/batatabit-assets/batatabit-img-2.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/batatabit-assets/batatabit-img-3.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/batatabit-assets/batatabit-img-4.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/batatabit-assets/batatabit-img-5.png`
                    ]}
                />
                <p>My first moment of satisfaction in web development! 🌱 Followed a Platzi course to create this crypto platform—my first proper landing page. Learned a lot of design and web development princips i still following nowadays</p>
                <a href="https://github.com/Lenis-jf/batatabit" className="button">Show Repository</a>
                <p>The challenge? Translating Figma designs without crying! Discovered CSS Grid’s magic and why mobile-first is like wearing pants before shoes.</p>
                <CustomVideoPlayer video="batatabit-project.mp4" poster="batatabit-assets/batatabit-img-1.png" />
                <a href="https://lenis-jf.github.io/batatabit" className="button">Visit Website</a>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default Batatabit;