groundMaterial = new THREE.MeshLambertMaterial( {
		emissive : 0x000000,
		vertexColors : THREE.VertexColors,
		transparent : false,
		opacity : 0.2,
		side : THREE.BackSide,
		wireframe : false
	} );

waterMaterial = new THREE.MeshBasicMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.7
} );