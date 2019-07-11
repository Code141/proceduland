function chunk(x, y)
{

	this.x = x;
	this.y = y;

	this.group = new THREE.Group();

//	this.add_water();
	this.state_cube("init");
var geometry = new THREE.BoxBufferGeometry( 128, 0.1, 128 );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = 64;
	mesh.position.z = 64;
//scene.add( mesh );
}

chunk.prototype = {

	add_water : function()
	{
		var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		var water = new THREE.Mesh( geometry, water_material );
		water.rotation.x = deg(-90);
		this.group.add( water );
	},

	update : function(vertices, faces, vertex_normals, colors)
	{
/*
THREE.TriangleStripDrawMode
This will result in a series of triangles connected in a strip, given by
(v0, v1, v2),
(v2, v1, v3),
(v2, v3, v4),
... so that every subsequent triangle shares two vertices with the previous triangle. 
*/
//console.log(vertices, faces, colors);
		geometry = new THREE.BufferGeometry();

		geometry.addAttribute( 'position', new THREE.BufferAttribute(vertices, 3 ));
//		geometry.addAttribute( 'index', new THREE.BufferAttribute(faces, 1 ));
		geometry.addAttribute( 'normal', new THREE.BufferAttribute(vertex_normals, 3, true ));
	//	geometry.addAttribute( 'color', new THREE.BufferAttribute(colors, 3, true ));

//	geometry.computeVertexNormals();
//	geometry.computeFaceNormals();



		if (this.mesh)
		{
			this.mesh.geometry.dispose();
			this.mesh.geometry = null;
			this.mesh.geometry = geometry;
		}
		else
		{
			this.mesh = new THREE.Mesh( geometry, ground_material );
			var helper = new THREE.VertexNormalsHelper( this.mesh, 0.005, 0x00ff00, 1 );
			this.group.add(helper);
			this.group.add( this.mesh );
		}

		this.state_cube("loaded");

	},

	state_cube : function(state)
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
			this.state_cube_mesh.material.color.setHex(0xff5500);
		}

		if (state == "loaded")
		{
			this.group.remove( this.state_cube_mesh );
		}
	}
}
