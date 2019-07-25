function chunk(x, y)
{

	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

//	this.add_water();
	this.state_cube("init");

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

		geometry = new THREE.BufferGeometry();

		geometry.addAttribute( 'position', new THREE.BufferAttribute(data.vertices, 3 ));
		geometry.addAttribute( 'normal', new THREE.BufferAttribute(data.vertex_normals, 3, true ));
		geometry.addAttribute( 'color', new THREE.BufferAttribute(data.colors, 3, true ));
		geometry.setIndex(new THREE.BufferAttribute(data.faces, 1 ));


//		geometry.computeVertexNormals();
//		geometry.computeFaceNormals();

		if (this.mesh)
		{
			this.mesh.geometry.dispose();
			this.mesh.geometry = null;
			this.mesh.geometry = geometry;
		}
		else
		{
			this.mesh = new THREE.Mesh( geometry, ground_material );

			this.mesh.position.x -= 0.5;
			this.mesh.position.z -= 0.5;

			this.group.add( this.mesh );
/*
			this.helper = new THREE.VertexNormalsHelper( this.mesh, 5, 0x00ff00, 1 );
			scene.add(this.helper);
*/
		}

		this.state_cube("loaded");

	},

	state_cube : function(state)
	{
		if (state == "init")
		{
			var geometry = new THREE.BoxGeometry( 2, 2, 2 );
			this.state_cube_mesh = new THREE.Mesh( geometry, state_cube_material );

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
