function chunk(x, y)
{
	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

//	this.add_water();
	this.state_cube("init");

	this.geometry = new THREE.BufferGeometry();
	this.geometry.boundingBox = new THREE.Box3(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(100, 100, 100)
	);
	this.mesh = new THREE.Mesh( this.geometry, ground_material );
	this.mesh.matrixAutoUpdate = false;

	this.group.add( this.mesh );
}

chunk.prototype = {

	add_water : function()
	{
		var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		var water = new THREE.Mesh( geometry, water_material );
		water.position.x += 0.5;
		water.position.z += 0.5;
		water.rotation.x = deg(-90);

		this.group.add( water );
	},

	update : function(data)
	{
		this.geometry.addAttribute( 'position', new THREE.BufferAttribute(data.vertices, 3 ));
		this.geometry.addAttribute( 'normal', new THREE.BufferAttribute(data.vertex_normals, 3, true ));
		this.geometry.addAttribute( 'color', new THREE.BufferAttribute(data.colors, 3, true ));
		this.geometry.setIndex(new THREE.BufferAttribute(data.faces, 1));

		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.attributes.color.needsUpdate = true;
		this.geometry.attributes.normal.needsUpdate = true;
		this.geometry.index.needsUpdate = true;

		this.geometry.computeBoundingSphere();
		this.geometry.computeVertexNormals();


//		helper = new THREE.VertexNormalsHelper( this.mesh, 0.2, 0x00ff00, 0.1);
//		scene.add(helper);

		this.state_cube("loaded");
	},

	state_cube : function(state)
	{
		if (state == "init")
		{
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );

			this.state_cube_mesh = new THREE.Mesh( geometry, state_cube_material );

			this.state_cube_mesh.position.x += 0.5;
			this.state_cube_mesh.position.z += 0.5;

			this.group.add( this.state_cube_mesh );
		}

		if (state == "loading")
		{
			this.group.add( this.state_cube_mesh );
			this.state_cube_mesh.material.color.setHex(0xff5500);
		}

		if (state == "loaded")
		{
			this.group.remove( this.state_cube_mesh );
		}
	}
}
