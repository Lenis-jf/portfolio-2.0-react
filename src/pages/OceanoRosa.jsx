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
                <h2>Pink Ocean</h2>
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
                <p>My first attempt at "real" web design! Created for a small business i started some years ago, this project was my playground for learning image optimization and taht color theory wasn’t that easy :(. I probably spent more time picking pink shades than coding!</p>
                <a href="https://github.com/Lenis-jf/Drone-Project" className="button">Show Repository</a>
                <p>Though the business closed, the site remains a sweet memory. It taught me how to make grids behave and why mobile-first isn’t just a buzzword!</p>
                <CustomVideoPlayer video="oceano-rosa-project.mp4" poster="oceano-rosa-assets/oceano-rosa-img-1.png" />
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default OceanoRosa;