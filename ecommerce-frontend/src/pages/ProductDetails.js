import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button } from "@mui/material";
import { CartContext } from "../context/CartContext";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <Container className="product-container">

      <Grid container spacing={4}>

        {/* LEFT SECTION */}
        <Grid item xs={12} md={7} className="image-section">

          {/* Thumbnails */}
          <div className="thumbnail-list">
            <img src={product.image} alt="thumb" />
            <img src={product.image} alt="thumb" />
            <img src={product.image} alt="thumb" />
          </div>

          {/* Main Image */}
          <div className="main-image">
            <img src={product.image} alt={product.title} />
          </div>

        </Grid>

        {/* RIGHT SECTION */}
        <Grid item xs={12} md={5}>

          <Typography className="price">
            ₹ {product.price}+
          </Typography>

          <Typography className="title">
            {product.title}
          </Typography>

          {/* Ratings (static for now) */}
          <Typography className="rating">
            ★★★★★
          </Typography>

          {/* Dropdown */}
          <select className="dropdown">
            <option>Select an option</option>
            <option>Option 1</option>
          </select>

          {/* Add to Cart */}
          <Button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>

          {/* Details */}
          <div className="details">
            <h3>Item details</h3>
            <p>{product.description}</p>
          </div>

        </Grid>

      </Grid>

    </Container>
  );
}

export default ProductDetails;