// src/components/OutfitViewer/OutfitViewer.jsx
import React from "react";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./OutfitViewer.css";

const OutfitViewer = ({ outfit, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="viewer-container">
        <div className="outfit-viewer">
          <ModelViewer modelPath={outfit?.modelPath} />
        </div>
        <div className="viewer-info">
          <h3 className="viewer-title">{outfit?.name}</h3>
          <p className="viewer-description">{outfit?.description}</p>
          <div className="viewer-price">NRS {outfit?.price?.toLocaleString()}</div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default OutfitViewer;