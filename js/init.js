function init(){
	var renderer, scene, camera, clock;
	var seed;
	INTERSECTED = null;

	DEV = false;


	if ( ! Detector.webgl ){
		Detector.addGetWebGLMessage();
	}else{
		initThreeJs( 'threeContainer' );
		fillscene();
		update();
	}
	
//	if(window.Worker){
//		alert('WEBWORKER');
//	}else{}

}
	

function initThreeJs( containerId ){
	
	/* --------- BASICS ----------*/
	
	container = document.getElementById( containerId );

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x777777, 500, 3000 )

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 10000 );
	camera.position.x = 0;
	camera.position.y = 300;
	camera.position.z = 300;
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
	renderer.setClearColor( 0x777777 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	
	/* -------- DEV TOOLS --------*/
		//ORBIT CONTROL
		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 0 );
	
	if(DEV){
		scene.fog = new THREE.Fog( 0x777777, 10000, 20000 )

		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );




		//GRID HELPER
		var gridHelper = new THREE.GridHelper( 1000, 10 );
		scene.add( gridHelper );

		//AXIS HELPER
		var axisHelper = new THREE.AxisHelper( 500 );
		scene.add( axisHelper );


container.addEventListener( 'mousemove', onMouseMove, false );

	}

keyboard = new KeyboardState();
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

document.onclick = onMouseClick;




var geometry = new THREE.BoxGeometry( 1, 200, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = 100;
cube.position.x = 100;
scene.add( cube );
tinnyHouse = MODELS["tinnyHouse"].clone();
tinnyHouse.position.y = 20;
scene.add(tinnyHouse);



}

/* ------ ANIMATION LOOP ------*/

update = function(){

	requestAnimationFrame( update );
	
	if ( DEV ) stats.update();

	var delta = clock.getDelta();
	keyboardState();

//	world.update(delta);


	renderer.render(scene, camera);


}


/* ------ INIT OBJ HERE ------*/

fillscene = function(){
	seed = Math.random(); 
	
	world = new World();
//	world.loadChunks( 0, 0 );
	
	var light = new THREE.AmbientLight( 0xaaaaaa ); // soft white light
	scene.add( light );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 300, 0 );
scene.add( light );

}


