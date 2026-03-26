import React from "react";
import Carousel from "./Carousel.js";
import{Box, Typography, Button} from "@mui/material";
import "../styles/hero.css";


function HeroSection() {
    return(
        <Box className ="hero-Container">
            <Box className="hero-left">
                <Typography className="hero-title">
                    Your one-stop shop for Best Easter find
                </Typography>
                <Button className="hero-button">
                    shop for favourites
                </Button>
            </Box>
            <Box className="hero-right">
                <Carousel />
            </Box>
        </Box>
    )
}
export default HeroSection;