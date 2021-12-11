import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.set(0, 3, 65);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//Control
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const clock = new THREE.Clock();

//animation
function animate() {
  const elapsedTime = clock.getElapsedTime();

  control.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
