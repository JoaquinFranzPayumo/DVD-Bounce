// DVD Bounce in Three.js with Texture
// Author: Joaquin Franz A. Payumo

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-400, 400, 400, -400, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Load DVD logo texture
const textureLoader = new THREE.TextureLoader();
const dvdTexture = textureLoader.load("assets/dvd.png");

// PlaneGeometry for the DVD logo
const geometry = new THREE.PlaneGeometry(120, 60);
const material = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  transparent: true,
});
const dvdLogo = new THREE.Mesh(geometry, material);
dvdLogo.position.set(0, 0, 0);
scene.add(dvdLogo);

// Movement
let velocityX = 3;
let velocityY = 2;
let bounceCount = 0;
const maxBounces = Math.floor(Math.random() * 4) + 5; // 5–8

function changeColor() {
  dvdLogo.material.color.setRGB(Math.random(), Math.random(), Math.random());
}

function animate() {
  requestAnimationFrame(animate);

  // Move logo
  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  const halfWidth = (dvdLogo.geometry.parameters.width * dvdLogo.scale.x) / 2;
  const halfHeight = (dvdLogo.geometry.parameters.height * dvdLogo.scale.y) / 2;

  // Bounds check
  if (dvdLogo.position.x + halfWidth >= 400 || dvdLogo.position.x - halfWidth <= -400) {
    velocityX *= -1;
    bounce();
  }
  if (dvdLogo.position.y + halfHeight >= 400 || dvdLogo.position.y - halfHeight <= -400) {
    velocityY *= -1;
    bounce();
  }

  renderer.render(scene, camera);
}

function bounce() {
  bounceCount++;
  changeColor();
  dvdLogo.scale.multiplyScalar(0.85);

  if (bounceCount >= maxBounces) {
    scene.remove(dvdLogo);
  }
}

animate();
