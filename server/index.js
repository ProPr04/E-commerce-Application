import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import pool from "./db.js"
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import productRoutes from "./routes/products.js";



dotenv.config();


const app = express();



// Middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/auth",authRoutes)
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});
app.get("/test-db", async (req,res) =>{
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
});
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
