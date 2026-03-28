import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Carousel from "./Carousel.js";
import "../styles/hero.css";

const slides = [
  {
    title: "Dive into our dreamiest spring finds",
    copy: "Fresh decor, giftable accents, and warm seasonal pieces arranged with a cleaner Etsy-inspired layout.",
    cta: "Shop our favourites",
    accent: "#b7e4d7",
    image: "/images/Carousel1.png",
    sideTitle: "These are the very best Easter finds",
    sideCta: "Shop now",
  },
  {
    title: "Celebrate the season with handmade charm",
    copy: "A softer hero area with stronger alignment, clearer text blocks, and room for your imagery to shine.",
    cta: "Browse spring edits",
    accent: "#f3dfc2",
    image: "/images/Carousel2.png",
    sideTitle: "Fresh gifting ideas for every celebration",
    sideCta: "See collection",
  },
  {
    title: "Thoughtful details for home and gifting",
    copy: "Balanced imagery, consistent spacing, and better visual hierarchy across the storefront.",
    cta: "Explore new arrivals",
    accent: "#d7ead8",
    image: "/images/Carousel3.png",
    sideTitle: "Small details, standout seasonal style",
    sideCta: "Discover more",
  },
];

function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];
  const side = slides[(index + 1) % slides.length];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Box className="hero-container">
      <Box className="hero-feature-card">
        <Box
          className="hero-copy-panel"
          style={{ backgroundColor: current.accent }}
        >
          <Typography className="hero-title">
            {current.title}
          </Typography>
          <Typography className="hero-copy">
            {current.copy}
          </Typography>
          <Button className="hero-button">
            {current.cta}
          </Button>
        </Box>

        <Box className="hero-image-panel" style={{ backgroundColor: current.accent }}>
          
        </Box>
      </Box>

      <Carousel
        image={side.image}
        title={side.sideTitle}
        cta={side.sideCta}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </Box>
  );
}

export default HeroSection;
