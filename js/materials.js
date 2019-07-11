water_material = new THREE.MeshPhongMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.6
} );

var mapHeight = new THREE.TextureLoader().load(
"BUMP2.jpg" );

ground_material = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
	shading: THREE.FlatShading,
	color: 0xffffff,
	specular: 0x222222,
	shininess: 25,
	bumpMap: mapHeight,
	bumpScale: 102,

	wireframe: true,
	transparent : true,
	opacity : 0.1
});

state_cube_material = new THREE.MeshBasicMaterial( {
	color: 0xff5500,
	wireframe: true,
	wireframeLinewidth: 1,
	wireframeLinejoin: 'round',
	wireframeLineCap: 'round'
} );


