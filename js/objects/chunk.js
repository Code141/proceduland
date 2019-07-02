function chunk(x, y)
{
	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

}

chunk.prototype.insertVertices = function(LODArray)
{
	this.geometry = new THREE.Geometry();

	for (let i = 0; i < LODArray.length; i += 3)
	{
		currentFaceVertice = this.geometry.vertices.length;

		let VA = LODArray[i];
		let VL = LODArray[i + 1];
		let VR = LODArray[i + 2];

		this.geometry.vertices.push(
			new THREE.Vector3( VA.x, VA.y, VA.z),
			new THREE.Vector3( VL.x, VL.y, VL.z),
			new THREE.Vector3( VR.x, VR.y, VR.z)
		);

		this.geometry.faces.push(
			new THREE.Face3(
				currentFaceVertice,
				currentFaceVertice + 1,
				currentFaceVertice + 2
			)
		);
	}
}

chunk.prototype.buildChunkMesh = function()
{
	this.geometry.computeFaceNormals();
//	this.geometry.computeBoundingSphere();

	setGradient(this.geometry, 'y', true);
	this.mesh = new THREE.Mesh( this.geometry, mat );

	//WATER

	var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	var water = new THREE.Mesh( geometry, waterMaterial );

	water.rotation.x = deg(-90);

	this.group.add( this.mesh );
	this.group.add( water );

}



