chunkSize = 128;
maxHeight = 50;
chunksDistance = 3;
levelMax = 10;

function init(){
	DEV = true;
	ccl = new coCoLog();

	if (!Detector.webgl)
		alert(Detector.addGetWebGLMessage());
	if (!window.Worker)
		alert('WEBWORKER NOT SUPPORTED');

	initThreeJs( 'threeContainer' );
	fillscene();
	initGUI();
	update();
}

var renderer, scene, camera, clock;


INTERSECTED = null;

function initThreeJs( containerId )
{
	/* --------- BASICS ----------*/

	container = document.getElementById( containerId );

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	//	scene.fog = new THREE.Fog( 0x000000, 2000, 7500 )

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 2000000 );
	camera.position.x = 0;
	camera.position.y = 300;
	camera.position.z = -300;
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
	renderer.setClearColor( 0x000000 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false );

/* -------- DEV TOOLS --------*/

	//ORBIT CONTROL
	controls = new THREE.OrbitControls( camera );
	controls.target.set( 0, 0, 0 );

//		scene.fog = new THREE.Fog( 0xadc3f3, 500, 5000 )

	if(DEV){

		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );


		//GRID HELPER
		//	var gridHelper = new THREE.GridHelper( 1000, 2 );
		//	scene.add( gridHelper );

		//AXIS HELPER
		var axisHelper = new THREE.AxesHelper( 500 );
		scene.add( axisHelper );

		circleGridHelper(chunkSize * (chunksDistance + 1/2), 4, chunksDistance + 1);
		//	container.addEventListener( 'mousemove', onMouseMove, true );
	}

keyboard = new KeyboardState();
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

//	var geometry = new THREE.BoxGeometry( 1, 200, 1 );
//	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
//	var cube = new THREE.Mesh( geometry, material );
//	cube.position.y = 100;
//	cube.position.x = 100;
//	scene.add( cube );
//	
	tinnyHouse = MODELS["tinnyHouse"].clone();
	scene.add(tinnyHouse);
//	tinnyHouse.position.y = 115;
//	tinnyHouse.position.x = 100;
//	tinnyHouse.position.y = 196;


}

/* ------ ANIMATION LOOP ------*/
/*
function update(timestamp)
{
	requestAnimationFrame( update );
	if ( DEV ) stats.update();

	keyboardState();

	renderer.render(scene, camera);

	world.update();
}
*/

function update(){
	window.requestAnimationFrame( update );

	if ( DEV ) stats.update();
	keyboardState();




	startTime = window.performance.now();

	renderer.render(scene, camera);

	endTime = window.performance.now();


	do { // TIMER
		if (world.ChunkToRefresh.length == 0)
			break;
		world.update();
		timeNow = window.performance.now();
	} while (startTime+(1000/200) > timeNow)
}

/* ------ INIT OBJ HERE ------*/

function fillscene(){

	world = new World(chunkSize, maxHeight, chunksDistance, levelMax);
	world.init();
	world.requestChunks();

	sky = new Sky();

	initLight();
}


function initLight()
{
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 0, 1000, 0 );
	scene.add( directionalLight );
	

	var light = new THREE.AmbientLight( 0x333333 ); // soft white light
	scene.add( light );
}

