import React from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section id="home" className="section light-section">
        <div className="main-logo"></div>
        <div className="hr"></div>
        <h1>Software Engineer<br />Web Developer<br />UI & UX Designer</h1>
        <div className="buttons-container">
          <Link to="/contact" className="button">Find Me</Link>
          <Link to="#" className="button">Know Me</Link>
        </div>
        <div className="section-changer section-changer-dark projects">
          <span>See more</span>
          <div></div>
        </div>
      </section>
      <section id="projects" className="section dark-section">
        <p>Here are some of the projects i have worked on</p>
        <p>Just touch or put your mouse on the cards to turn them and go see the GitHub repository of the project</p>
        <ProjectCard 
          frontImage="dronesim-assets/drones-project.png"
          repoURL="https://github.com/Lenis-jf/Drone-Project"
          path="/dronesim"
        />
        <ProjectCard 
          frontImage="cultural-fitness-assets/cultural-fitness-project.png"
          repoURL="https://github.com/Lenis-jf/Cultural-Fitness"
          path="/cultural-fitness"
        />
        <ProjectCard 
          frontImage="batatabit-assets/batata-bit-project.png"
          repoURL="https://github.com/Lenis-jf/batatabit"
          path="/batatabit"
        />
        <ProjectCard 
          frontImage="svq-assets/svq-project.png"
          repoURL="https://github.com/Lenis-jf/SVQ"
          path="/svq"
        />
        <ProjectCard 
          frontImage="tyc-assets/tyc-project.png"
          repoURL="https://github.com/Lenis-jf/TYC"
          path="/tyc"
        />
        <ProjectCard 
          frontImage="oceano-rosa-assets/oceano-rosa-project.png"
          repoURL="https://github.com/Lenis-jf/Oceano-Rosa.github.io"
          path="/oceano-rosa"
        />
        <div className="section-changer section-changer-light abilities">
          <span>Not finished yet :)</span>
          <div></div>
        </div>
      </section>
      <section id="abilities" className="section light-section">
        <h2>Development Abilities</h2>
        <p>These are the programming languages i master until now</p>
        <div className="icons-container">
          <div className="icon js"></div>
          <div className="icon react"></div>
          <div className="icon r"></div>
          <div className="icon c"></div>
          <div className="icon python"></div>
          <div className="icon cpp"></div>
          <div className="icon java"></div>
        </div>
        <p>Design and styling tools i dominate</p>
        <div className="icons-container">
          <div className="icon scss"></div>
          <div className="icon css"></div>
          <div className="icon html"></div>
          <div className="icon figma"></div>
        </div>
        <h5>Strengths:</h5>
        <p>The programming languages i have worked most with are Java, JavaScript and C++. In addition to the programming languages i mentioned before, i have also worked with MIPS (assembler) and HSQLDB</p>
        <div className="section-changer section-changer-dark last-part">
          <span>Do not forget it!</span>
          <div></div>
        </div>
      </section>
      <section id="last-part" className="section dark-section">
        <p>Do not forget my name!</p>
        <div className="main-logo"></div>
        <p>I am Juan Fernando and im here to bring your ideas to reality</p>
        <div className="buttons-container light-color"></div>
        <Link to="/contact" className="button">Find Me</Link>
        <div className="section-changer section-changer-light home">
          <div></div>
          <span>Go back to start</span>
        </div>
        <span className="copy-right">©juanfelenis 2025</span>
      </section>
    </div>
  );
}

export default Home;
