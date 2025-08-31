// src/components/Header/Header.jsx
import React from "react";
import "./Header.css";

const Header = ({ onSignIn, onSignUp }) => {
  return (
    <header>
      <div className="logo">
        <i className="fas fa-tshirt"></i>
        Vibe<span>Couture</span>
      </div>
      <p className="tagline">Explore outfits in immersive 3D</p>
      <div className="header-actions">
        <button className="cart-btn" onClick={handleCart}>
          <i className="fas fa-cart-shopping mr-2"></i> Cart
        </button>
        <button className="sign-in-btn" onClick={onSignIn}>
          <i className="fas fa-user-circle mr-2"></i> Sign In
        </button>
        <button className="sign-up-btn" onClick={onSignUp}>
          <i className="fas fa-user-plus mr-2"></i> Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
