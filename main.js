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
camera.position.set(20, 40, 25);

//material
const material = new THREE.MeshStandardMaterial({
  color: 0xfffffff,
  roughness:"0.6"
});

//plane
const planeGeometry = new THREE.PlaneGeometry(70, 70);
//box
const boxGeometry = new THREE.BoxGeometry(7, 7, 7);

//Mesh-plane
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.receiveShadow = true;
scene.add(plane);

//Mesh-box-No1
const box = new THREE.Mesh(boxGeometry, material);
box.position.y = 3.5;
box.castShadow = true;
scene.add(box);

//Mesh-box-No1
const box2 = new THREE.Mesh(boxGeometry,material);
box2.position.x = 17.0;
box2.position.y = 3.5;
box2.position.z = -3.5;
box2.castShadow = true;
scene.add(box2);

//axesHelper
const axesHelper = new THREE.AxesHelper(25);
// scene.add(axesHelper);

//pointLight-No1
const pointLight = new THREE.PointLight(0xffffff, 1,130);
pointLight.position.set(5, 15, -5);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near=6;
pointLight.shadow.camera.far=60;
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightCameraHelper);

//pointLight-No2
const pointLight2= new THREE.PointLight(0xfffff,1,30);
pointLight2.position.set(30,10,-10);
pointLight2.castShadow=true;
scene.add(pointLight2);
const pointLightHelper2 = new THREE.CameraHelper(pointLight2.shadow.camera);
// scene.add(pointLightHelper2);


console.log(pointLight.shadow);



const pointLightHelper = new THREE.PointLightHelper(pointLight,10);
// scene.add(pointLightHelper);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

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
