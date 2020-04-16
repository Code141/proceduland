function chunk(x, y)
{
	this.x = x;
	this.y = y;

	this.group = new THREE.Group();
  this.group.userData = this;

	this.add_water();
	this.state_cube("init");

	this.geometry = new THREE.BufferGeometry();

	this.mesh = new THREE.Mesh( this.geometry, terrain_material );

this.mesh.castShadow = true; //default is false
this.mesh.receiveShadow = true; //default

this.mesh.matrixAutoUpdate  = false;
	this.group.add( this.mesh );
}

chunk.prototype = {

	destroy : function()
	{
    // free all
	},

  update()
  {

    this.mesh.material = terrain_material;
  },

  hover()
  {
    this.mesh.material = terrain_material;
  },


	updateAttribute : function(data)
  {
	this.group.remove( this.mesh );

	this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute( 'position',
      new THREE.BufferAttribute( data.vertices, 3)
    );

    this.geometry.setAttribute( 'normal',
      new THREE.BufferAttribute( data.vertex_normals, 3, true)
    );

    this.geometry.setAttribute( 'color',
      new THREE.BufferAttribute( data.colors, 3, true)
    );

    this.geometry.setAttribute( 'uv',
      new THREE.BufferAttribute( data.uvs, 2)
    );

    this.geometry.setIndex(
      new THREE.BufferAttribute( data.faces, 1)
    );

	  this.geometry.computeBoundingSphere();
		this.geometry.computeVertexNormals();


	this.mesh = new THREE.Mesh( this.geometry, ground_material );
	this.group.add( this.mesh );
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
	},

	add_water : function()
	{
		var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		var water = new THREE.Mesh( geometry, water_material );

		water.position.x += 0.5;
		water.position.z += 0.5;
		water.rotation.x = DEG(-90);

		this.group.add( water );
	},

}
