import React, { useContext } from "react";
import {SearchContext } from "../context/SearchContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { InputBase} from "@mui/material";
import "../styles/navbar.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";


function Navbar() {
  const { cart } = useContext(CartContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/* TOP ROW */}
      <div className="navbar-top">

        {/* LEFT */}
        <div className="nav-left">
          <div className="logo" onClick={() => navigate("/")}>
            Garibo ka amazon
          </div>

          <div className="categories">Categories</div>
        </div>

        {/* CENTER SEARCH */}
        <div className="nav-search">
          <InputBase
            placeholder="Search for anything"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
            < SearchIcon/>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
  <div className="nav-item">
    <PersonOutlineIcon />
    <span>Sign in</span>
  </div>

  <FavoriteBorderIcon />

  <div
    className="nav-item"
    onClick={() => navigate("/cart")}
  >
    <ShoppingCartOutlinedIcon />
      <span>{cart.length}</span>
    </div>
    </div>

      </div>

      {/* BOTTOM ROW */}
      <div className="navbar-bottom">
        <span>Gifts</span>
        <span>Best of Easter</span>
        <span>Home Favourites</span>
        <span>Fashion Finds</span>
        <span>Vintage</span>
        <span>Registry</span>
      </div>

    </div>
  );
}

export default Navbar;