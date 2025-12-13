import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./ModelViewer.css";

const ModelViewer = ({ modelPath }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const baseScaleRef = useRef(new THREE.Vector3(1, 1, 1));
  const targetScaleRef = useRef(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
    hemi.position.set(0, 20, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 7.5);
    scene.add(dir);

    // removed grid helper to avoid ground lines

    // We'll animate scale towards a targetScale for a smooth effect

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // auto-rotate model if loaded
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.006;
        // smooth scale interpolation towards target
        const desired = baseScaleRef.current.clone().multiplyScalar(targetScaleRef.current);
        modelRef.current.scale.lerp(desired, 0.08);
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // click toggles the model zoom (no selection/highlight)
    const onCanvasClick = (event) => {
      if (!modelRef.current) return;
      targetScaleRef.current = targetScaleRef.current === 1 ? 1.15 : 1;
    };

    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("click", onCanvasClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (modelRef.current) {
      scene.remove(modelRef.current);
      modelRef.current.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) {
          if (Array.isArray(c.material)) c.material.forEach((m) => m.dispose());
          else c.material.dispose();
        }
      });
      modelRef.current = null;
    }

    if (!modelPath) return;

    setLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene || gltf.scenes[0];
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        // increase multiplier to make model appear larger in the view
        const scale = 2.0 / (maxDim || 1);
        model.scale.set(scale, scale, scale);
        box.setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        scene.add(model);
        modelRef.current = model;
        // set base scale for click-zoom interpolation
        try {
          if (model.scale) baseScaleRef.current = model.scale.clone();
        } catch (e) {
          baseScaleRef.current = new THREE.Vector3(1,1,1);
        }
        targetScaleRef.current = 1;
        setLoading(false);
        setError(null);
      },
      undefined,
      (err) => {
        console.error("Model load error:", err);
        setLoading(false);
        setError(err?.message || "Failed to load model");
      }
    );
  }, [modelPath]);

  return (
    <div className="model-viewer-root">
      <div ref={containerRef} className="model-canvas" />
      {!modelPath && <div className="model-no">No 3D model available</div>}
      {loading && <div className="model-loader">Loading model...</div>}
      {error && (
        <div className="model-error">Failed to load model. {error}</div>
      )}
    </div>
  );
};

export default ModelViewer;
