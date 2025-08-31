import React from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./cart.css";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const cartItems = Object.values(cart);

  // If the cart is empty, show a message
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <ShoppingCart className="cart-empty-icon" />
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-desc">Add some products to get started!</p>
      </div>
    );
  }

  // Calculate the total price of all items in the cart
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">
                NRS {item.price.toLocaleString()}
              </div>
            </div>
            <div className="cart-item-controls">
              <button
                className="cart-qty-btn"
                onClick={() => updateCartItem(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="cart-item-qty">{item.quantity}</span>
              <button
                className="cart-qty-btn"
                onClick={() => updateCartItem(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </button>
              <span className="cart-item-price">
                NRS {(item.price * item.quantity).toLocaleString()}
              </span>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-subtotal-row">
        <span className="cart-subtotal-label">Subtotal</span>
        <span className="cart-subtotal-value">
          NRS {subtotal.toLocaleString()}
        </span>
      </div>
      <button className="cart-checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
