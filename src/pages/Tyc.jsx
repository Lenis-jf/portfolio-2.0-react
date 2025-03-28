import React, { useEffect } from "react";
import CustomImageSlider from "../components/CustomImageSlider";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

function Tyc() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <div className="main-content">
            <section id="tyc" className="section light-section project-info">
                <h2>TYC</h2>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/tyc-assets/tyc-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/tyc-assets/tyc-img-2.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/tyc-assets/tyc-img-3.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/tyc-assets/tyc-img-4.png`
                    ]}
                />
                <p>My "let’s-get-back-into-coding" passion project! 💡 I experimented with CSS animations and Figma prototyping for the first time</p>
                <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
                <p>Though unfinished, TYC reignited my coding spark. It’s like a time capsule showing my early attempts at making websites feel alive. Bonus: I finally understood z-index layers!</p>
                <CustomVideoPlayer video="tyc-project.mp4" poster="tyc-assets/tyc-img-1.png" />
                <p>Fun fact: The name TYC stands for "Trying Your Code" – which is exactly what I did here!</p>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default Tyc;