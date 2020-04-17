const DEG = function (deg) { return ((deg / 180) * Math.PI); };
let renderer; let scene; let
  camera;
let stats;
let keyboard; let
  mouse;
let INTERSECTED;
let minimap;

function init() {
  if (!Detector.webgl) alert(Detector.addGetWebGLMessage());
  if (!window.Worker) alert('WEBWORKER NOT SUPPORTED');

  container = document.getElementById('threeContainer');


  minimap = new Minimap();


  initThreeJs(container);
  initGUI();
  loop();
}

function keyboardState() {
  keyboard.update();

  if (keyboard.down('up'))
  // world.move( 0, -1 );
  { if (keyboard.down('down')) world.move(0, +1); }
  if (keyboard.down('left')) world.move(-1, 0);
  if (keyboard.down('right')) world.move(+1, 0);
}

function initThreeJs(container) {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, true);

  keyboard = new KeyboardState();
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0xffffff, 2000, 5000);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50000,
  );
  camera.position.x = 0;
  camera.position.y = 200;
  camera.position.z = 200;

  /* -------- DEV TOOLS --------*/
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);
  controls = new THREE.OrbitControls(camera);
  controls.target.set(0, 0, 0);
  // AXIS HELPER
  const axisHelper = new THREE.AxesHelper(500);
  scene.add(axisHelper);

  world = new World();
  scene.add(world.group);

  load('tinnyHouse', 'models/tinnyHouse.dae', 1);
}

function loop() {
  window.requestAnimationFrame(loop);

  keyboardState();

  stats.update();
  world.update();

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(world.proceduland.group, false);

  for (let i = 0; i < intersects.length; i++) {
    console.log(intersects[i]);
    const object = intersects[i].object.userData;
    object.hover();
  }
  render();
}

function render() {
  renderer.render(scene, camera);
}
