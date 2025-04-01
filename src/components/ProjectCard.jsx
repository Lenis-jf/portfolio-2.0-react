import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function ProjectCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const smallCardRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        // Disparar animación al desvoltear desde fuera
        if (isFlipped && smallCardRef.current) {
          const direction = "reverse";
          smallCardRef.current.style.opacity = "0";
          cardRef.current.style.setProperty("--flip-delay", "0s");

          smallCardRef.current.style.animation = "none";
          void smallCardRef.current.offsetWidth;
          smallCardRef.current.style.animation = `cardOut 0.25s ease-in 0.25s 1 ${direction} forwards`;
        }
        setIsFlipped(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isFlipped]); // Añadir dependencia isFlipped

  const handleCardClick = (event) => {
    if (event.target.closest("a.button.card-button")) {
      event.stopPropagation();
      return;
    }

    const newIsFlipped = !isFlipped;
    setIsFlipped(newIsFlipped);

    if (smallCardRef.current) {
      const direction = newIsFlipped ? "normal" : "reverse";
      const animationDelay = newIsFlipped ? "0s" : "0.25s";
      const flipTransitionDelay = newIsFlipped ? "0.25s" : "0s";

      smallCardRef.current.style.opacity = direction === "reverse" ? "0" : "1";
      cardRef.current.style.setProperty("--flip-delay", flipTransitionDelay);

      smallCardRef.current.style.animation = "none";
      void smallCardRef.current.offsetWidth;
      smallCardRef.current.style.animation = `cardOut 0.25s ease-in ${animationDelay} 1 ${direction} forwards`;
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