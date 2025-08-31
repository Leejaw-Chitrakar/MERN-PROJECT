// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = ({ onAbout, onContact, onPrivacyPolicy }) => {
  return (
    <footer>
      <div className="footer-content">
        <p>© 2023 VibeCouture | Immersive 3D Outfit Explorer</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onAbout(); }}>About</a>
          <a href="#">Collections</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onContact(); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onPrivacyPolicy(); }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;