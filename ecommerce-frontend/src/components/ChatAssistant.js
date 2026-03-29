import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axios";
import "../styles/chatAssistant.css";

const starterPrompts = [
  "Help me find a gift under Rs. 100",
  "Which products are best for spring decor?",
  "Compare jewelry options for daily wear",
];

function ChatAssistant() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm ShopMate. Ask me for gift ideas, product comparisons, or quick recommendations from this store.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pageLabel = useMemo(() => {
    if (location.pathname.startsWith("/product/")) return "product details";
    if (location.pathname.startsWith("/cart")) return "cart";
    if (location.pathname.startsWith("/orders")) return "orders";
    return "homepage";
  }, [location.pathname]);

  const sendMessage = async (promptText) => {
    const content = (promptText ?? input).trim();

    if (!content || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/chat/assistant", {
        messages: nextMessages,
        pageContext: {
          route: location.pathname,
          pageLabel,
        },
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (requestError) {
      setError(requestError.response?.data || "Unable to get suggestions right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-assistant ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <p className="chat-eyebrow">Shopping assistant</p>
              <h3>ShopMate</h3>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
          </div>

          <div className="chat-starters">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-bubble ${message.role}`}
              >
                {message.content}
              </div>
            ))}
            {loading ? <div className="chat-bubble assistant">Thinking...</div> : null}
          </div>

          {error ? <div className="chat-error">{error}</div> : null}

          <div className="chat-input-row">
            <textarea
              value={input}
              rows={2}
              placeholder="Ask for ideas, comparisons, or product help..."
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="button" onClick={() => sendMessage()}>
              Send
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setIsOpen((current) => !current)}
      >
        Ask ShopMate
      </button>
    </div>
  );
}

export default ChatAssistant;
