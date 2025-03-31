import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function ProjectCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const smallCardRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsFlipped(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleCardClick = (event) => {
    if (event.target.closest("a.button.card-button")) {
      event.stopPropagation();
      return;
    }

    setIsFlipped(!isFlipped);

    if (smallCardRef.current && !isFlipped) {
      smallCardRef.current.style.animationPlayState = "running";
    } else if (isFlipped && smallCardRef.current) {
      smallCardRef.current.style.animationDirection = "reverse";
      smallCardRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div
      className={`project-card ${isFlipped ? "flipped" : ""}`}
      tabIndex="0"
      onClick={handleCardClick}
      ref={cardRef}
    >
      <div className="face front">
        <img
          loading="lazy"
          src={`${process.env.PUBLIC_URL}/assets/imgs/${props.frontImage}`} alt="Project interactive preview card"
        />
      </div>
      <div className="face back">
        <img src={`${process.env.PUBLIC_URL}/assets/icons/github-logo.svg`} alt="Github Logo" />
        <a href={props.repoURL} className="button card-button">Show Repository</a>
        <Link to={props.path} className="button card-button">See more about it</Link>
      </div>
      <div className="small-info-card" ref={smallCardRef}>
        <h4>{props.projectTitle}</h4>
        <h6>Built with:</h6>
        <p>{props.tools}</p>
      </div>
    </div>
  );
}

export default ProjectCard;