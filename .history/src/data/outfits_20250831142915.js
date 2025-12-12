// // src/data/outfits.js
// export const outfits = [
//   // Women's Outfits (12+)
//   {
//     id: 'w_outfit1', name: 'Elegant Evening Gown', gender: 'women',
//     description: 'A stunning gown perfect for formal events, featuring intricate lace details and a flowing silhouette.',
//     image: 'https://placehold.co/400x300/ff6b6b/ffffff?text=Womens+Gown+1', price: 15000, modelPath: './model/black_dress.glb'
//   },
//   {
//     id: 'w_outfit2', name: 'Summer Floral Dress', gender: 'women',
//     description: 'Light and airy floral dress, perfect for a sunny day out or a garden party.',
//     image: 'https://placehold.co/400x300/4CAF50/ffffff?text=Womens+Dress+2', price: 9800, modelPath: './model/black_dress.glb'
//   },
//   // ... (all the other outfits from the original code)
// ];

// Add at the top:
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Replace your load3DModel function:
const load3DModel = (modelPath) => {
  setIsLoading(true);

  // Remove previous model if exists
  if (currentModelRef.current) {
    sceneRef.current.remove(currentModelRef.current);
    // Dispose geometry/material if needed
  }

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      sceneRef.current.add(model);
      currentModelRef.current = model;
      setIsLoading(false);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
      setIsLoading(false);
    }
  );
};