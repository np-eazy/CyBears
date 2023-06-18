import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadModelFromGLB(scene, fileName) {
  const loader = new GLTFLoader();

  loader.load(
    fileName,
    function (gltf) {
      // Access the mesh from the loaded GLTF object
      const mesh = gltf.scene.children[0];

      // Optionally, perform any necessary transformations or adjustments to the mesh

      // Add the mesh to the scene
      scene.add(mesh);
    },
    undefined,
    function (error) {
      console.error('Error loading model:', error);
    }
  );
}