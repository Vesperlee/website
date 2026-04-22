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
const far = 25;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

// Set Object Mesh
const box = new THREE.BoxGeometry(3,3,3);

// Material gang
const loader = new THREE.TextureLoader();

const seal = await loader.loadAsync('../img/0/seal.png');
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: seal,
});

const box1 = new THREE.Mesh(box, mat);
const box2 = new THREE.Mesh(box, mat);
const box3 = new THREE.Mesh(box, mat);
const box4 = new THREE.Mesh(box, mat);

const boxGroup = new THREE.Group();
boxGroup.add( box1, box2, box3, box4 );
box1.position.set(8,0,0);
box2.position.set(-8,0,0);
box3.position.set(0,8,0);
box4.position.set(0,-8,0);

// Create light(s)
const light = new THREE.PointLight(0x780606, 35, 100);
light.position.set(0,0,0);

// Set Scene
const Scene = new THREE.Scene();
Scene.add(boxGroup);
Scene.add(light);

// Render all
renderer.render(Scene, camera);

// Animate (idle rotation)
function animate(t=0) {
    requestAnimationFrame(animate);
    boxGroup.rotation.z = t/5000;
    box1.rotation.x = t/2500;
    box2.rotation.x = -t/2500;
    box3.rotation.y = t/2500;
    box4.rotation.y = -t/2500;
    renderer.render(Scene, camera);
}
animate();