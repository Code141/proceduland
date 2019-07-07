
let Chunk = function(x, z, hypo)
{
	this.x = x;
	this.z = z;
	this.LODArray = [];

	V3.prototype.setHeight = function()
	{
		let pro = procedural(x + this.x, z + this.z);
		this.y = pro.height;
		this.color = pro.color;
	}

	let a = new V3(0, 0, 0);

	let b = new V3(0.5, 0, -0.5);
	let c = new V3(-0.5, 0, -0.5);
	let d = new V3(0.5, 0, 0.5);
	let e = new V3(-0.5, 0, 0.5);

	a.setHeight();
	b.setHeight();
	c.setHeight();
	d.setHeight();
	e.setHeight();

	this.north = new BinaryTriangleTree(a, b, c);
	this.east = new BinaryTriangleTree(a, d, b);
	this.south = new BinaryTriangleTree(a, e, d);
	this.west = new BinaryTriangleTree(a, c, e);

	this.north.NL = this.east;
	this.north.NR = this.west;
	this.east.NL = this.south;
	this.east.NR = this.north;
	this.south.NL = this.west;
	this.south.NR = this.east;
	this.west.NL = this.north;
	this.west.NR = this.south;

	this.north.createChilds();
	this.east.createChilds();
	this.south.createChilds();
	this.west.createChilds();
}

Chunk.prototype = {

	getBTTLod : function(hypo)
	{
		this.nb_faces = 0;

		this.north.getLod(hypo);
		this.east.getLod(hypo);
		this.south.getLod(hypo);
		this.west.getLod(hypo);
	},

	mergeVertices: function (data) {
		vertices = data.vertices;
		faces = data.faces;
		colors = data.colors;

		var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
		let unique = [];
		let unique_c = [];
		let changes = [];

		let key;
		let i, il;
		let indices, j, jl;

	var t0 = performance.now();

		for ( i = 0, il = vertices.length / 3; i < il; i ++ )
		{
			index = i * 3;
			let v = {
				x : vertices[index],
				y : vertices[index + 1],
				z : vertices[index + 2]
			};
			
			let c = {
				r : colors[index],
				g : colors[index + 1],
				b : colors[index + 2]
			};

			key = v.x + '' + v.z  ; // ULTRA HEAVY PERFORMANCES

			if ( verticesMap[ key ] === undefined ) {
				verticesMap[ key ] = i;
				unique.push( v );
				unique_c.push( c );
				changes[ i ] = unique.length - 1;
			} else {
				changes[ i ] = changes[ verticesMap[ key ] ];
			}

		}

		var t1 = performance.now();
		console.log("DELETES HASH VERTICES() " + (t1 - t0) + " ms")


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.
		var faceIndicesToRemove = [];

		var t0 = performance.now();
		for ( i = 0, il = faces.length; i < il; i ++ )
		{

			face = faces[ i ];

			face.a = changes[ face.a ];
			face.b = changes[ face.b ];
			face.c = changes[ face.c ];

			indices = [ face.a, face.b, face.c ];

			// if any duplicate vertices are found in a Face3
			// we have to remove the face as nothing can be saved
			for ( var n = 0; n < 3; n ++ ) {
				if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {
					faceIndicesToRemove.push( i );
					break;
				}
			}
		}

		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {
			var idx = faceIndicesToRemove[ i ];
			faces.splice( idx, 1 );
		}

		var t1 = performance.now();
		console.log("RELINK FACES() " + (t1 - t0) + " ms")


		// Use unique set of vertices

		var diff = vertices.length - unique.length;

		var t0 = performance.now();
		let new_vertices = new Float32Array(unique.length * 3);
		for (let i = 0; i < unique.length; i++)
		{
			new_vertices[(i * 3)] = unique[i].x;
			new_vertices[(i * 3) + 1] = unique[i].y;
			new_vertices[(i * 3) + 2] = unique[i].z;
		}

		let new_faces = new Uint32Array(faces.length *3 * 3);
		for (let i = 0; i < faces.length; i++)
		{
			new_faces[(i * 3)] = faces[i].a;
			new_faces[(i * 3) + 1] = faces[i].b;
			new_faces[(i * 3) + 2] = faces[i].c;
		}

		let new_colors = new Uint8Array(unique_c.length * 3);
		for (let i = 0; i < unique_c.length; i++)
		{
			new_colors[(i * 3)] = unique_c[i].r;
			new_colors[(i * 3) + 1] = unique_c[i].g;
			new_colors[(i * 3) + 2] = unique_c[i].b;
		}

		var t1 = performance.now();
		console.log("COPY ALL() " + (t1 - t0) + " ms")


		data.faces = new_faces;
		data.colors = new_colors;
		data.vertices = new_vertices;
	},

	printLOD : function()
	{
		let nb_face = this.north.count() + this.east.count() + this.south.count() + this.west.count();
		let length = nb_face * (3 * 3);
		let vertices = new Float32Array(length);
		let colors = new Uint8Array(length);



		faces = [];
		for (let i = 0; i < nb_face * 3; i++)
		{
			faces[i] = {
				a : (i * 3),
				b : (i * 3) + 1,
				c : (i * 3) + 2
			};
		}


		data = {
			vertices: vertices,
			faces: faces,
			colors: colors
		}

		let i = 0;
		i += this.north.printLod(data, i);
		i += this.east.printLod(data, i);
		i += this.south.printLod(data, i);
		i += this.west.printLod(data, i);




		this.mergeVertices(data);

		return data;
	},

};

