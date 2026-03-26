import React, { useEffect, useState,useContext } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { Grid } from "@mui/material";
import { SearchContext } from "../context/SearchContext";
import { Button, Box, Select, MenuItem } from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);
  const { searchQuery, selectedCategory, setSelectedCategory, sortOption, setSortOption } = useContext(SearchContext);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div><Box style={{ marginBottom: "20px" }}>
  <Button onClick={() => setSelectedCategory("all")}>
    All
  </Button>
  <Button onClick={() => setSelectedCategory("men's clothing")}>
    Men
  </Button>
  <Button onClick={() => setSelectedCategory("women's clothing")}>
    Women
  </Button>
  <Button onClick={() => setSelectedCategory("jewelery")}>
    Jewellery
  </Button>
  <Button onClick={() => setSelectedCategory("electronics")}>
    Electronics
  </Button>
</Box>
<Box style={{ marginBottom: "20px" }}>
  <Select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    displayEmpty
  >
    <MenuItem value="">Sort By</MenuItem>
    <MenuItem value="low">Price: Low to High</MenuItem>
    <MenuItem value="high">Price: High to Low</MenuItem>
  </Select>
</Box>
      <h2>Products</h2>
      <Grid container spacing={2}>
        {products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => 
          selectedCategory === "all"? true : product.category === selectedCategory)
        .sort((a,b)=>{
          if(sortOption ==="low"){
            return a.price - b.price;
          }
          if(sortOption ==="high"){
            return b.price - a.price;
          }
          return 0;
        })
        .map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;