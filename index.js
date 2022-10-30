import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
var root
gltfLoader.load("assets/iClickerRemoteJoin.glb", function (glb) {
  console.log(glb);
  root = glb.scene;
  scene.add(root);
});

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x0f0f0f });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(20, 20, 10);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-10, -10, -20);
scene.add(directionalLight2);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const fov = 75;
const aspect = sizes.width / sizes.height;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(5, 6, 7);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // this makes background blank
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // root.rotation.x += 0.01
  // root.rotation.y += 0.01
}

animate();
