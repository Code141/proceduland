deg = function(deg){
	return ((deg/180)*Math.PI);
}


SelectorTool = function( color, chunkSize, maxHeight){

	var geometry = new THREE.BoxGeometry( chunkSize, maxHeight, chunkSize );
	var material = new THREE.MeshBasicMaterial( {
		color: color,
		transparent: true,
		opacity:0.5
	} );

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.y = maxHeight/2;

	scene.add( this.mesh );

	this.move = function(x,z){
		this.mesh.position.x = x * chunkSize;
		this.mesh.position.z = z * chunkSize;
	}
	
}


pointViewer = function( x, z){

	var geometry = new THREE.SphereGeometry( 10, 4, 4 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.x = x;
	sphere.position.z = z;
	sphere.position.y = 500;

	scene.add( sphere );

	
}



