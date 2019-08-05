let Chunk = function(x, z, hypo, bone)
{
	this.x = x;
	this.z = z;

	this.bone = bone;
	this.info = this.bone.info;

	this.vue_vertices_x = this.bone.vue_vertices_x;
	this.vue_vertices_z = this.bone.vue_vertices_z;

	this.init();
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

	send : function()
	{
		postMessage({
			type : "chunk_refresh",
			position : {
				x : 0,
				z : 0
			},
			data : {
				vertices: this.send_vertices,
				faces: this.faces,
//				vertex_normals: this.vue_normals,
				colors: this.send_colors
			},
			chunk : {
				x : this.x,
				z : this.z
			}
		});
	},

	break_face : function(l, )
	{
		last_i = this.info[l - 1];
		i = this.info[l];

		if (l % 2)
		{
			// mark 4 faces
			for (let z = 0; z < i.indice; z++)
			{
				for (let x = 0; x < i.indice; x++)
				{
					dec_f_1 = x + z * i.indice;
					dec_f_1 *= 4;

					dec_f_2 = x + z * i.indice;
					dec_f_2 *= 3 * 2;

					real = this.vue_vertices_y[i.v.offset + x + (z * i.indice)];
					virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]
						+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]) / 2;
					delta = Math.abs(virtual - real);

					if ( (delta * 1000) > hypo)
					{
						// set parents
						this.vue_breaked[l - 1][dec_f_2 / 3] = 1;
						this.vue_breaked[l - 1][dec_f_2 / 3 + 1] = 1;
						// set self
						this.vue_breaked[l][dec_f_1] = 1;
						this.vue_breaked[l][dec_f_1 + 1] = 1;
						this.vue_breaked[l][dec_f_1 + 2] = 1;
						this.vue_breaked[l][dec_f_1 + 3] = 1;
					}
				}
			}
		}
		else
		{
			// mark 8 faces

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
					dec_f_1a *= 4;

					dec_f_1b =  x + z * i.indice * 2 + i.indice;
					dec_f_1b *= 4;

					// ---------------------------------------------------------------------------------------------- //
					real1 = this.vue_vertices_y[decalage];
					virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]
						+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]) / 2;
					delta = Math.abs(virtual - real1);

					if ( (delta * 1000) > hypo)
					{
						this.vue_breaked[l - 1][dec_f_2 / 3] = 1; // set parents

						this.vue_breaked[l][dec_f_1a + 0] = 1;
						this.vue_breaked[l][dec_f_1a + 2] = 1;
					}
				}
			}
		}
	},

	break_all : function(hypo)
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

			let indice = i.indice;









			if (l % 2)
			{
				for (let z = 0; z < indice; z++)
				{
					for (let x = 0; x < indice; x++)
					{
						dec_f_1 = x + z * indice;
						dec_f_1 *= 4;

						dec_f_2 = x + z * indice;
						dec_f_2 *= 3 * 2;

						real = this.vue_vertices_y[i.v.offset + x + (z * indice)];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]) / 2;
						delta = Math.abs(virtual - real);

						if ( (delta * 1000) > hypo)
						{
							// set parents
							this.vue_breaked[l - 1][dec_f_2 / 3] = 1;
							this.vue_breaked[l - 1][dec_f_2 / 3 + 1] = 1;
							// set self
							this.vue_breaked[l][dec_f_1] = 1;
							this.vue_breaked[l][dec_f_1 + 1] = 1;
							this.vue_breaked[l][dec_f_1 + 2] = 1;
							this.vue_breaked[l][dec_f_1 + 3] = 1;
						}
					}
				}
			}
			else
			{
				let ligne1 = (1 * indice);
				let ligne2 = (2 * indice) + 1;

				for (let z = 0; z < indice; z++)
				{
					for (let x = 0; x < indice; x++)
					{
						decalage = i.v.offset + x + (z * ligne2);

						dec_f_2 = x + z * indice;
						dec_f_2 *= 3 * 4;

						dec_f_1a = x + z * indice * 2;
						dec_f_1a *= 4;

						dec_f_1b =  x + z * indice * 2 + indice;
						dec_f_1b *= 4;

// ---------------------------------------------------------------------------------------------- //
						real1 = this.vue_vertices_y[decalage];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1]]) / 2;
						delta = Math.abs(virtual - real1);

						if ( (delta * 1000) > hypo)
						{
							this.vue_breaked[l - 1][dec_f_2 / 3] = 1; // set parents

							this.vue_breaked[l][dec_f_1a + 0] = 1;
							this.vue_breaked[l][dec_f_1a + 2] = 1;
						}
