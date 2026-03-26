import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  // Load cart from localStorage initially
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 }: item
    );
    setCart(updatedCart);
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};
const increaseQuantity = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  setCart(updatedCart);
};

const decreaseQuantity = (id) => {
  const updatedCart = cart
    .map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCart(updatedCart);
};

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;