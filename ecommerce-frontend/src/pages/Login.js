import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="page-shell" maxWidth="sm" style={{ maxWidth: "640px" }}>
      <div
        className="section-card"
        style={{
          padding: "36px 32px",
        }}
      >
      <Typography variant="h4" style={{ fontFamily: "Georgia, serif", marginBottom: "6px", color: "#222" }}>
        Welcome back
      </Typography>
      <Typography style={{ color: "#5f5f5f", marginBottom: "18px" }}>
        Sign in to manage your cart and orders.
      </Typography>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error ? (
        <Typography color="error" style={{ marginBottom: "12px" }}>
          {error}
        </Typography>
      ) : null}

      <Button variant="contained" fullWidth onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      </div>
    </Container>
  );
}

export default Login;