// ---------------------------------------------------------------------------------------------- //

						real2 = this.vue_vertices_y[decalage + ligne1];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 3]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 3]]) / 2;
						delta = Math.abs(virtual - real2);

						if ( (delta * 1000) > hypo)
						{
							this.vue_breaked[l - 1][dec_f_2 / 3 + 1] = 1; // set parents

							this.vue_breaked[l][dec_f_1a + 1] = 1;
							this.vue_breaked[l][dec_f_1b + 0] = 1;
						}

						real3 = this.vue_vertices_y[decalage + ligne1 + 1];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 6]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 6]]) / 2;
						delta = Math.abs(virtual - real3);

						if ( (delta * 1000) > hypo)
						{
							this.vue_breaked[l - 1][dec_f_2 / 3 + 2] = 1; // set parents

							this.vue_breaked[l][dec_f_1a + 3] = 1;
							this.vue_breaked[l][dec_f_1b + 2] = 1;
						}

						real4 = this.vue_vertices_y[decalage + ligne2];
						virtual = (this.vue_vertices_y[last_i.f.data[dec_f_2 + 2 + 9]]
								+ this.vue_vertices_y[last_i.f.data[dec_f_2 + 1 + 9]]) / 2;
						delta = Math.abs(virtual - real4);

						if ( (delta * 1000) > hypo)
						{
							this.vue_breaked[l - 1][dec_f_2 / 3 + 3] = 1; // set parents

							this.vue_breaked[l][dec_f_1b + 3] = 1;
							this.vue_breaked[l][dec_f_1b + 1] = 1;
						}
					}
				}
			}
		}
	},

	realoc : function()
	{
		let new_vertice = [];
		let nb_v = 0;
		let f = 0;
		let nb_f = 0;

		for (let i = 0; i < this.vue_breaked.length; i++)
			for (let j = 0; j < this.vue_breaked[i].length; j++)
				if (this.vue_breaked[i][j])
					nb_f++;

		this.faces = new Uint32Array(nb_f * 3 );

		for (let l = 0; l < this.vue_breaked.length; l++)
		{
			let data = this.info[l].f.data;
			for (let i = 0; i < this.vue_breaked[l].length; i++)
			{
				if (this.vue_breaked[l][i])
				{
					let b = i * 3;
					if (new_vertice[data[b + 0]] == undefined)
						new_vertice[data[b + 0]] = nb_v++;
					if (new_vertice[data[b + 1]] == undefined)
						new_vertice[data[b + 1]] = nb_v++;
					if (new_vertice[data[b + 2]] == undefined)
						new_vertice[data[b + 2]] = nb_v++;
					this.faces[f + 0] = new_vertice[data[b + 0]];
					this.faces[f + 1] = new_vertice[data[b + 1]];
					this.faces[f + 2] = new_vertice[data[b + 2]];
					f += 3;
				}
			}
		}

		this.send_vertices = new Float32Array(nb_v * 3);
		this.send_colors = new Uint8Array(nb_v * 3);

		for (let i = 0; i < new_vertice.length; i++)
		{
			if (new_vertice[i] != undefined )
			{
				let pos = new_vertice[i] * 3;
				this.send_vertices[pos + 0] = this.vue_vertices_x[i];
				this.send_vertices[pos + 1] = this.vue_vertices_y[i];
				this.send_vertices[pos + 2] = this.vue_vertices_z[i];

				this.send_colors[pos + 0] = this.vue_colors[i * 3];
				this.send_colors[pos + 1] = this.vue_colors[i * 3 + 1];
				this.send_colors[pos + 2] = this.vue_colors[i * 3 + 2];
			}
		}
	}

};
