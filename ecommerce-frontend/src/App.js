import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import HeroSection from "./components/HeroSection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders/>
          </ProtectedRoute>
        }
        />
        <Route
          path="/orders/:id"
          element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
