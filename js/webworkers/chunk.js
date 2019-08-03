let Chunk = function(x, z, hypo, bone)
{
	this.x = x;
	this.z = z;
	this.bone = bone;
	this.info = this.bone.info;

	this.vue_vertices_x = this.bone.vue_vertices_x;
	this.vue_vertices_z = this.bone.vue_vertices_z;

	this.level = LEVELMAX;

}

Chunk.prototype = {

	init : function()
	{
		last = this.info[this.info.length - 1];
		nb_v = last.v.offset + last.v.nb;
		nb_f = last.f.offset + last.f.nb;

		let vertices_y = new ArrayBuffer(nb_v * 4);
		this.vue_vertices_y = new Float32Array(vertices_y);

		let colors = new ArrayBuffer(nb_v * 3);
		this.vue_colors = new Uint8Array(colors);

		for (let i = 0, j = 0; i < nb_v; i++, j += 3)
		{
			pro = procedural(
				this.vue_vertices_x[i] + this.x,
				this.vue_vertices_z[i] + this.z
			);

			this.vue_vertices_y[i] = pro.height;

			this.vue_colors[j + 0] = pro.color.r;
			this.vue_colors[j + 1] = pro.color.g;
			this.vue_colors[j + 2] = pro.color.b;
		}
	},

	break_faces : function(hypo)
	{
		this.vue_breaked = [];
		let breaked = new ArrayBuffer(nb_f);

		for (let l = 0; l < this.info.length; l++)
		{
			i = this.info[l];
			this.vue_breaked[l] = new Uint8Array(breaked, i.f.offset, i.f.nb);
		}

		first = this.vue_breaked[0];

		for (let i = 0; i < first.length; i++)
			first[i] = 1;


		for (let l = 1; l < this.info.length; l++)
		{
			last_i = this.info[l - 1];
			i = this.info[l];

			if (l % 2)
			{
				for (let z = 0; z < i.indice; z++)
				{
					for (let x = 0; x < i.indice; x++)
					{
						// index of real Y apex
						real = this.vue_vertices_y[i.v.offset + x + (z * i.indice)];

						dec_f_1 = x + z * i.indice;
						dec_f_1 *= 3 * 4;

						dec_f_2 = x + z * (i.indice);
						dec_f_2 *= 3 * 2;

						diag = ((x % 2) + (z % 2)) % 2;

						if (diag)
							virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]
									+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]) / 2;
						else
							virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 0]]
									+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 3]]) / 2;

						delta = Math.abs(virtual - real);

						if ( (delta * 1000) > (hypo * hypo))
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3] = 1;
							this.vue_breaked[l - 1][dec_f_2 / 3 + 1] = 1;
							// set self
							this.vue_breaked[l][dec_f_1 / 3] = 1;
							this.vue_breaked[l][dec_f_1 / 3 + 1] = 1;
							this.vue_breaked[l][dec_f_1 / 3 + 2] = 1;
							this.vue_breaked[l][dec_f_1 / 3 + 3] = 1;
						}
					}
				}
			}
			else
			{
				let ligne1 = (1 * i.indice);
				let ligne2 = (2 * i.indice) + 1;

				for (let z = 0; z < i.indice; z++)
				{
					for (let x = 0; x < i.indice; x++)
					{
						decalage = i.v.offset + x + (z * ligne2);
						dec_f_2 = x + z * i.indice;
						dec_f_2 *= 3 * 4;

						dec_f_1a = x + z * i.indice * 2;
						dec_f_1a *= 3 * 4;

						dec_f_1b = x + z * i.indice * 2 + i.indice;
						dec_f_1b *= 3 * 4;

						real1 = this.vue_vertices_y[decalage];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]) / 2;
						delta = Math.abs(virtual - real1);
						if ( (delta * 1000) > (hypo * hypo))
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3] = 1;
							// set self
							this.vue_breaked[l][dec_f_1a / 3] = 1;
							this.vue_breaked[l][dec_f_1a / 3 + 2] = 1;
						}

						real2 = this.vue_vertices_y[decalage + ligne1];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 3]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 3]]) / 2;
						delta = Math.abs(virtual - real2);
						if ( (delta * 1000) > (hypo * hypo))
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3 + 1] = 1;
							// set self
							this.vue_breaked[l][dec_f_1a / 3 + 1] = 1;
							this.vue_breaked[l][dec_f_1b / 3 + 0] = 1;
						}

						real3 = this.vue_vertices_y[decalage + ligne1 + 1];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 6]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 6]]) / 2;
						delta = Math.abs(virtual - real3);
						if ( (delta * 1000) > (hypo * hypo))
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3 + 2] = 1;
							// set self
							this.vue_breaked[l][dec_f_1a / 3 + 3] = 1;
							this.vue_breaked[l][dec_f_1b / 3 + 2] = 1;
						}

						real4 = this.vue_vertices_y[decalage + ligne2];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 9]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 9]]) / 2;

						delta = Math.abs(virtual - real4);

						if ( (delta * 1000) > (hypo * hypo))
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3 + 3] = 1;
							// set self
							this.vue_breaked[l][dec_f_1b / 3 + 3] = 1;
							this.vue_breaked[l][dec_f_1b / 3 + 1] = 1;
						}

					}
				}
			}
		}

		let nb = 0;

		for (let i = 0; i < this.vue_breaked.length; i++)
			for (let j = 0; j < this.vue_breaked[i].length; j++)
				if (this.vue_breaked[i][j])
					nb++;


		let faces = new ArrayBuffer(nb * 3 * 4);
		this.faces = new Uint32Array(faces);

		let f = 0;

		for (let l = 0; l < this.vue_breaked.length; l++)
		{
			for (let i = 0; i < this.vue_breaked[l].length; i++)
			{
				if (this.vue_breaked[l][i])
				{
					this.faces[f + 0] = this.info[l].f.data[i * 3 + 0];
					this.faces[f + 1] = this.info[l].f.data[i * 3 + 1];
					this.faces[f + 2] = this.info[l].f.data[i * 3 + 2];

					f += 3;
				}

			}
		}

console.log(nb, this.vue_breaked, this.faces);


	},

	send : function()
	{
		let vertices = new ArrayBuffer(nb_v * 3 * 4);
		this.vue_vertices = new Float32Array(vertices);

		for (let i = 0, j = 0; i < nb_v; i++, j += 3)
		{
			this.vue_vertices[j] = this.vue_vertices_x[i];
			this.vue_vertices[j + 1] = this.vue_vertices_y[i];
			this.vue_vertices[j + 2] = this.vue_vertices_z[i];
		}

		data = {
			vertices: this.vue_vertices,
			faces: this.faces,

//			vertex_normals: this.vue_normals,
			colors: this.vue_colors
		};

		postMessage({ type : "chunk_refresh", position : { x : 0, z : 0 },
			data : data,
			chunk : { x : this.x, z : this.z }
		});
	}
};
