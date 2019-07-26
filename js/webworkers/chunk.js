let Chunk = function(x, z, hypo, bone)
{
	this.x = x;
	this.z = z;
	this.bone = bone;

	this.vue_vertices_x = this.bone.vue_vertices_x;
	this.vue_vertices_z = this.bone.vue_vertices_z;

	this.level = LEVELMAX;

	this.init();
}

Chunk.prototype = {

	init : function()
	{
		last = this.bone.info[this.bone.info.length - 1];
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







		let breaked = new ArrayBuffer(nb_f * 4);
		this.vue_breaked = new Uint32Array(breaked);


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
			faces: this.bone.info[this.level].f.data,
//			vertex_normals: this.vue_normals,
			colors: this.vue_colors
		};

		postMessage({ type : "chunk_refresh", position : { x : 0, z : 0 },
			data : data,
			chunk : { x : this.x, z : this.z }
		});
	},
};
