chunkSize = 128;
maxHeight = 50;
chunksDistance = 1;
levelMax = 2;

var renderer, scene, camera;

INTERSECTED = null;

deg = function(deg){ return ((deg/180)*Math.PI); }

function init(){
	DEV = true;

	if (!Detector.webgl)
		alert(Detector.addGetWebGLMessage());
	if (!window.Worker)
		alert('WEBWORKER NOT SUPPORTED');

	container = document.getElementById( 'threeContainer' );
	initThreeJs( container);
	fillscene();
	initGUI();
	loop();
}


function initThreeJs( container )
{
	/* --------- BASICS ----------*/
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000000 );
	camera.position.x = 0;
	camera.position.y = 200;
	camera.position.z = 200;

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
	renderer.setClearColor( 0x333333 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	//ORBIT CONTROL
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x333333);
//	scene.fog = new THREE.Fog( 0xadc3f3, 300, 1000 )

	keyboard = new KeyboardState();
	mouse = new THREE.Vector2();


	window.addEventListener( 'resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false );

	window.addEventListener( 'mousemove', (event) => {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}, true )


/* -------- DEV TOOLS --------*/
	if (DEV){
		//STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );

		controls = new THREE.OrbitControls( camera );
		controls.target.set( 0, 0, 0 );

		//AXIS HELPER
/*		var axisHelper = new THREE.AxesHelper( 500 );
		scene.add( axisHelper );i
			*/
	}


}

function loop()
{
	window.requestAnimationFrame( loop );

	if ( DEV )
		stats.update();

	keyboardState();

	world.update();

	renderer.render(scene, camera);
}

function fillscene()
{
	world = new World(chunkSize, maxHeight, chunksDistance, levelMax);
	scene.add(world.group);
	world.requestChunks();

//	sky = new Sky();
	initLight();

	load("tinnyHouse", 'models/tinnyHouse.dae', 1);
//	voronoi();
}

function initLight()
{


	var light = new THREE.AmbientLight( 0x333333 ); // soft white light
	scene.add( light );




}

function voronoi(){
	chunksDistance = 7;
	w = chunkSize * (chunksDistance * 2 - 1);
	h = chunkSize * (chunksDistance * 2 - 1);

	group = new THREE.Group();
	group.position.x = - w / 2;
	group.position.z = - h / 2;
	points = [];

	v = new Voronoi();

	for (let x = 0; x < chunksDistance * 2 - 1; x++)
		for (let y = 0; y < chunksDistance * 2 - 1; y++)
			points.push( new Point(
					(Math.random() * chunkSize) + x * chunkSize,
					(Math.random() * chunkSize) + y * chunkSize
				))

	var material = new THREE.LineBasicMaterial( { color: 0xffff00 } );
	var geometry = new THREE.Geometry();

	geometry.vertices.push(new THREE.Vector3( 0, 0, 0));
	geometry.vertices.push(new THREE.Vector3( 0, 0, h));
	geometry.vertices.push(new THREE.Vector3( w, 0, h));
	geometry.vertices.push(new THREE.Vector3( w, 0, 0));
	geometry.vertices.push(new THREE.Vector3( 0, 0, 0));

	var cadre_line = new THREE.Line( geometry, material );
	group.add( cadre_line );

	v.Compute(points, w, h);

	edges = v.GetEdges();
	cells = v.GetCells();

	var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

	for (let i = 0; i < edges.length; i++)
	{
		let e = edges[i];
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3( e.start.x, 0, e.start.y) );
		geometry.vertices.push(new THREE.Vector3( e.end.x, 0, e.end.y) );
		var voronoi_line = new THREE.Line( geometry, material );
		group.add( voronoi_line );
	}

	var material = new THREE.LineBasicMaterial( { color: 0x995599 } );
	for (let i = 0; i < edges.length; i++)
	{
		let e = edges[i];
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3( e.left.x, 0, e.left.y) );
		geometry.vertices.push(new THREE.Vector3( e.right.x, 0, e.right.y) );
		var delaunay_line = new THREE.Line( geometry, material );
		group.add( delaunay_line );
	}

	var geometry1 = new THREE.IcosahedronBufferGeometry( 2, 1 );
	var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
	for (let i = 0; i < points.length; i++)
	{
		var mesh = new THREE.Mesh( geometry1, material );
		mesh.position.x = points[i].x;
		mesh.position.z = points[i].y;
		group.add( mesh );
	}
	scene.add(group);
}


