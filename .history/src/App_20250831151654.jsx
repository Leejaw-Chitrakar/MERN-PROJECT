// src/App.jsx
import React from 'react';
// import Home from './pages/Home';
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './App.css';

function App() {
  
  return (
    <div className="App">
      {/* <Home /> */}
    <RouterProvider router={router} />

    </div>
  );
}

export default App;