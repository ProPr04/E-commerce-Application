import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length > 0) {
      return res.status(400).json("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json("User not found");
    }

    // 🔐 Compare hashed password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }

    // ✅ Generate token
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
