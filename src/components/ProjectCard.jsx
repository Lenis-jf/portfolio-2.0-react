import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function ProjectCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

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
    </div>
  );
}

export default ProjectCard;