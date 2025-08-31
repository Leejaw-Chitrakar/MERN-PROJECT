// src/components/OutfitViewer/OutfitViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./OutfitViewer.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const OutfitViewer = ({ outfit, isOpen, onClose }) => {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelRef = useRef(null);

  useEffect(() => {
    if (isOpen && viewerRef.current) {
      init3DViewer();
    }

    return () => {
      // Clean up Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && outfit) {
      load3DModel(outfit.modelPath);
    }
  }, [isOpen, outfit]);

  const init3DViewer = () => {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      viewerRef.current.clientWidth / viewerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      viewerRef.current.clientWidth,
      viewerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    viewerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 5, 5).normalize();
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = viewerRef.current.clientWidth;
      const height = viewerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  // const load3DModel = (modelPath) => {
  //   setIsLoading(true);

  //   // Remove previous model if exists
  //   if (currentModelRef.current) {
  //     sceneRef.current.remove(currentModelRef.current);
  //     currentModelRef.current.geometry.dispose();
  //     currentModelRef.current.material.dispose();
  //     currentModelRef.current = null;
  //   }

  //   // Simulate model loading
  //   setTimeout(() => {
  //     const geometry = new THREE.BoxGeometry(1, 1.5, 0.5);
  //     const material = new THREE.MeshPhongMaterial({ color: 0x88aaff });
  //     const model = new THREE.Mesh(geometry, material);
  //     sceneRef.current.add(model);
  //     currentModelRef.current = model;

  //     // Reset camera view
  //     if (controlsRef.current) {
  //       cameraRef.current.position.set(0, 0, 5);
  //       cameraRef.current.lookAt(0, 0, 0);
  //     }

  //     setIsLoading(false);
  //   }, 1000);
  // };
// Replace your load3DModel function:
const load3DModel = (modelPath) => {
  setIsLoading(true);

  // Remove previous model if exists
  if (currentModelRef.current) {
    sceneRef.current.remove(currentModelRef.current);
    // Optionally dispose geometry/material if you know the type
    currentModelRef.current = null;
  }

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      sceneRef.current.add(model);
      currentModelRef.current = model;

      // Reset camera view
      if (controlsRef.current) {
        cameraRef.current.position.set(0, 0, 5);
        cameraRef.current.lookAt(0, 0, 0);
      }

      setIsLoading(false);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
      setIsLoading(false);
    }
  );
};
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="viewer-container">
        <div ref={viewerRef} className="outfit-viewer">
          {isLoading && (
            <div className="loader">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading 3D Model...</span>
            </div>
          )}
        </div>
        <div className="viewer-info">
          <h3 className="viewer-title">{outfit?.name}</h3>
          <p className="viewer-description">Scroll or use buttons to zoom</p>
        </div>
        <div className="viewer-controls">
          <button className="control-btn" onClick={handleZoomIn}>
            <i className="fas fa-search-plus"></i>
          </button>
          <button className="control-btn" onClick={handleZoomOut}>
            <i className="fas fa-search-minus"></i>
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default OutfitViewer;
