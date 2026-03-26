import React, { useState, useEffect } from "react";
import "../styles/carousel.css";

function Carousel() {
  const images = [
    "/images/carousel1.jpg",
    "/images/carousel2.jpg",
    "/images/carousel3.jpg",
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); //stops the interval
  }, []);
  // Button Function
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="carousel-container">

      <img
        src={images[index]}
        alt="carousel"
        className="carousel-image"
      />

      <div className="overlay-text">
        Host your best Easter brunch yet
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>

    </div>
  );
}

export default Carousel;