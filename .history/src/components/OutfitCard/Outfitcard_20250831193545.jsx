// src/components/OutfitCard/OutfitCard.jsx
import React from "react";
import "./OutfitCard.css";

const OutfitCard = ({ outfit, onView3D, onAddToCart, onBuyNow }) => {
  return (
    <div className="outfit-card">
      <img
        src={outfit.image}
        alt={outfit.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x300/cccccc/333333?text=Image+Error";
        }}
      />
      <div className="outfit-details">
        <h3>{outfit.name}</h3>
        <p>{outfit.description}</p>
        <div className="outfit-price">NRS {outfit.price.toLocaleString()}</div>
        <div className="outfit-actions">
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(outfit.name);
            }}
          >
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button
            className="buy-now-btn"
            onClick={(e) => {
              e.stopPropagation();
              // onBuyNow(outfit.name, outfit.price);
              
            }}
          >
            <i className="fas fa-shopping-bag"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
