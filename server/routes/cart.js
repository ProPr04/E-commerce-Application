import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const existing = await pool.query(
      "SELECT * FROM cart WHERE user_id=$1 AND product_id=$2",
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (user_id, product_id) VALUES ($1, $2)",
        [userId, productId]
      );
    }

    res.json("Added to cart");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await pool.query(
      "SELECT * FROM cart WHERE user_id=$1 ORDER BY product_id",
      [userId]
    );

    res.json(cart.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.patch("/decrease/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const existing = await pool.query(
      "SELECT quantity FROM cart WHERE user_id=$1 AND product_id=$2",
      [userId, productId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json("Item not found");
    }

    if (existing.rows[0].quantity > 1) {
      await pool.query(
        "UPDATE cart SET quantity = quantity - 1 WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );
    } else {
      await pool.query(
        "DELETE FROM cart WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );
    }

    res.json("Cart updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    await pool.query(
      "DELETE FROM cart WHERE user_id=$1 AND product_id=$2",
      [userId, productId]
    );

    res.json("Item removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
