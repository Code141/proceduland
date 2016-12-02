function init(){
	DEV = true;
	ccl = new coCoLog();

	if ( Detector.webgl ){

		if( window.Worker ){

			initThreeJs( 'threeContainer' );
			fillscene();
			initGUI();
			update();

<<<<<<< HEAD
=======

>>>>>>> origin/master
		}else{

			alert('WEBWORKER NOT SUPPORTED');

		}

	}else{

		Detector.addGetWebGLMessage();

	}
	
}

var renderer, scene, camera, clock;
var seed;

INTERSECTED = null;

function initThreeJs( containerId ){
	
	/* --------- BASICS ----------*/
	
	container = document.getElementById( containerId );

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	//	scene.fog = new THREE.Fog( 0x000000, 2000, 7500 )

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 2000000 );
	camera.position.x = 0;
	camera.position.y = 3000;
	camera.position.z = -3000;
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
	
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
	renderer.setClearColor( 0x000000 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );
	
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

<<<<<<< HEAD

/* -------- DEV TOOLS --------*/
		//ORBIT CONTROL
		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 0 );
=======

/* -------- DEV TOOLS --------*/
		//ORBIT CONTROL
		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 0 );

		if(DEV){
		//	scene.fog = new THREE.Fog( 0xadc3f3, 500, 5000 )

		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );

>>>>>>> origin/master

		if(DEV){
		//	scene.fog = new THREE.Fog( 0xadc3f3, 50, 500 )

			//STATS
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			container.appendChild( stats.domElement );

<<<<<<< HEAD
=======

>>>>>>> origin/master
//		//GRID HELPER
//		var gridHelper = new THREE.GridHelper( 1000, 2 );
//		scene.add( gridHelper );

		//AXIS HELPER
		var axisHelper = new THREE.AxisHelper( 500 );
		scene.add( axisHelper );


<<<<<<< HEAD
//		container.addEventListener( 'mousemove', onMouseMove, true );
=======
//container.addEventListener( 'mousemove', onMouseMove, true );
>>>>>>> origin/master

}

keyboard = new KeyboardState();
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

//document.onclick = onMouseClick;

//	var geometry = new THREE.BoxGeometry( 1, 200, 1 );
//	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
//	var cube = new THREE.Mesh( geometry, material );
//	cube.position.y = 100;
//	cube.position.x = 100;
//	scene.add( cube );
//	
//	tinnyHouse = MODELS["tinnyHouse"].clone();
//	//tinnyHouse.position.y = 115;
//	tinnyHouse.position.x = 100;
//	tinnyHouse.position.y = 196;
//	
//	scene.add(tinnyHouse);


}

/* ------ ANIMATION LOOP ------*/

function update(){
	window.requestAnimationFrame( update );
	
	if ( DEV ) stats.update();

	var delta = clock.getDelta();
	keyboardState();

	if(QUEUE.length > 0) queueUpdate();


	renderer.render(scene, camera);
}


QUEUE = [];

function addToQueue(item){
	QUEUE.push(item);
}

function queueUpdate(){
	element = QUEUE.shift();
	element();
}




/* ------ INIT OBJ HERE ------*/

function fillscene(){
	//seed = Math.random(); 
	
	world = new World();
	world.init();
	world.buildChunks();

	sky = new Sky();

	initLight();

}


function initLight(){

//var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
//directionalLight.position.set( 0, 1000, 0 );
//scene.add( directionalLight );

var light = new THREE.AmbientLight( 0x333333 ); // soft white light
scene.add( light );


}






