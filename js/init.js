function init(){
	var renderer, scene, camera, clock;
	var seed;
	INTERSECTED = null;

	DEV = true;


	if ( ! Detector.webgl ){
		Detector.addGetWebGLMessage();
	}else{
		initThreeJs( 'threeContainer' );
		fillscene();
		update();
	}
}
	

function initThreeJs( containerId ){
	
	/* --------- BASICS ----------*/
	
	container = document.getElementById( containerId );

	clock = new THREE.Clock();
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x777777, 9000, 10000 )

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
	camera.position.x = 500;
	camera.position.y = 500;
	camera.position.z = 500;
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

	if(DEV){

		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );

		//ORBIT CONTROL
		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 0 );


		//GRID HELPER
		var gridHelper = new THREE.GridHelper( 1000, 10 );
		scene.add( gridHelper );

		//AXIS HELPER
		var axisHelper = new THREE.AxisHelper( 500 );
		scene.add( axisHelper );

	}

 keyboard = new KeyboardState();
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

container.addEventListener( 'mousemove', onMouseMove, false );
}

/* ------ ANIMATION LOOP ------*/

update = function(){

	requestAnimationFrame( update );
	
	if ( DEV ) stats.update();

	var delta = clock.getDelta();
	keyboardState();

	world.update(delta);


	renderer.render(scene, camera);




}




/* ------ INIT OBJ HERE ------*/

fillscene = function(){
	seed = Math.random(); 
	
	world = new World();

	
	var light = new THREE.AmbientLight( 0x606060 ); // soft white light
	scene.add( light );

	var light = new THREE.PointLight( 0xffffff, 1, 3000, 0.5);
	light.position.set( 0, 250, 0 );
	scene.add( light );

}






