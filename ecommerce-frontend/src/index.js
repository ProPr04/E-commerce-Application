import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CartProvider>
      <SearchProvider>
        <App/>
      </SearchProvider>  
    </CartProvider>
  </BrowserRouter>
);
