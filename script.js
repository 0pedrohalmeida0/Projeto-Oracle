import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const canvas = document.querySelector("#sphereCanvas");
const resetButton = document.querySelector("#resetButton");

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x08110f, 7, 17);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.45, 96, 96),
  new THREE.MeshPhysicalMaterial({
    color: 0x45d19e,
    roughness: 0.28,
    metalness: 0.08,
    clearcoat: 0.7,
    clearcoatRoughness: 0.22,
  }),
);
scene.add(sphere);

const wire = new THREE.Mesh(
  new THREE.SphereGeometry(1.462, 48, 48),
  new THREE.MeshBasicMaterial({
    color: 0xf6d36f,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  }),
);
sphere.add(wire);

const glow = new THREE.Mesh(
  new THREE.SphereGeometry(1.64, 64, 64),
  new THREE.MeshBasicMaterial({
    color: 0x8affd2,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
  }),
);
scene.add(glow);

const starGeometry = new THREE.BufferGeometry();
const starPositions = [];
for (let i = 0; i < 520; i += 1) {
  starPositions.push(
    (Math.random() - 0.5) * 18,
    (Math.random() - 0.5) * 12,
    -Math.random() * 12 - 2,
  );
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starPositions, 3),
);
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({
    color: 0xf4f7f2,
    size: 0.018,
    transparent: true,
    opacity: 0.65,
  }),
);
scene.add(stars);

scene.add(new THREE.HemisphereLight(0xcdfced, 0x101316, 1.1));

const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(4, 3, 5);
scene.add(keyLight);

const accentLight = new THREE.PointLight(0xf6d36f, 7, 10);
accentLight.position.set(-3.4, -1.8, 2.2);
scene.add(accentLight);

const state = {
  pointerDown: false,
  pointerMoved: false,
  lastX: 0,
  lastY: 0,
  velocityX: 0.003,
  velocityY: 0.007,
};

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function resetSphere() {
  sphere.rotation.set(0, 0, 0);
  glow.rotation.set(0, 0, 0);
  state.velocityX = 0.003;
  state.velocityY = 0.007;
}

function addClickImpulse() {
  state.velocityX += 0.08;
  state.velocityY += 0.045;
  sphere.scale.setScalar(1.08);
}

canvas.addEventListener("pointerdown", (event) => {
  state.pointerDown = true;
  state.pointerMoved = false;
  state.lastX = event.clientX;
  state.lastY = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.pointerDown) return;

  const movementX = event.clientX - state.lastX;
  const movementY = event.clientY - state.lastY;

  if (Math.abs(movementX) + Math.abs(movementY) > 3) {
    state.pointerMoved = true;
  }

  sphere.rotation.y += movementX * 0.008;
  sphere.rotation.x += movementY * 0.008;
  state.velocityY = movementX * 0.0009;
  state.velocityX = movementY * 0.0009;

  state.lastX = event.clientX;
  state.lastY = event.clientY;
});

canvas.addEventListener("pointerup", (event) => {
  if (!state.pointerMoved) {
    addClickImpulse();
  }

  state.pointerDown = false;
  canvas.releasePointerCapture(event.pointerId);
});

resetButton.addEventListener("click", resetSphere);
window.addEventListener("resize", resize);

function animate() {
  sphere.rotation.x += state.velocityX;
  sphere.rotation.y += state.velocityY;
  glow.rotation.copy(sphere.rotation);
  stars.rotation.y += 0.0006;

  state.velocityX *= 0.985;
  state.velocityY *= 0.985;
  sphere.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

resize();
animate();
