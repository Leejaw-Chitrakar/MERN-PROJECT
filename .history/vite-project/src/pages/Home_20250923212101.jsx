// src/pages/Home.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
// import Header from '../components/Header/Header';
import OutfitCard from "../components/OutfitCard/OutfitCard";
import OutfitViewer from "../components/OutfitViewer/OutfitViewer";
import Modal from "../components/Model/Model";
import Footer from "../components/Footer/Footer";
import { outfits } from "../data/outfits";
import "./Home.css";

const Home = () => {
  const [activeGender, setActiveGender] = useState("women");
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');

  const handlePriceChange = (event) =>{
    setPriceFilter(event.target.value);
  }
  const { addToCart } = useCart();
  const filteredOutfits = outfits.filter(
    (outfit) => outfit.gender === activeGender
  );
  const filterPrice = outfits.filter(
    (outfit) => outfit.price <= priceFilter
  )
  const handleView3D = (outfit) => {
    setSelectedOutfit(outfit);
    setIsViewerOpen(true);
  };

  const handleAddToCart = (outfitId) => {
    const product = outfits.find((o) => o.id === outfitId);
    if (product) addToCart(product);
  };

  const handleBuyNow = (outfitName, price) => {
    showMessage(
      `Proceeding to checkout for "${outfitName}" (NRS ${price.toLocaleString()}).`
    );
  };

  const showMessage = (message) => {
    // Create and show a custom message box
    const messageBox = document.createElement("div");
    messageBox.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #333;
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      z-index: 2000;
      font-size: 1.1rem;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
      messageBox.style.opacity = 1;
    }, 10);

    setTimeout(() => {
      messageBox.style.opacity = 0;
      messageBox.addEventListener("transitionend", () => messageBox.remove());
    }, 2500);
  };

  return (
    <div className="home">
      {/* <Header 
        onSignIn={() => setIsSignInOpen(true)} 
        onSignUp={() => setIsSignUpOpen(true)} 
      />
       */}
      <div className="container">
        <div className="gallery-intro">
          <h2>Discover Our Collection</h2>
          <p>
            Click on any outfit to explore it in our interactive 3D viewer. Zoom
            in and out to examine every detail of these fashion designs.
          </p>
        </div>

        <div className="gender-selection">
          <button
            className={`gender-btn ${activeGender === "women" ? "active" : ""}`}
            onClick={() => setActiveGender("women")}
          >
            Women's Collection
          </button>
          <button
            className={`gender-btn ${activeGender === "men" ? "active" : ""}`}
            onClick={() => setActiveGender("men")}
          >
            Men's Collection
          </button>
          <h5>Filter Price:</h5>
          <input type="Number" name="price" id="price" className="priceCollection" onChange={handlePriceChange} value={priceFilter}/>
        </div>
 
        <div className={activeGender === "women" ? "" : "hidden"}>
        <h2 className="section-header">Women's Collection</h2>
    <h3>Available Products:</h3>
      <ul>
        {filterPrice.map(outfit => (
          <li key={outfit.id && outfit}>
            {/* {product.name} - Rs. {product.price} */}
            <div className="gallery">
            {/* {filterPrice
              .filter((outfit) => outfit.gender === "women")
              .map((outfit) => (
                
              ))} */}
              <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onView3D={() => handleView3D(outfit)}
                  onAddToCart={() => handleAddToCart(outfit.id)}
                  onBuyNow={handleBuyNow}
                />
          </div>
          </li>
        ))}
      </ul>
          <div className="gallery">
            {filteredOutfits
              .filter((outfit) => outfit.gender === "women")
              .map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onView3D={() => handleView3D(outfit)}
                  onAddToCart={() => handleAddToCart(outfit.id)}
                  onBuyNow={handleBuyNow}
                />
              ))}
          </div>
        </div>

        <div className={activeGender === "men" ? "" : "hidden"}>
            <h2 className="section-header">Men's Collection</h2>
           <h3>Available Products:</h3>
      <ul>
        {filterPrice.map(product => (
          <li key={product.id}>
            {/* {product.name} - Rs.{product.price} */}
             <div className="gallery">
            {filteredOutfits
              .filter((outfit) => outfit.gender === "men")
              .map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onView3D={() => handleView3D(outfit)}
                  onAddToCart={() => handleAddToCart(outfit.id)}
                  onBuyNow={handleBuyNow}
                />
              ))}
          </div>
          </li>
        ))}
      </ul>
          <div className="gallery">
            {filteredOutfits
              .filter((outfit) => outfit.gender === "men")
              .map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onView3D={() => handleView3D(outfit)}
                  onAddToCart={() => handleAddToCart(outfit.id)}
                  onBuyNow={handleBuyNow}
                />
              ))}
          </div>
        </div>
      </div>

      <OutfitViewer
        outfit={selectedOutfit}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />

      {/* Sign In Modal */}
      <Modal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        className="signin-modal"
      >
        <h2>Sign In</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            showMessage(
              `Sign in attempt for user: ${username}. (No actual authentication implemented)`
            );
            setIsSignInOpen(false);
            e.target.reset();
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        className="signin-modal"
      >
        <h2>Sign Up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            showMessage(
              `Sign up attempt for user: ${username}. (No actual registration implemented)`
            );
            setIsSignUpOpen(false);
            e.target.reset();
          }}
        >
          <div className="form-group">
            <label htmlFor="signUpUsername">Username</label>
            <input
              type="text"
              id="signUpUsername"
              name="username"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="email"
              id="signUpEmail"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signUpPassword">Password</label>
            <input
              type="password"
              id="signUpPassword"
              name="password"
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </Modal>

      {/* About Modal */}
      <Modal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        className="info-modal"
      >
        <h2>About VibeCouture</h2>
        <p>
          Welcome to VibeCouture, your premier destination for exploring fashion
          in a revolutionary new way! We believe that experiencing clothing
          should be as dynamic and engaging as the designs themselves. Our
          platform leverages cutting-edge 3D technology to bring outfits to
          life, allowing you to interact with them as never before.
        </p>
        <p>
          Our mission is to bridge the gap between digital visualization and
          tangible fashion, offering a unique perspective on design, texture,
          and fit. Whether you're a fashion enthusiast, a designer seeking
          inspiration, or simply curious about the future of online shopping,
          VibeCouture provides an unparalleled immersive experience.
        </p>
        <p>
          We are constantly updating our collection with the latest trends and
          timeless classics, all meticulously rendered in stunning 3D. Join us
          on this exciting journey into the next generation of fashion
          exploration!
        </p>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        className="info-modal"
      >
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! Whether you have questions about our 3D
          models, suggestions for new features, or just want to say hello, feel
          free to reach out.
        </p>
        <p>You can contact us through the following channels:</p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@vibecouture.com">info@vibecouture.com</a>
          </li>
          <li>
            <strong>Phone:</strong> +977 98XXXXXXXX (Nepal)
          </li>
          <li>
            <strong>Address:</strong> Bhaktapur Durbar Square, Bhaktapur, Nepal
          </li>
        </ul>
        <p>
          Our customer service team is available Sunday to Friday, 10 AM to 6 PM
          (NPT).
        </p>
        <p>
          Follow us on social media for the latest updates and new collection
          announcements!
        </p>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
        className="info-modal"
      >
        <h2>Privacy Policy</h2>
        <p>
          At VibeCouture, we are committed to protecting your privacy. This
          policy outlines how we collect, use, and safeguard your personal
          information when you visit our website or use our services.
        </p>
        <h3>Information We Collect</h3>
        <ul>
          <li>
            <strong>Personal Data:</strong> When you sign up, make a purchase,
            or contact us, we may collect personal identifiers such as your
            name, email address, shipping address, and payment information.
          </li>
          <li>
            <strong>Usage Data:</strong> We automatically collect information on
            how the service is accessed and used. This Usage Data may include
            your computer's Internet Protocol address (e.g., IP address),
            browser type, browser version, the pages of our Service that you
            visit, the time and date of your visit, the time spent on those
            pages, unique device identifiers and other diagnostic data.
          </li>
          <li>
            <strong>3D Interaction Data:</strong> We may collect anonymous data
            related to your interactions with our 3D viewer, such as zoom levels
            and viewing angles, to improve our service. This data is not linked
            to your personal identity.
          </li>
        </ul>
        <h3>How We Use Your Information</h3>
        <p>We use the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>
            To allow you to participate in interactive features of our Service
            when you choose to do so
          </li>
          <li>To provide customer support</li>
          <li>
            To provide analysis or valuable information so that we can improve
            the Service
          </li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
        <h3>Data Security</h3>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your Personal Data, we cannot guarantee its absolute
          security.
        </p>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
        <p>
          <strong>Last updated:</strong> July 16, 2025
        </p>
      </Modal>

      <Footer
        onAbout={() => setIsAboutOpen(true)}
        onContact={() => setIsContactOpen(true)}
        onPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
      />
    </div>
  );
};

export default Home;
