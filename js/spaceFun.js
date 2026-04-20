// Import libraries
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

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

const controls = new OrbitControls(camera, renderer.domElement);

// Set Object Mesh
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const Earth = new THREE.Group();

const earthDay = await loader.loadAsync('../img/spaceFun/earthday.jpg');
const dayMat = new THREE.MeshStandardMaterial({
    map: earthDay
})
const dayMesh = new THREE.Mesh(geometry, dayMat);

const earthNight = await loader.loadAsync('../img/spaceFun/earthnight.jpg');
const nightMat = new THREE.MeshBasicMaterial({
    map: earthNight,
    blending: THREE.AdditiveBlending,
    opacity: 0.4,
    transparent: true,
})
const nightMesh = new THREE.Mesh(geometry, nightMat);

const earthCloud = await loader.loadAsync('../img/spaceFun/earthcloud.jpg');
const cloudMat = new THREE.MeshStandardMaterial({
    map: earthCloud,
    opacity: 0.3,
    transparent: true,
})
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.005);

const atmosphere = new THREE.MeshBasicMaterial({
    color: 0x00096FF,
    opacity: 0.01,
    transparent: true,
})
const atmosphereMesh = new THREE.Mesh(geometry, atmosphere);
atmosphereMesh.scale.setScalar(1.01);

Earth.add(dayMesh, nightMesh, cloudMesh, atmosphereMesh);
Earth.rotation.z =  -23.5 * 3.14 / 180;

// Create spotlight
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1.5);


// Set Scene
const Scene = new THREE.Scene();
Scene.add(Earth);
Scene.add(sunLight);

// Render all
renderer.render(Scene, camera);

// Animate
function animate(t=0) {
    requestAnimationFrame(animate);
    Earth.rotation.y = t / 30000;
    cloudMesh.rotation.y = t / 31000;
    renderer.render(Scene, camera);
}
animate();