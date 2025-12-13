// src/App.jsx
import React from "react";
import { CartProvider } from "./context/CartContext";
// import Home from './pages/Home';
import { RouterProvider } from "react-router-dom";
// import Alert from './components/Alert'
import router from "./routes";
import "./App.css";

function App() {
  return (
    <CartProvider>
      {/* <Alert alert={alert} /> */}
      <div className="App">
        {/* <Home /> */}
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;
