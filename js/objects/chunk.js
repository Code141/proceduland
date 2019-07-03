function chunk(x, y)
{
	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

}

chunk.prototype.insertVertices = function(vertices, colors)
{
	this.geometry = new THREE.BufferGeometry();
	this.geometry.addAttribute( 'position', new THREE.BufferAttribute(vertices, 3 ));
	this.geometry.addAttribute( 'color', new THREE.BufferAttribute(colors, 3, true ));
}

chunk.prototype.buildChunkMesh = function()
{
	this.geometry.computeVertexNormals();
	this.geometry.computeFaceNormals();
/*
	this.geometry.computeBoundingSphere();
	this.geometry.computeBoundingBox();
*/
	setGradient(this.geometry, 'y', true);
	this.mesh = new THREE.Mesh( this.geometry, mat );

	//WATER

	var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	var water = new THREE.Mesh( geometry, waterMaterial );
	water.rotation.x = deg(-90);
	this.group.add( water );

	this.group.add( this.mesh );
}

