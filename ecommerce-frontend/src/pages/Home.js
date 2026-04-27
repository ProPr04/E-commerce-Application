import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/SearchContext";
import { fetchProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
  } = useContext(SearchContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOption === "low") {
        return a.price - b.price;
      }
      if (sortOption === "high") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="page-shell" style={{ paddingTop: "14px" }}>
      <Box
        className="section-card"
        style={{
          padding: "18px",
          marginBottom: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <Button variant={selectedCategory === "all" ? "contained" : "text"} onClick={() => setSelectedCategory("all")}>All</Button>
          <Button variant={selectedCategory === "men's clothing" ? "contained" : "text"} onClick={() => setSelectedCategory("men's clothing")}>Men</Button>
          <Button variant={selectedCategory === "women's clothing" ? "contained" : "text"} onClick={() => setSelectedCategory("women's clothing")}>Women</Button>
          <Button variant={selectedCategory === "jewelery" ? "contained" : "text"} onClick={() => setSelectedCategory("jewelery")}>Jewellery</Button>
          <Button variant={selectedCategory === "electronics" ? "contained" : "text"} onClick={() => setSelectedCategory("electronics")}>Electronics</Button>
        </Box>

        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 190 }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="low">Price: Low to High</MenuItem>
          <MenuItem value="high">Price: High to Low</MenuItem>
        </Select>
      </Box>

      {loading ? <Typography>Loading products...</Typography> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
      {!loading && !error && filteredProducts.length === 0 ? (
        <Typography>No products match your filters.</Typography>
      ) : null}

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
