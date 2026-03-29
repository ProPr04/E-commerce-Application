import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { InputBase } from "@mui/material";
import "../styles/navbar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { isAuthenticated, logout } from "../utils/auth";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate("/")}>
            Htsy
          </div>

          <div className="categories">Categories</div>
        </div>

        <div className="nav-search">
          <InputBase
            placeholder="Search for anything"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
        </div>

        <div className="nav-right">
          <div className="nav-icon-item" onClick={() => navigate("/cart")}>
            <ShoppingCartOutlinedIcon />
            <span>{cart.length}</span>
          </div>

          {isAuthenticated() ? (
            <div className="auth-actions">
              <div className="nav-link-pill" onClick={() => navigate("/orders")}>
                <span>Orders</span>
              </div>
              <span
                className="nav-link-pill nav-link-pill-secondary"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="auth-actions">
              <div className="nav-link-pill nav-link-pill-secondary" onClick={() => navigate("/login")}>
                <span>Login</span>
              </div>
              <div className="nav-link-pill" onClick={() => navigate("/signup")}>
                <PersonOutlineIcon />
                <span>Sign up</span>
              </div>
            </div>
          )}
        </div>

        <div className="navbar-bottom">
          <span>Gifts</span>
          <span>Best of Easter</span>
          <span>Home Favourites</span>
          <span>Fashion Finds</span>
          <span>Vintage</span>
          <span>Registry</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
