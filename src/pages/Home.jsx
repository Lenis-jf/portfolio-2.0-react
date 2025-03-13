import React from "react";

function Home() {
  return (
    <div>
      <section id="home" className="section light-section">
        <div className="main-logo"></div>
        <div className="hr"></div>
        <h1>Software Engineer<br/>Web Developer<br/>UI & UX Designer</h1>
        <div className="buttons-container">
          <a href="/contact" className="button">Find Me</a>
          <a href="#" className="button">Know Me</a>
        </div>
        <a href="#projects" className="section-changer section-changer-dark">
          <span>See more</span>
          <div></div>
        </a>
      </section>
      <section id="projects" className="section dark-section">
        <p>Here are some of the projects i have worked on</p>
        <p>Just touch or put your mouse on the cards to turn them and go see the GitHub repository of the project</p>
        <div className="project-card drones" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/drones-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/Drone-Project" className="button card-button">Show Repository</a>
            <a href="/dronesim" className="button card-button">See more about it</a>
          </div>
        </div>
        <div className="project-card cultural" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/cultural-fitness-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/Cultural-Fitness" className="button card-button">Show Repository</a>
            <a href="#" className="button card-button">See more about it</a>
          </div>
        </div>
        <div className="project-card batata" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/batata-bit-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/batatabit" className="button card-button">Show Repository</a>
            <a href="#" className="button card-button">See more about it</a>
          </div>
        </div>
        <div className="project-card svq" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/svq-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/SVQ" className="button card-button">Show Repository</a>
            <a href="#" className="button card-button">See more about it</a>
          </div>
        </div>
        <div className="project-card oceano-rosa" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/oceano-rosa-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/Oceano-Rosa.github.io" className="button card-button">Show Repository</a>
            <a href="#" className="button card-button">See more about it</a>
          </div>
        </div>
        <div className="project-card tyc" tabIndex="0">
          <div className="face front">
            <img src="assets/imgs/tyc-project.png" alt="" />
          </div>
          <div className="face back">
            <img src="assets/icons/github-logo.svg" alt="" />
            <a href="https://github.com/Lenis-jf/TYC" className="button card-button">Show Repository</a>
            <a href="#" className="button card-button">See more about it</a>
          </div>
        </div>
        <a href="#abilities" className="section-changer section-changer-light">
          <span>Not finished yet :)</span>
          <div></div>
        </a>
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
        <a href="#last-part" className="section-changer section-changer-dark">
          <span>Do not forget it!</span>
          <div></div>
        </a>
      </section>
      <section id="last-part" className="section dark-section">
        <p>Do not forget my name!</p>
        <div className="main-logo"></div>
        <p>I am Juan Fernando and im here to bring your ideas to reality</p>
        <div className="buttons-container light-color"></div>
        <a href="/contact" className="button">Find Me</a> 
        <a href="#home" className="section-changer section-changer-light">
          <div></div>
          <span>Go back to start</span>
        </a>
        <span className="copy-right">©juanfelenis 2025</span>
      </section>
    </div>
  );
}

export default Home;