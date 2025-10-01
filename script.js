// DVD Bounce in Three.js with Texture
// Author: Your Name

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-400, 400, 400, -400, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Load DVD texture
const textureLoader = new THREE.TextureLoader();
const dvdTexture = textureLoader.load("assets/dvd.png");

// DVD logo as PlaneGeometry
const geometry = new THREE.PlaneGeometry(120, 60); // keep ratio for logo
const material = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  transparent: true,
});
const dvdLogo = new THREE.Mesh(geometry, material);
dvdLogo.position.set(0, 0, 0); // start at origin
scene.add(dvdLogo);

// Movement variables
let velocityX = 3;
let velocityY = 2;
let bounceCount = 0;
const maxBounces = Math.floor(Math.random() * 4) + 5; // between 5 and 8

// Helper: Change color randomly (tint the logo)
function changeColor() {
  dvdLogo.material.color.setRGB(Math.random(), Math.random(), Math.random());
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move
  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  const halfWidth = (dvdLogo.geometry.parameters.width * dvdLogo.scale.x) / 2;
  const halfHeight = (dvdLogo.geometry.parameters.height * dvdLogo.scale.y) / 2;

  // Bounds checking
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

// Bounce logic
function bounce() {
  bounceCount++;
  changeColor();
  dvdLogo.scale.multiplyScalar(0.85); // shrink each bounce

  if (bounceCount >= maxBounces) {
    scene.remove(dvdLogo); // disappear after 5-8 bounces
  }
}

animate();
