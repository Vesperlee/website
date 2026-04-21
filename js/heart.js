// Import libraries
import * as THREE from "three";

// Set size of the renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

// Set Object Mesh
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);

// Create spotlight


// Set Scene
const Scene = new THREE.Scene();

// Render all
renderer.render(Scene, camera);

// Animate