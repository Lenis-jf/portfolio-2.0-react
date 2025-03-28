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
                <p>Where fitness meets code! 💪 Collaborated with design students to create this gym-inspired site. Our mission? To create a beautiful landing page with different function like a BMI calculator or even a dark mode button!</p>
                <a href="https://github.com/Lenis-jf/Cultural-Fitness" className="button">Show Repository</a>
                <p>Learned to work with designers’ mockups (turns out "pixel perfect" is harder than it sounds!). It is pretty easy to navigate through the different sections and im still proud of the design and amount of usefull information the website has</p>
                <CustomVideoPlayer video="cultural-fitness-project.mp4" poster="cultural-fitness-assets/cultural-fitness-img-1.png" />
                <a href="https://lenis-jf.github.io/Cultural-Fitness" className="button">Visit Website</a>
                <p>Though the business plan fizzled, the code survived! Check out our Figma-to-CSS journey below—it’s like watching a baby bird learn to fly!</p>
                <CustomImageSlider
                    images={[
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cf-figma-img-1.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cf-figma-img-2.png`,
                        `${process.env.PUBLIC_URL}/assets/imgs/cultural-fitness-assets/cf-figma-img-3.png`
                    ]}
                />
                <p>Biggest takeaway? Teamwork makes the code work! (And always version control your designs)</p>
                <span className="copy-right">©juanfelenis 2025</span>
            </section>
        </div>
    );
}

export default Cultural;