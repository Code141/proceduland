let Bone = function(level)
{
	this.info = this.get_info(level);
	last = this.info[this.info.length - 1];
	nb_v = last.v.offset + last.v.nb;
	nb_f = last.f.offset + last.f.nb;

	let vertices_x = new ArrayBuffer(nb_v * 4);
	let vertices_z = new ArrayBuffer(nb_v * 4);

	let faces = new ArrayBuffer(nb_f * 3 * 4);

	this.vue_vertices_x = new Float32Array(vertices_x);
	this.vue_vertices_z = new Float32Array(vertices_z);

	this.vue_faces = new Uint32Array(faces);



	for (let l = 0; l < this.info.length; l++)
	{
		i = this.info[l];

		i.v.data_x = new Float32Array(vertices_x, i.v.offset * 4, i.v.nb);
		i.v.data_z = new Float32Array(vertices_z, i.v.offset * 4, i.v.nb);

		i.f.data = new Uint32Array(faces, i.f.offset * 3 * 4, i.f.nb * 3);
	}

	size = 1;

	this.vue_vertices_x.set([ 0, size, 0, size]);
	this.vue_vertices_z.set([ 0, 0, size, size]);


//	vue_faces.set([0, 2, 1, 3, 1, 2]);
	this.vue_faces.set([1, 0, 3, 2, 3, 0]);

	this.generateLevel(this.info);

}

Bone.prototype = {

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
				indice = Math.pow(2, (l / 2));
				v1 = i * (i + 1) * 2;
				v = v1;
				i *= 2;

			}
			else
			{
				indice = Math.pow(2, ((l + 1) / 2));
				v2 *= 4;
				v = v2;
			}

			last = info[l + 1];

			info.push({
				indice: indice,
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

			if (l % 2)
				this.generateFace_1(l, i);
			else
				this.generateFace_2(l, i);
		}
	},

	generateVertices_1: function(l, i)
	{
		let decal = size / (i.indice * 2);
		let decal_2 = decal * 2;

		for (let z = 0; z < i.indice; z++)
		{	
			let ligne_height = decal + (decal_2 * z);
			let decalage = (z * i.indice);
			for (let x = 0; x < i.indice; x++)
			{
				i.v.data_x[decalage + x] = decal + (decal_2 * x);
				i.v.data_z[decalage + x] = ligne_height;
			}
		}
	},

	generateVertices_2: function(l, i)
	{
		let decal = size / (i.indice * 2);
		let decal_2 = decal * 2;

		for (let z = 0; z < i.indice * 2 + 1; z++)
		{
			let decalage = (z * i.indice) + Math.floor(z / 2);
			let ligne_height = decal * z;
			if (z % 2)
			{
				for (let x = 0; x < i.indice + 1; x++)
				{
					i.v.data_x[decalage + x] = decal_2 * x;
					i.v.data_z[decalage + x] = ligne_height;
				}
			}
			else
			{
				for (let x = 0; x < i.indice; x++)
				{
					i.v.data_x[decalage + x] = decal_2 * x + decal;
					i.v.data_z[decalage + x] = ligne_height;
				}
			}
		}
	},

	generateFace_1: function(l, i)
	{
		for (let z = 0; z < i.indice; z++)
		{
			for (let x = 0; x < i.indice; x++)
			{
				apex = i.v.offset + x + (z * i.indice);

				dec_f_1 = x + z * i.indice;
				dec_f_1 *= 3 * 4;

				dec_f_2 = x + z * (i.indice);
				dec_f_2 *= 3 * 2;

				diag = ((x % 2) + (z % 2)) % 2;

				if (diag)
				{
					i.f.data[dec_f_1 + 0] = apex;
					i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 2];
					i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 0];

					i.f.data[dec_f_1 + 3] = apex;
					i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 0];
					i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 1];

					i.f.data[dec_f_1 + 6] = apex;
					i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 3];
					i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 4];

					i.f.data[dec_f_1 + 9] = apex;
					i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 5];
					i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 3];
				}
				else
				{
					i.f.data[dec_f_1 + 0] = apex;
					i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 0];
					i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 1];

					i.f.data[dec_f_1 + 3] = apex;
					i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 5];
					i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 3];

					i.f.data[dec_f_1 + 6] = apex;
					i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 2];
					i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 0];

					i.f.data[dec_f_1 + 9] = apex;
					i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 3];
					i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 4];
				}
			}
		}
	},

	generateFace_2: function(l, i)
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

				dec_f_1 = x + z * i.indice * 2;
				dec_f_1 *= 3 * 4;

				// North right
				i.f.data[dec_f_1 + 0] = decalage;
				i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 2];
				i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 0];
				// West left
				i.f.data[dec_f_1 + 3] = decalage + ligne1;
				i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 0 + 3];
				i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 1 + 3];
				// North left
				i.f.data[dec_f_1 + 6] = decalage;
				i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 0];
				i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 1];

				// East right
				i.f.data[dec_f_1 + 9] = decalage + ligne1 + 1;
				i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 2 + 6];
				i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 0 + 6];

				dec_f_1 = x + z * i.indice * 2 + i.indice;
				dec_f_1 *= 3 * 4;

				// West right
				i.f.data[dec_f_1 + 0] = decalage + ligne1;
				i.f.data[dec_f_1 + 1] = last_i.f.data[dec_f_2 + 2 + 3];
				i.f.data[dec_f_1 + 2] = last_i.f.data[dec_f_2 + 0 + 3];
				// South left
				i.f.data[dec_f_1 + 3] = decalage + ligne2;
				i.f.data[dec_f_1 + 4] = last_i.f.data[dec_f_2 + 0 + 9];
				i.f.data[dec_f_1 + 5] = last_i.f.data[dec_f_2 + 1 + 9];
				// East left
				i.f.data[dec_f_1 + 6] = decalage + ligne1 + 1;
				i.f.data[dec_f_1 + 7] = last_i.f.data[dec_f_2 + 0 + 6];
				i.f.data[dec_f_1 + 8] = last_i.f.data[dec_f_2 + 1 + 6];
				// South right
				i.f.data[dec_f_1 + 9] = decalage + ligne2;
				i.f.data[dec_f_1 + 10] = last_i.f.data[dec_f_2 + 2 + 9];
				i.f.data[dec_f_1 + 11] = last_i.f.data[dec_f_2 + 0 + 9];
			}
		}
	}
}
