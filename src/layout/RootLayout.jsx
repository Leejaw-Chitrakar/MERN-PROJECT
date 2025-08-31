import React from "react";
import { useCart } from "../context/CartContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./../components/Header/Header.css"; // Import header styles

const RootLayout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const { cartCount, cartTotal } = useCart();
  return (
    <div>
      <header>
        <div className="logo">
          <i className="fas fa-tshirt"></i>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>VibeCouture</span>
          </Link>
        </div>
        <p className="tagline">Explore outfits in immersive 3D</p>
        <div className="header-actions">
          <button
            className="cart-btn"
            style={{
              marginRight: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            <span style={{ marginRight: 8 }}>Cart</span>
            <span
              style={{
                background: "#ff6b6b",
                color: "#fff",
                borderRadius: "50%",
                padding: "0.2em 0.6em",
                fontWeight: 700,
                fontSize: "1rem",
                marginRight: 8,
              }}
            >
              {cartCount}
            </span>
            <span style={{ fontWeight: 600 }}>
              NRS {cartTotal.toLocaleString()}
            </span>
          </button>
          {token ? (
            <>
              <Link to="/" style={{ color: "grey", textDecoration: "none" }}>
                Home
              </Link>
              <Link
                to="/profile"
                style={{ color: "grey", textDecoration: "none" }}
              >
                Profile
              </Link>
              {/* <Link to="/complain" style={{ color: "grey" , textDecoration:"none"}} ></Link> */}
              <Button
                type="primary"
                onClick={handleLogout}
                style={{ color: "white" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <button className="cart-btn" onClick={handleCart}>
                <i className="fas fa-cart-shopping mr-2"></i> Cart
              </button>
              <button className="sign-in-btn" onClick={handleSignIn}>
                <i className="fas fa-user-circle mr-2"></i> Sign In
              </button>
              <button className="sign-up-btn" onClick={handleSignUp}>
                <i className="fas fa-user-plus mr-2"></i> Sign Up
              </button>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
