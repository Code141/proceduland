water_material = new THREE.MeshPhongMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.6
} );

ground_material = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
	shading: THREE.FlatShading,
	color: 0xffffff,
	wireframe: true,
	transparent : true,
	opacity : 0.3
	

});

state_cube_material = new THREE.MeshBasicMaterial( {
	color: 0xff5500,
	wireframe: true,
	wireframeLinewidth: 1,
	wireframeLinejoin: 'round',
	wireframeLineCap: 'round'
} );

