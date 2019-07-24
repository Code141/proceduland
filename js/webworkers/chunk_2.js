let Chunk_2 = function(x, z, hypo)
{
	this.x = x;
	this.z = z;
	this.LODArray = [];

		var t0 = performance.now();
	this.init(LEVELMAX - hypo / 2);

		var t1 = performance.now();
		console.log("LINKED in " + (t1 - t0) + " ms")
}

Chunk_2.prototype = {

	get_info: function (level)
	{
		if (level > 24)
			throw "error level max is 24"
		level = (level < 1) ? 1: level;

		let info = [];
		let i = 1;
		let v2 = 1;

		info.push({
			indice: 1,
			v : { nb: 4, offset: 0, },
			f : { nb: 2, offset: 0, }
		});

		info.push({
			indice: 1,
			v : { nb: 1, offset: 4, },
			f : { nb: 4, offset: 2, }
		});

		for (let l = 0; l < level - 1; l++)
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

			last = info[l + 1];

			info.push({
				indice: i / 2,
				v : {
					nb: v,
					offset: last.v.offset + last.v.nb
				},
				f : {
					nb: last.f.nb * 2,
					offset: last.f.offset + last.f.nb,
				}
			}
			);
		}
		return info;
	},


	init : function(level)
	{

		info = this.get_info(level);
		last = info[info.length - 1];
		nb_v = last.v.offset + last.v.nb;
		nb_f = last.f.offset + last.f.nb;

		let vertices = new ArrayBuffer(nb_v * 3 * 4);
		let faces = new ArrayBuffer(nb_f * 3 * 4);
		let normals = new ArrayBuffer(nb_v * 3 * 4);
		let colors = new ArrayBuffer(nb_v);

		vue_vertices = new Float32Array(vertices);
		vue_faces = new Uint32Array(faces);
		vue_normals = new Float32Array(normals);
		vue_colors = new Uint8Array(colors);

		for (let l = 0; l < info.length; l++)
		{
			i = info[l];
			i.v.data = new Float32Array(vertices, i.v.offset * 3 * 4, i.v.nb * 3);
			i.f.data = new Uint32Array(faces, i.f.offset * 3 * 4, i.f.nb * 3);
		}

		size = 1;

		vue_vertices.set([
			0, 0, 0,
			size, 0, 0,
			0, 0,  size,
			size, 0,  size,
		]);

		vue_faces.set([0, 2, 1, 3, 1, 2]);
//		vue_faces.set([1, 0, 3, 2, 3, 0]);

		this.generateLevel(info);


		/*
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
		 */

		for (let i = 0; i < vue_normals.length; i+=3)
			vue_normals[i+1] =  1;

		console.log(info);
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

	generateVertices_1: function(l, i)
	{
		indice = Math.pow(2, ((l + 1) / 2)) / 2;
		for (let z = 0; z < indice; z++)
		{
			for (let x = 0; x < indice; x++)
			{
				decal = size / (indice * 2);
				decalage = x + (z * indice);
				i.v.data[0 + (decalage * 3)] = 0 + decal + (decal * x * 2);
				i.v.data[1 + (decalage * 3)] = l / 2;
				i.v.data[2 + (decalage * 3)] = 0 + decal + (decal * z * 2);

				dec_f_1 = x + z * indice;
				dec_f_1 *= 3 * 4;

				dec_f_2 = (x + z * (indice)) / 2;
				dec_f_2 *= 3 * 4;

				diag = x % 2 + (z + 1) % 2;
				diag = ((x % 2) + (z % 2)) % 2;
				console.log("L", l, "X", x, "Z", z, "dec1", dec_f_1,  "dec2", dec_f_2, "diag", diag, "indice", indice);

				if (!diag)
				{
					i.f.data[dec_f_1 + 0] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 2];
					i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 0];

					i.f.data[dec_f_1 + 3] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 0];
					i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 1];

					i.f.data[dec_f_1 + 6] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 3];
					i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 4];

					i.f.data[dec_f_1 + 9] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 5];
					i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 3];
				}
				else
				{
					i.f.data[dec_f_1 + 0] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 0];
					i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 1];

					i.f.data[dec_f_1 + 3] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 2];
					i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 0];

					i.f.data[dec_f_1 + 6] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 5];
					i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 3];

					i.f.data[dec_f_1 + 9] = i.v.offset + decalage;
					i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 3];
					i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 4];
				}
			}
		}
	},

	generateVertices_2: function(l, i)
	{
		indice = Math.pow(2, l / 2);
		decal = size / (indice);

		for (let z = 0; z < indice + 1; z++)
		{
			decalage = (z * indice / 2) + Math.floor(z / 2);
			if (z % 2)
			{
				for (let x = 0; x < indice / 2 + 1; x++)
				{
					i.v.data[0 + (decalage + x) * 3] = 2 * decal * x;
					i.v.data[2 + (decalage + x) * 3] = decal * z;
					i.v.data[1 + (decalage + x) * 3] = l / 2;
				}
			}
			else
			{
				for (let x = 0; x < indice / 2; x++)
				{
					i.v.data[0 + (decalage + x) * 3] = 2 * decal * x + decal;
					i.v.data[2 + (decalage + x) * 3] = decal * z;
					i.v.data[1 + (decalage + x) * 3] = l / 2;
				}
			}
		}

		for (let z = 0; z < indice / 2; z++)
		{
			for (let x = 0; x < indice / 2; x++)
			{

				ligne1 = ((z + 1) * indice / 2) + Math.floor((z + 1) / 2);
				ligne2 = ((z + 2) * indice / 2) + Math.floor((z + 2) / 2);

				dec_f_1 = x + z * indice;
				dec_f_1 *= 3 * 8;

				dec_f_2 = x + z * indice;
				dec_f_2 *= 3 * 2;

				// North right
				i.f.data[dec_f_1 + 0] = i.v.offset;
				i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 2];
				i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 0];

				// West left
				i.f.data[dec_f_1 + 3] = i.v.offset + ligne1;
				i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 0 + 3];
				i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 1 + 3];


				// North left
				i.f.data[dec_f_1 + 6] = i.v.offset;
				i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 0];
				i.f.data[dec_f_1 + 8] = last_i.f.data[1];

				// East right
				i.f.data[dec_f_1 + 9] = i.v.offset + ligne1 + 1;
				i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 2 + 6];
				i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 0 + 6];


				// West right
				i.f.data[dec_f_1 + 12] = i.v.offset + ligne1;
				i.f.data[dec_f_1 + 13] = last_i.f.data[dec_f_2 + 2 + 3];
				i.f.data[dec_f_1 + 14] = last_i.f.data[dec_f_2 + 0 + 3];

				// South left
				i.f.data[dec_f_1 + 15] = i.v.offset + ligne2;
				i.f.data[dec_f_1 + 16] = last_i.f.data[dec_f_2 + 0 + 9];
				i.f.data[dec_f_1 + 17] = last_i.f.data[dec_f_2 + 1 + 9];


				// East left
				i.f.data[dec_f_1 + 18] = i.v.offset + ligne1 + 1;
				i.f.data[dec_f_1 + 19] = last_i.f.data[dec_f_2 + 0 + 6];
				i.f.data[dec_f_1 + 20] = last_i.f.data[dec_f_2 + 1 + 6];

				// South right
				i.f.data[dec_f_1 + 21] = i.v.offset + ligne2;
				i.f.data[dec_f_1 + 22] = last_i.f.data[dec_f_2 + 2 + 9];
				i.f.data[dec_f_1 + 23] = last_i.f.data[dec_f_2 + 0 + 9];

//				console.log(l, x, z, i, indice);
			}
		}

	},

	generateLevel: function(info)
	{
		for (let l = 1; l < info.length; l++)
		{
			last_i = info[l - 1];
			i = info[l];
			if (l % 2)
				this.generateVertices_1(l, i);
			else
				this.generateVertices_2(l, i);

		}
	}

};
