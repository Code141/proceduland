Math.fact = function (nb)
{
	return (nb === 0) ? 1 : (nb * this.fact(nb - 1));
}

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
//	this.init(LEVELMAX - hypo / 2);
	this.init2(LEVELMAX - hypo / 2);
}

Chunk.prototype = {

	get_info: function (level)
	{
		if (level > 24)
			throw "error level max is 24"
		level = (level < 1) ? 1: level;

		let info = [];
		let i = 1;
		let v2 = 1;

		info.push({
			v : { nb: 5, offset: 0, },
			f : { nb: 4, offset: 0, }
		});

		for (let l = 0; l < level; l++)
		{
			let v = 0;
			if (l % 2 == 0)
			{
				v1 = i * (i + 1) * 2;
				v = v1;
				i *= 2;
			}
			else
			{
				v2 *= 4;
				v = v2;
			}

			last = info[l];
			info.push({
				v : {
					indice: i / 2,
					nb: v,
					offset: last.v.offset + (last.v.nb * 3)
				},
				f : {
					nb: last.f.nb * 2,
					offset: last.f.offset + (last.f.nb * 3),
				}
			}
			);
		}
		return info;
	},

	generate_vertices: function(info, vue_vertices)
	{
		vue_vertices.set([
			0, 0, 0,
			size, 0, 0,
			size, 0, size,
			0, 0, size,
			size / 2, 0, size / 2
		]);

		for (let l = 1; l < info.length; l++)
		{
			let v = info[l].v;
			decal = size / v.indice;
			if (l % 2 != 0)
			{
				vue_vertices.copyWithin( v.offset, 0, 3);
				vue_vertices[v.offset + 0] += decal / 2;
				for (let x = 1; x < v.indice; x++)
				{
					vue_vertices.copyWithin(
						v.offset + (3 * x),
						v.offset + 3 * (x - 1),
						v.offset + (3 * x)
					);
					vue_vertices[v.offset + (x * 3)] += decal;
				}
				vue_vertices.copyWithin( v.offset + v.indice * 3, 0, 3);
				vue_vertices[v.offset + v.indice * 3 + 2] += decal / 2;
				for (let x = 1; x <= v.indice; x++)
				{
					vue_vertices.copyWithin(
						v.offset + (3 * x) + v.indice * 3,
						v.offset + 3 * (x - 1) + v.indice * 3,
						v.offset + (3 * x) + v.indice * 3
					);
					vue_vertices[v.offset  + v.indice * 3 + (x * 3)] += decal;
				}
				for (let y = 1; y < v.indice; y++)
				{
					vue_vertices.copyWithin(
						v.offset + (v.indice * 2 + 1) * 3 * y,
						v.offset + (v.indice * 2 + 1) * 3 * (y - 1),
						v.offset + (v.indice * 2 + 1) * 3 * y
					);

					for (let x = 0; x < v.indice * 2 + 1; x++)
						vue_vertices[v.offset +  (v.indice * 2 + 1) * 3 * y + x * 3 + 2] += decal;
				}
				y = v.indice;
				vue_vertices.copyWithin(
					v.offset + (v.indice * 2 + 1) * (3 * y),
					v.offset ,
					v.offset + v.indice * 3
				);
				for (let x = 0; x < v.indice ; x++)
				{
					vue_vertices[v.offset +  (v.indice * 2 + 1) * (3 * y) + x * 3 + 2] += decal * v.indice;
				}
			}
			else
			{
				v.indice *= 2;
				decal = size / v.indice;
				vue_vertices.copyWithin(v.offset, 0, 3 );
				vue_vertices[v.offset + 0] += decal / 2;
				vue_vertices[v.offset + 2] += decal / 2;
				for (let x = 1; x < v.indice; x++)
				{
					vue_vertices.copyWithin(
						v.offset + (3 * x),
						v.offset + 3 * (x - 1),
						v.offset + (3 * x)
					);
					vue_vertices[v.offset + (x * 3)] += decal;
				}
				for (let y = 1; y < v.indice; y++)
				{
					vue_vertices.copyWithin(
						v.offset +  v.indice * (3 * y),
						v.offset +  v.indice * 3 * (y - 1),
						v.offset +  v.indice * (3 * y)
					);
					for (let x = 0; x < v.indice; x++)
						vue_vertices[v.offset +  v.indice * (3 * y) + x * 3 + 2] += decal;
				}
			}
		}
	},

	generate_faces: function(info, vue_faces)
	{

	},

	init2 : function(level)
	{
		size = 1;

		info = this.get_info(level);

		last = info[info.length - 1];
		nb_v = last.v.offset + (last.v.nb * 3);
		nb_f = last.f.offset + (last.f.nb * 3);

		let vertices = new ArrayBuffer(nb_v * 4);
		let faces = new ArrayBuffer(nb_f * 4);
		let normals = new ArrayBuffer(nb_v * 4);
		let colors = new ArrayBuffer(nb_v);

		vue_vertices = new Float32Array(vertices);
		vue_faces = new Uint32Array(faces);
		vue_normals = new Float32Array(normals);
		vue_colors = new Uint8Array(colors);

		this.generate_vertices(info, vue_vertices);

		vue_faces.set([
			4, 1, 0,
			4, 2, 1,
			4, 3, 2,
			4, 0, 3
		]);

		for (let i = 0; i < vue_normals.length; i+=3)
		{
			pro = procedural(
				vue_vertices[i] + this.x,
				vue_vertices[i+2] + this.z
			);
			vue_vertices[i + 1] = pro.height;

			vue_colors[i + 0] = pro.color.r;
			vue_colors[i + 1] = pro.color.g;
			vue_colors[i + 2] = pro.color.b;
		}


		for (let i = 0; i < vue_normals.length; i+=3)
			vue_normals[i+1] =  1;

		data = {
			vertices: vue_vertices,
			faces: vue_faces,
			vertex_normals: vue_normals,
			colors: vue_colors
		};
		postMessage({ type : "chunk_refresh", position : { x : 0, z : 0 },
			data : data,
			chunk : { x : this.x, z : this.z }
		});

	},

	init : function(level)
	{
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

		this.north.createChilds(level);
		this.east.createChilds(level);
		this.south.createChilds(level);
		this.west.createChilds(level);
	},


	getBTTLod : function(hypo)
	{
		this.nb_faces = 0;

		this.north.getLod(hypo);
		this.east.getLod(hypo);
		this.south.getLod(hypo);
		this.west.getLod(hypo);
	},

	mergeVertices: function (data)
	{
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

		// Use unique set of vertices

		var diff = vertices.length - unique.length;

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

		data.faces = new_faces;
		data.colors = new_colors;
		data.vertices = new_vertices;
	},

	printLOD : function()
	{
		let nb_faces = this.north.count()
			+ this.east.count()
			+ this.south.count()
			+ this.west.count();

		let length = nb_faces * (3 * 3);
		let vertices = new Float32Array(length);
		let colors = new Uint8Array(length);


		faces = [];
		for (let i = 0; i < nb_faces * 3; i++)
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

