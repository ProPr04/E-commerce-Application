import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/axios";
import { fetchProductById } from "../services/api";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Box,
  Container,
  Typography,
} from "@mui/material";

function Cart() {
  const {
    cart,
    cartLoading,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    refreshCart,
  } = useContext(CartContext);
  const [detailedCart, setDetailedCart] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoadingDetails(true);
        setError("");

        const results = await Promise.all(
          cart.map(async (item) => {
            const data = await fetchProductById(item.id);
            return {
              ...data,
              quantity: item.quantity,
            };
          })
        );

        setDetailedCart(results);
      } catch (err) {
        setError(err.response?.data || "Failed to load cart items.");
      } finally {
        setLoadingDetails(false);
      }
    };

    if (cart.length > 0) {
      fetchDetails();
    } else {
      setDetailedCart([]);
      setLoadingDetails(false);
    }
  }, [cart]);

  const totalPrice = detailedCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!detailedCart.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");
      await API.post("/orders/place");
      setOrderSuccess(true);
      await refreshCart();

      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } catch (err) {
      setError(err.response?.data || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <Container className="page-shell" style={{ maxWidth: "1080px" }}>
      <div className="page-header">
        <span className="page-kicker">Cart</span>
        <h1 className="page-title">Review your picks</h1>
        <Typography className="page-subtitle">
          Keep quantities, pricing, and actions aligned in one place before checkout.
        </Typography>
      </div>

      {cartLoading || loadingDetails ? <Typography>Loading cart...</Typography> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}
      {orderSuccess ? (
        <Alert severity="success" style={{ marginTop: "12px" }}>
          Order placed successfully.
        </Alert>
      ) : null}

      {!cartLoading && !loadingDetails && detailedCart.length === 0 ? (
        <Typography
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#666",
          }}
        >
          Your cart is empty. Start exploring products!
        </Typography>
      ) : null}

      {detailedCart.map((item) => (
        <Card
          key={item.id}
          style={{
            display: "flex",
            marginTop: "20px",
            padding: "16px",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid #ece7e1",
            boxShadow: "0 10px 24px rgba(34, 34, 34, 0.04)",
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>

          <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography style={{ fontWeight: "500", fontSize: "15px" }}>
              {item.title}
            </Typography>

            <Typography style={{ marginTop: "6px", fontWeight: "600" }}>
              Rs. {item.price.toFixed(2)}
            </Typography>

            <div style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => decreaseQuantity(item.id)}
                style={{ borderRadius: "20px", minWidth: "32px", padding: "4px 10px" }}
              >
                -
              </Button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <Button
                variant="outlined"
                size="small"
                onClick={() => increaseQuantity(item.id)}
                style={{ borderRadius: "20px", minWidth: "32px", padding: "4px 10px" }}
              >
                +
              </Button>
            </div>

            <Button
              onClick={() => removeFromCart(item.id)}
              style={{ marginTop: "10px", textTransform: "none", color: "#d32f2f" }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}

      {detailedCart.length > 0 ? (
        <>
          <Typography
            variant="h6"
            style={{
              marginTop: "30px",
              fontWeight: "700",
              borderTop: "1px solid #e1e3df",
              paddingTop: "15px",
            }}
          >
            Total: Rs. {totalPrice.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            style={{
              marginTop: "20px",
              backgroundColor: "#222222",
              borderRadius: "24px",
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: "500",
            }}
          >
            {placingOrder ? "Placing order..." : "Place Order"}
          </Button>
        </>
      ) : null}
    </Container>
  );
}

export default Cart;
