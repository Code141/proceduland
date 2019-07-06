water_material = new THREE.MeshBasicMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.6
} );

ground_material = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
	shading: THREE.SmoothShading
});

state_cube_material = new THREE.MeshBasicMaterial( {
	color: 0xff0000,
	wireframe: true,
} );


