import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await API.post("/auth/signup", {
        email,
        password,
      });

      setSuccess("Signup successful. You can log in now.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
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
      <Typography
        variant="h4"
        style={{ fontFamily: "Georgia, serif", marginBottom: "6px", color: "#222" }}
      >
        Create your account
      </Typography>
      <Typography style={{ color: "#5f5f5f", marginBottom: "18px" }}>
        Join to save favorites, track orders, and check out faster.
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
      {success ? (
        <Typography color="success.main" style={{ marginBottom: "12px" }}>
          {success}
        </Typography>
      ) : null}

      <Button variant="contained" fullWidth onClick={handleSignup} disabled={loading}>
        {loading ? "Creating account..." : "Signup"}
      </Button>
      </div>
    </Container>
  );
}

export default Signup;
