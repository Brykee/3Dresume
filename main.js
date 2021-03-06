import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "./OrbitControls.js";

import { TextureLoader } from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 2, 16, 100);

//wrapping papper for geometry. Basic requires no light scource to bounce off of it.
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene
//   .add
//   // lightHelper
//   // gridHelper
//   ();
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

import space from "/textures/space.jpg";
const spaceTexture = new THREE.TextureLoader().load(space);
scene.background = spaceTexture;

//Avatar
import brykee from "/textures/DevenRichardson.jpg";
const bryceTexture = new TextureLoader().load(brykee);

const bryce = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: bryceTexture })
);

scene.add(bryce);

//Moon
import moonPic from "/textures/moon.jpg";
const moonTexture = new THREE.TextureLoader().load(moonPic);
import normalPic from "/textures/normal.jpg";
const normalTexture = new THREE.TextureLoader().load(normalPic);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(10);

//Cheese Planet
import cheesePic from "/textures/cheese-hole-background.jpg";
const cheesePlanet = new THREE.TextureLoader().load(cheesePic);

const cheese = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: cheesePlanet,
    normalMap: normalTexture,
  })
);
scene.add(cheese);

cheese.position.z = 50;
cheese.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cheese.rotation.x += 0.05;
  cheese.rotation.y += 0.075;
  cheese.rotation.z += 0.05;

  bryce.rotation.y += 0.01;
  bryce.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
