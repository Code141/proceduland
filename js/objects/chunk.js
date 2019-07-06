function chunk(x, y)
{
	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

	this.add_water();
	this.state_cube("init");
}

chunk.prototype.add_water = function()
{
	var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	var water = new THREE.Mesh( geometry, water_material );
	water.rotation.x = deg(-90);
	this.group.add( water );
}

chunk.prototype.update = function(vertices, colors)
{
	geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.BufferAttribute(vertices, 3 ));
	geometry.addAttribute( 'color', new THREE.BufferAttribute(colors, 3, true ));
	geometry.computeVertexNormals();
//	this.COUNT += vertices.length / 3 / 3;

/*	geometry.computeFaceNormals();
	geometry.computeBoundingSphere();
	geometry.computeBoundingBox(); */

	if (this.mesh)
	{
		this.group.remove(this.mesh);
		this.mesh.geometry.dispose();
	}

	this.mesh = new THREE.Mesh( geometry, ground_material );
	this.group.add( this.mesh );
	this.state_cube("loaded");
}

chunk.prototype.state_cube = function(state)
{
	if (state == "init")
	{
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		this.state_cube_mesh = new THREE.Mesh( geometry, state_cube_material );
		this.group.add( this.state_cube_mesh );
	}

	if (state == "loading")
	{
		this.group.add( this.state_cube_mesh );
		this.state_cube_mesh.material.color.setHex(0xff0000);
	}

	if (state == "loaded")
	{
		this.group.remove( this.state_cube_mesh );
	}
}

