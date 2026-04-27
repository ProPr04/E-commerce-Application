import React from "react";
import "../styles/carousel.css";

function Carousel({ image, title, cta }) {
  return (
    <div className="carousel-container">
      <img
        src={image}
        alt={title}
        className="carousel-image"
      />

      <div className="carousel-scrim" />

      <div className="overlay-text">
        <h3>{title}</h3>
        <span>{cta}</span>
      </div>
    </div>
  );
}

export default Carousel;
