import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();
    return (
        <Card 
        sx={{ maxWidth: 250,
            margin: 2,
            cursor: "pointer",
            borderRadius:"12px",
            transistion:"0.5s",
            "&:hover":{
                transform:"translateY(-5px)",
                boxShadow:6,
                        }, 
            }}
        onClick={ () => navigate(`/product/${product.id}`)}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                    height:200,
                    objectFit:"contain",
                    padding:"10px",
                    backgroundColor:"#f9f9f9"
                }}
             />

        <CardContent>
            <Typography 
            variant="body1"
            sx ={{
                fontWeight: 500,
                height:"50px",
                overflow:"hidden"
            }} >
                {product.title.substring(0, 40)}...
            </Typography>

            <Typography variant="body2" color="text.secondary">
                ₹ {product.price}
            </Typography>
        </CardContent>
    </Card>
  );
}

export default ProductCard;