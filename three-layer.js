import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js';

let threeLayerStarted = false;

function startThreeLayer() {
  if (threeLayerStarted) return;
  const canvas = document.getElementById('three-layer');
  const hero = document.querySelector('.hero');

  if (canvas && hero) {
    threeLayerStarted = true;
  const videoMode = hero.classList.contains('video-mode');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0, 8.2);

  const ambient = new THREE.HemisphereLight(0xc6d2ff, 0x1a1835, 1.3);
  scene.add(ambient);
  const goldLight = new THREE.PointLight(0xf5c782, 7, 12, 2);
  goldLight.position.set(1.5, 0.8, 2.5);
  scene.add(goldLight);
  const blueLight = new THREE.PointLight(0x8e9dff, 3.2, 10, 2);
  blueLight.position.set(-2, 1.8, 1);
  scene.add(blueLight);

  const root = new THREE.Group();
  scene.add(root);

  // Fixed, deterministic star field: sparse enough to read as atmosphere, not confetti.
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  for (let i = 0; i < 155; i += 1) {
    const angle = i * 2.399963;
    const radius = 2.1 + (i % 19) * 0.16;
    starPositions.push(Math.cos(angle) * radius, Math.sin(angle * 1.17) * radius * 0.62, -0.8 - (i % 7) * 0.22);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xeed7ad, size: 0.024, transparent: true, opacity: 0.58, sizeAttenuation: true });
  const stars = new THREE.Points(starGeometry, starMaterial);
  root.add(stars);

  function glowTexture(color = '#f4c77e') {
    const size = 128;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = size;
    glowCanvas.height = size;
    const ctx = glowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, `${color}d9`);
    gradient.addColorStop(0.18, `${color}75`);
    gradient.addColorStop(0.52, `${color}22`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(glowCanvas);
  }

  const glowGold = glowTexture('#f1c47c');
  const glowBlue = glowTexture('#9cace8');

  function createCelestialBody({ position, size, color, glow, speed, phase, orbitRadius }) {
    const pivot = new THREE.Group();
    pivot.position.set(position[0], position[1], position[2]);
    root.add(pivot);

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 24),
      new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0.03, transparent: true, opacity: 0.78 }),
    );
    planet.position.set(orbitRadius, 0, 0);
    pivot.add(planet);

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(size * 4.6, size * 4.6, 1);
    halo.position.copy(planet.position);
    pivot.add(halo);

    return { pivot, planet, halo, speed, phase };
  }

  const celestialBodies = videoMode ? [] : [
    // Keep the 3D accents in the negative space around the portrait — never over the face or body.
    createCelestialBody({ position: [3.0, 1.72, -0.35], size: 0.16, color: 0xb87556, glow: glowGold, speed: 0.18, phase: 0.1, orbitRadius: 0.22 }),
    createCelestialBody({ position: [3.35, 0.42, -0.25], size: 0.10, color: 0x668aaa, glow: glowBlue, speed: -0.24, phase: 1.9, orbitRadius: 0.16 }),
    createCelestialBody({ position: [0.72, 2.28, -0.65], size: 0.075, color: 0x9d83b8, glow: glowBlue, speed: 0.13, phase: 3.1, orbitRadius: 0.13 }),
    createCelestialBody({ position: [1.42, 0.35, -0.9], size: 0.045, color: 0xcba978, glow: glowGold, speed: -0.34, phase: 0.8, orbitRadius: 0.11 }),
  ];

  // The only prominent orbit treatment lives beneath the headline, where it supports the CTA instead of competing with Lyubov.
  const textOrbitGroup = new THREE.Group();
  textOrbitGroup.position.set(-2.55, -1.35, 0.2);
  textOrbitGroup.rotation.z = -0.12;
  root.add(textOrbitGroup);

  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xe6c38d, transparent: true, opacity: 0.62 });
  const orbitAccentMaterial = new THREE.LineBasicMaterial({ color: 0xc6b9e0, transparent: true, opacity: 0.46 });
  const orbitSpecs = [
    { x: 0, y: 0, rx: 1.25, ry: 0.27, z: 0.02, material: orbitMaterial, speed: 0.33 },
    { x: 0.03, y: 0.02, rx: 1.02, ry: 0.55, z: 0.05, material: orbitAccentMaterial, speed: -0.24 },
    { x: 0, y: 0, rx: 0.78, ry: 0.19, z: 0.08, material: orbitMaterial, speed: 0.46 },
  ];
  const textOrbits = orbitSpecs.map((spec, index) => {
    const points = [];
    for (let i = 0; i <= 96; i += 1) {
      const a = (i / 96) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * spec.rx, Math.sin(a) * spec.ry, spec.z));
    }
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), spec.material);
    line.rotation.z = index === 1 ? 0.7 : index === 2 ? -0.24 : -0.1;
    textOrbitGroup.add(line);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(index === 1 ? 0.045 : 0.055, 16, 12), new THREE.MeshBasicMaterial({ color: index === 1 ? 0xc7b9e7 : 0xf1c47d }));
    textOrbitGroup.add(bead);
    return { line, bead, speed: spec.speed, radiusX: spec.rx, radiusY: spec.ry, phase: index * 1.8 };
  });

  let width = 1;
  let height = 1;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function movePointer(event) {
    const rect = hero.getBoundingClientRect();
    pointer.tx = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.ty = (event.clientY - rect.top) / rect.height - 0.5;
  }

  function animate() {
    const time = performance.now() * 0.001;
    const t = reducedMotion ? 0 : time;
    pointer.x += (pointer.tx - pointer.x) * 0.035;
    pointer.y += (pointer.ty - pointer.y) * 0.035;

    camera.position.x = pointer.x * 0.16;
    camera.position.y = -pointer.y * 0.1;
    camera.lookAt(0, 0, 0);
    root.rotation.y = pointer.x * 0.045;
    root.rotation.x = -pointer.y * 0.025;

    stars.rotation.z = t * 0.006;
    starMaterial.opacity = 0.46 + Math.sin(t * 0.7) * 0.08;

    celestialBodies.forEach((body, index) => {
      const angle = body.phase + t * body.speed;
      body.pivot.rotation.z = angle;
      body.planet.rotation.y = t * (0.18 + index * 0.04);
      body.halo.material.opacity = 0.22 + Math.sin(t * 0.8 + index) * 0.045;
    });

    textOrbits.forEach((orbit) => {
      const angle = orbit.phase + t * orbit.speed;
      orbit.line.rotation.z += (orbit.speed * 0.002);
      orbit.bead.position.set(Math.cos(angle) * orbit.radiusX, Math.sin(angle) * orbit.radiusY, 0.13);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  hero.addEventListener('pointermove', movePointer, { passive: true });
  window.addEventListener('resize', resize);
  resize();
  animate();
  }
}

if (document.querySelector('.hero')) startThreeLayer();
window.addEventListener('hero-ready', startThreeLayer, { once: true });
const waitForHero = window.setInterval(() => {
  if (document.querySelector('.hero')) {
    window.clearInterval(waitForHero);
    startThreeLayer();
  }
}, 60);
