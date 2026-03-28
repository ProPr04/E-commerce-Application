import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProductById } from "../data/products.js";

const router = express.Router();

router.post("/place", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartRes = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1",
      [userId]
    );

    const cartItems = cartRes.rows;

    if (cartItems.length === 0) {
      return res.status(400).json("Cart is empty");
    }

    const enrichedItems = cartItems.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));

    if (enrichedItems.some((item) => !item.product)) {
      return res.status(400).json("One or more products are unavailable");
    }

    let total = 0;
    enrichedItems.forEach((item) => {
      total += item.quantity * item.product.price;
    });

    const orderRes = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id",
      [userId, total]
    );

    const orderId = orderRes.rows[0].id;

    for (const item of cartItems) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.product_id, item.quantity]
      );
    }

    await pool.query("DELETE FROM cart WHERE user_id=$1", [userId]);

    res.json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await pool.query(
      `SELECT
        o.*,
        COALESCE(SUM(oi.quantity), 0) AS item_count
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.user_id=$1
      GROUP BY o.id
      ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(orders.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    const order = await pool.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
      [orderId, userId]
    );

    if (order.rows.length === 0) {
      return res.status(404).json("Order not found");
    }

    const items = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1 ORDER BY id",
      [orderId]
    );

    const detailedItems = items.rows.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));

    res.json({
      order: order.rows[0],
      items: detailedItems,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
