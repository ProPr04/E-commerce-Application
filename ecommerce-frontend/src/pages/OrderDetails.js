import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import {
  Alert,
  Card,
  CardContent,
  Box,
  Container,
  Typography,
} from "@mui/material";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.order);
        setItems(res.data.items);
      } catch (err) {
        setError(err.response?.data || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <Container className="page-shell" style={{ maxWidth: "1080px" }}>
      <div className="page-header">
        <span className="page-kicker">Order details</span>
        <h1 className="page-title">A closer look at this order</h1>
        <Typography className="page-subtitle">
          Product media, pricing, and quantities now follow the same spacing and alignment system as the rest of the site.
        </Typography>
      </div>

      {loading ? <Typography style={{ marginTop: "20px" }}>Loading order...</Typography> : null}
      {error ? <Alert severity="error" style={{ marginTop: "20px" }}>{error}</Alert> : null}

      {!loading && !error && order ? (
        <Typography style={{ marginTop: "20px" }}>
          Order #{order.id} placed on {new Date(order.created_at).toLocaleString()}
        </Typography>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <Typography style={{ marginTop: "20px" }}>No items found for this order.</Typography>
      ) : null}

      {items.map((item) => (
        <Card
          key={item.id}
          style={{
            display: "flex",
            marginTop: "20px",
            padding: "12px",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid #ece7e1",
            boxShadow: "0 10px 24px rgba(34, 34, 34, 0.04)",
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
              src={item.product?.image}
              alt={item.product?.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>

          <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography style={{ fontWeight: "600" }}>
              {item.product?.title || `Product #${item.product_id}`}
            </Typography>

            <Typography style={{ marginTop: "5px" }}>
              Rs. {Number(item.product?.price || 0).toFixed(2)}
            </Typography>

            <Typography style={{ marginTop: "5px" }}>
              Quantity: {item.quantity}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default OrderDetails;
