// src/components/Modal/Modal.jsx
import React from "react";
import ".Modal.css";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
