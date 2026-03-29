import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const buildCatalogContext = () =>
  products
    .map(
      (product) =>
        `- ${product.title} | category: ${product.category} | price: Rs. ${product.price} | description: ${product.description}`
    )
    .join("\n");

router.post("/assistant", async (req, res) => {
  const { messages = [], pageContext = {} } = req.body || {};
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return res.status(503).json(
      "Chat assistant is not configured yet. Add your Groq API key in server/.env."
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json("Messages are required");
  }

  const trimmedMessages = messages
    .slice(-8)
    .filter(
      (message) =>
        message &&
        typeof message.role === "string" &&
        typeof message.content === "string" &&
        message.content.trim()
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));

  if (trimmedMessages.length === 0) {
    return res.status(400).json("No valid messages provided");
  }

  const systemPrompt = `You are ShopMate, an ecommerce shopping assistant inspired by Amazon Rufus.

Your job:
- Help users discover products, compare options, explain categories, and answer shopping questions.
- Stay concise, practical, and friendly.
- Prefer recommending products that exist in this catalog.
- When suggesting products, mention why each option fits the user's need.
- If the request is outside the catalog, say so clearly and still be helpful.
- Never invent unavailable products or policies.
- Keep replies short enough for a shopping assistant UI.

Current page context:
${JSON.stringify(pageContext, null, 2)}

Available catalog:
${buildCatalogContext()}`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.6,
        max_completion_tokens: 500,
        messages: [{ role: "system", content: systemPrompt }, ...trimmedMessages],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error?.message || "Groq request failed. Check your API key and model.";
      return res.status(response.status).json(message);
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json("The assistant did not return a response.");
    }

    res.json({ reply });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Unable to reach the chat assistant right now.");
  }
});

export default router;
