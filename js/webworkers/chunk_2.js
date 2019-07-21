let Chunk_2 = function(x, z, hypo)
{
	this.x = x;
	this.z = z;
	this.LODArray = [];

	this.init(LEVELMAX - hypo / 2);
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
	
	generateLevel: function(info)
	{
		for (let l = 1; l < info.length; l++)
		{
			last_i = info[l - 1];

			i = info[l];
			if (l % 2 == 0)
			{
				indice = Math.pow(2, ((l) / 2)) / 2;
				for (let z = 0; z < indice; z++)
				{
					for (let x = 0; x < indice; x++)
					{

						decal = size / (indice * 2);

						decalage = x + (z * indice);
						pos_x = last_i.v.data[0 + decalage * 3];
						pos_z = last_i.v.data[2 + decalage * 3];

						if (x == 0 && z == 0)
						{
							i.v.data[0] = pos_x - decal;
							i.v.data[2] = pos_z;
							i.v.data[3] = pos_x;
							i.v.data[5] = pos_z - decal;
							i.v.data[6] = pos_x + decal;
							i.v.data[8] = pos_z;
							i.v.data[9] = pos_x;
							i.v.data[11] = pos_z + decal;
						}
						else if (z == 0)
						{
							decalage2 = x * 3 + 1;

							decalage2 *= 3;

							i.v.data[0 + decalage2] = pos_x;
							i.v.data[2 + decalage2] = pos_z - decal;

							i.v.data[3 + decalage2] = pos_x + decal;
							i.v.data[5 + decalage2] = pos_z;

							i.v.data[6 + decalage2] = pos_x;
							i.v.data[8 + decalage2] = pos_z + decal;

						}
						else if (x == 0)
						{
							decalage2 = indice * 3 + 1;

							decalage2 += (indice * 2 + 1 ) * (z - 1);

							decalage2 *= 3;

							i.v.data[0 + decalage2] = pos_x - decal;
							i.v.data[2 + decalage2] = pos_z;

							i.v.data[3 + decalage2] = pos_x + decal;
							i.v.data[5 + decalage2] = pos_z;

							i.v.data[6 + decalage2] = pos_x;
							i.v.data[8 + decalage2] = pos_z + decal;

						}
						else
						{

							decalage2 = indice * 3 + 1;

							decalage2 += (indice * 2 + 1 ) * (z - 1) + x * 2 + 1;

							decalage2 *= 3;

							i.v.data[0 + decalage2] = pos_x + decal;
							i.v.data[2 + decalage2] = pos_z;
							i.v.data[3 + decalage2] = pos_x;
							i.v.data[5 + decalage2] = pos_z + decal;

		
						}




/*						i.f.data[0] = i.v.offset + 1;
						i.f.data[1] = last_i.f.data[0];
						i.f.data[2] = last_i.f.data[1];

						i.f.data[3] = i.v.offset + 1;
						i.f.data[4] = last_i.f.data[2];
						i.f.data[5] = last_i.f.data[0];

						i.f.data[6] = i.v.offset + 0;
						i.f.data[7] = last_i.f.data[3];
						i.f.data[8] = last_i.f.data[4];

						i.f.data[9] = i.v.offset + 0;
						i.f.data[10] = last_i.f.data[5];
						i.f.data[11] = last_i.f.data[3];

						i.f.data[12] = i.v.offset + 2;
						i.f.data[13] = last_i.f.data[6];
						i.f.data[14] = last_i.f.data[7];

						i.f.data[15] = i.v.offset + 2;
						i.f.data[16] = last_i.f.data[8];
						i.f.data[17] = last_i.f.data[6];

						i.f.data[18] = i.v.offset;
						i.f.data[19] = last_i.f.data[9];
						i.f.data[20] = last_i.f.data[10];

						i.f.data[21] = i.v.offset;
						i.f.data[22] = last_i.f.data[11];
						i.f.data[23] = last_i.f.data[9];
*/
						
							i.v.data[1 + (decalage * 12)] = l / 2;
							i.v.data[4 + (decalage * 12)] = l / 2;
							i.v.data[7 + (decalage * 12)] = l / 2;
							i.v.data[10 + (decalage * 12)] = l / 2;
						 
					}
				}
			}
			else
			{
				indice = Math.pow(2, ((l + 1) / 2)) / 2;

console.log(indice);

				for (let z = 0; z < indice; z++)
				{
					for (let x = 0; x < indice; x++)
					{
//						console.log("L", l, "X", x, "Z", z, indice, i);
						decal = size / (indice * 2);
						decalage = x + (z * indice);

						i.v.data[0 + (decalage * 3)] = 0 + decal + (decal * x * 2);
						i.v.data[2 + (decalage * 3)] = 0 + decal + (decal * z * 2);


						i.f.data[0] = i.v.offset + decalage;
						i.f.data[1] = last_i.f.data[2];
						i.f.data[2] = last_i.f.data[0];

						i.f.data[3] = i.v.offset + decalage;
						i.f.data[4] = last_i.f.data[0];
						i.f.data[5] = last_i.f.data[1];

						i.f.data[6] = i.v.offset + decalage;
						i.f.data[7] = last_i.f.data[3];
						i.f.data[8] = last_i.f.data[4];

						i.f.data[9] = i.v.offset + decalage;
						i.f.data[10] = last_i.f.data[5];
						i.f.data[11] = last_i.f.data[3];


						i.v.data[1 + (decalage * 3)] = (l / 2);
					}
				}
			}
		}
	}


};

