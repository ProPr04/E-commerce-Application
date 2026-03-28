import React, { createContext, useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import { AUTH_CHANGE_EVENT, getToken } from "../utils/auth";

export const CartContext = createContext();

const LOCAL_CART_KEY = "cart";

const readLocalCart = () => {
  const savedCart = localStorage.getItem(LOCAL_CART_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

function CartProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  const fetchCart = useCallback(async (activeToken = token) => {
    setCartLoading(true);

    if (activeToken) {
      try {
        const res = await API.get("/cart");
        const formatted = res.data.map((item) => ({
          id: item.product_id,
          quantity: item.quantity,
        }));

        setCart(formatted);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setCartLoading(false);
      }

      return;
    }

    setCart(readLocalCart());
    setCartLoading(false);
  }, [token]);

  const syncLocalCartToBackend = useCallback(async () => {
    const localCart = readLocalCart();

    if (!localCart.length) {
      return;
    }

    for (const item of localCart) {
      for (let count = 0; count < item.quantity; count += 1) {
        await API.post("/cart/add", { productId: item.id });
      }
    }

    localStorage.removeItem(LOCAL_CART_KEY);
  }, []);

  useEffect(() => {
    const handleAuthChange = async () => {
      const latestToken = getToken();
      setToken(latestToken);

      if (latestToken) {
        try {
          await syncLocalCartToBackend();
        } catch (err) {
          console.error(err.response?.data || err.message);
        }
      }

      fetchCart(latestToken);
    };

    handleAuthChange();
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, [fetchCart, syncLocalCartToBackend]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    }
  }, [cart, token]);

  const addToCart = async (product) => {
    if (token) {
      try {
        await API.post("/cart/add", { productId: product.id });
        await fetchCart();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }

      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { id: product.id, quantity: 1 }]);
    }
  };

  const increaseQuantity = async (id) => {
    if (token) {
      try {
        await API.post("/cart/add", { productId: id });
        await fetchCart();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }

      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = async (id) => {
    if (token) {
      try {
        await API.patch(`/cart/decrease/${id}`);
        await fetchCart();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }

      return;
    }

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = async (id) => {
    if (token) {
      try {
        await API.delete(`/cart/remove/${id}`);
        await fetchCart();
      } catch (err) {
        console.error(err.response?.data || err.message);
      }

      return;
    }

    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
