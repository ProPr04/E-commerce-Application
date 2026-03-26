import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
          <HeroSection/>
          <Home />
          </>
          } />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />}/>
      </Routes>
    </>
  );
}

export default App;