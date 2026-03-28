import express from "express";
import { getProductById, products } from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = getProductById(req.params.id);

  if (!product) {
    return res.status(404).json("Product not found");
  }

  res.json(product);
});

export default router;
