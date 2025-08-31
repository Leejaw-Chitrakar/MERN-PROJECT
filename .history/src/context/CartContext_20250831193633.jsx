import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({}); // { [productId]: { ...product, quantity } }
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const prev = { ...prevCart };
      if (prev[product.id]) {
        prev[product.id] = {
          ...prev[product.id],
          quantity: prev[product.id].quantity + 1,
        };
      } else {
        prev[product.id] = { ...product, quantity: 1 };
      }
      return prev;
    });
    setMessage(`${product.name} added to cart!`);
    setShowMessage(true);
  };

  useEffect(() => {
    // Calculate cart count and total price
    let count = 0;
    let total = 0;
    Object.values(cart).forEach((item) => {
      count += item.quantity;
      total += item.price * item.quantity;
    });
    setCartCount(count);
    setCartTotal(total);
  }, [cart]);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount, cartTotal }}>
      {children}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#333",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "1rem",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}
    </CartContext.Provider>
  );
};