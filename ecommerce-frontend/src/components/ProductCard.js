import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        borderRadius: "20px",
        border: "1px solid #ece7e1",
        boxShadow: "0 10px 24px rgba(34, 34, 34, 0.04)",
        transition: "0.35s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 32px rgba(34, 34, 34, 0.1)",
        },
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Box
        sx={{
          height: 200,
          padding: "18px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.2, flexGrow: 1 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            lineHeight: 1.35,
            minHeight: "54px",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "#595959" }}>
          {product.category}
        </Typography>

        <Typography variant="body2" sx={{ color: "#222", fontWeight: 700, marginTop: "auto" }}>
          Rs. {Number(product.price).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
