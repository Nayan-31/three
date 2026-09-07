// CSS file load karo, taaki canvas ki styling apply ho.
import './style.css';
// Three.js ke saare exports ko THREE naam se access kar sakte hain.
import * as THREE from 'three';
// OrbitControls Three.js ka addon hai; mouse/touch se camera control karta hai.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene ek 3D container hai; dikhane wale objects ismein add karte hain.
const scene = new THREE.Scene();

// Perspective camera mein door ki cheezein chhoti dikhti hain.
const camera = new THREE.PerspectiveCamera(
  75, // Vertical field of view (degrees): camera kitna upar-neeche dekh sakta hai.
  window.innerWidth / window.innerHeight, // Aspect ratio: viewport ki width / height.
  0.1, // Near plane: isse paas ka hissa render nahi hota.
  100, // Far plane: isse door ka hissa render nahi hota.
);
// Position (x, y, z): camera ko origin se 2 units right aur 3 units +Z par rakho.
camera.position.set(2, 0, 3);
// Camera ko origin (0, 0, 0) ki taraf ghumao, jahan cube hai.
camera.lookAt(0, 0, 0);

// Geometry shape banati hai; yahan width, height aur depth sab 1 unit hain.
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material object ka look tay karta hai; MeshBasicMaterial ko lights nahi chahiye.
const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true, // Solid surface ki jagah geometry ke triangles ki lines dikhao.
});
// Mesh = geometry + material, yani scene mein dikhne wala 3D object.
const cube = new THREE.Mesh(geometry, material);
// Cube ko scene mein add karna zaroori hai, warna woh render nahi hoga.
scene.add(cube);

// HTML se id="webgl" wala canvas element lo.
const canvas = document.querySelector('#webgl');
// Renderer scene ko camera ke view se canvas par draw karta hai.
// antialias: true se edges ka jagged look kam hota hai.
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Camera ko canvas ke mouse/touch events se connect karo.
// Left drag: orbit, scroll: zoom, right drag: pan (view ko side mein move karna).
const controls = new OrbitControls(camera, renderer.domElement);
// Drag chhodne par movement dheere rukegi, jisse camera smooth feel hota hai.
controls.enableDamping = true;
// Camera is point ke around ghoomega; cube abhi origin par hai.
controls.target.set(0, 0, 0);
controls.update();

// Window ka size badle toh camera aur canvas dono update karo.
function resize() {
  // Naya aspect ratio set karo, taaki cube stretched na dikhe.
  camera.aspect = window.innerWidth / window.innerHeight;
  // Badli hui camera settings ko projection calculation mein apply karo.
  camera.updateProjectionMatrix();
  // Sharp screens ke liye pixel density badhao; max 2 rakhkar GPU load limit karo.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Canvas ka drawing size viewport ki width aur height ke barabar rakho.
  renderer.setSize(window.innerWidth, window.innerHeight);
}
// Page load par bhi size set karo; resize event ka wait mat karo.
resize();
// Window resize hone par resize function dobara chalega.
window.addEventListener('resize', resize);

// Pehle frame ka time store karenge, taaki animation zero se start ho.
let startTime;
// Animation loop har frame par time (milliseconds) deta hai.
function animate(time) {
  // ??= sirf null/undefined hone par value assign karta hai; yahan pehle frame par.
  startTime ??= time;
  // Start se guzra hua time seconds mein convert karo.
  const elapsedSeconds = (time - startTime) / 1000;
  // Y-axis ke around 0.6 radians/second ghumao; speed frame rate par depend nahi karti.
  cube.rotation.y = elapsedSeconds * 0.6;
  // Damping ke liye har frame camera controls update karna zaroori hai.
  controls.update();
  // Rotation badalne ke baad naya frame draw karo, tabhi movement dikhegi.
  renderer.render(scene, camera);
}
// Three.js ko animate har frame par chalane do.
renderer.setAnimationLoop(animate);

// Vite ka dev-only hot reload: module replace ho toh purane resources saaf karo.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // Purana animation loop aur resize listener band karo.
    renderer.setAnimationLoop(null);
    window.removeEventListener('resize', resize);
    // Controls ke mouse/touch listeners hatao, taaki reload par duplicate na hon.
    controls.dispose();
    // Geometry, material aur renderer ke GPU resources release karo.
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  });
}
