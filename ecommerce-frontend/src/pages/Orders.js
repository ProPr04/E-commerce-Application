import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Alert, Card, CardContent, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="page-shell" style={{ maxWidth: "1080px" }}>
      <div className="page-header">
        <span className="page-kicker">Orders</span>
        <h1 className="page-title">Your recent purchases</h1>
        <Typography className="page-subtitle">
          Each order now follows the same hierarchy and spacing as the rest of the storefront.
        </Typography>
      </div>

      {loading ? <Typography style={{ marginTop: "20px" }}>Loading orders...</Typography> : null}
      {error ? <Alert severity="error" style={{ marginTop: "20px" }}>{error}</Alert> : null}

      {!loading && !error && orders.length === 0 ? (
        <Typography style={{ marginTop: "20px" }}>No orders yet. Start shopping.</Typography>
      ) : null}

      {orders.map((order) => (
        <Card
          key={order.id}
          style={{
            marginTop: "20px",
            padding: "12px",
            cursor: "pointer",
            borderRadius: "20px",
            border: "1px solid #ece7e1",
            boxShadow: "0 10px 24px rgba(34, 34, 34, 0.04)",
          }}
          onClick={() => navigate(`/orders/${order.id}`)}
        >
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>Order #{order.id}</Typography>
            <Typography style={{ color: "#222", fontWeight: 600 }}>
              Total: Rs. {Number(order.total_price).toFixed(2)}
            </Typography>
            <Typography style={{ color: "#5f5f5f" }}>Items: {order.item_count}</Typography>
            <Typography style={{ color: "#5f5f5f" }}>
              Placed: {new Date(order.created_at).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Orders;
