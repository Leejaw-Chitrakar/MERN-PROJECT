import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./../components/Header/Header.css"; // Import header styles

const RootLayout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

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

  return (
    <div>
      <header>
        <div className="logo">
            <Link to="/">
          <i className="fas fa-tshirt"></i>
          Vibe<span>Couture</span>
          </Link>
        </div>
        <p className="tagline">Explore outfits in immersive 3D</p>
        <div className="header-actions">
          {token ? (
            <>
              <Link to="/" style={{ color: "white" }}>Home</Link>
              <Link to="/profile" style={{ color: "white" }}>Profile</Link>
              <Link to="/complain" style={{ color: "white" }}>Complain</Link>
              <Button type="primary" onClick={handleLogout} style={{ color: "white" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
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