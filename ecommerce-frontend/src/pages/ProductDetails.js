import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Container, Grid, Typography } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { fetchProductById } from "../services/api";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="page-shell">
        <Typography>Loading product...</Typography>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="page-shell">
        <Alert severity="error">{error || "Product not found."}</Alert>
      </Container>
    );
  }

  return (
    <Container className="product-container page-shell">
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <span className="page-kicker">Product details</span>
        <h1 className="page-title">{product.title}</h1>
        <Typography className="page-subtitle">
          A cleaner two-column product layout with more consistent alignment for images, text, and the main call to action.
        </Typography>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} className="image-section">
          <div className="thumbnail-list">
            <img src={product.image} alt={`${product.title} preview 1`} />
            <img src={product.image} alt={`${product.title} preview 2`} />
            <img src={product.image} alt={`${product.title} preview 3`} />
          </div>

          <div className="main-image">
            <img src={product.image} alt={product.title} />
          </div>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography className="price">Rs. {product.price.toFixed(2)}</Typography>
          <Typography className="rating">{product.category}</Typography>

          <Button className="add-btn" onClick={() => addToCart(product)}>
            Add to cart
          </Button>

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
