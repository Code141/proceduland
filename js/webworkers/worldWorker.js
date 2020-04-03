importScripts(
	'bone.js',
	'chunk.js',
	'../algo/perlin.js',
	'landGeometry.js',
	'../algo/andresCircle.js'
);

ChunksOverseer = function(levelMax){
	this.chunks = [];
	this.position = { x : 0, z : 0 };
	this.levelMax = levelMax;
	this.bone = new Bone(levelMax);
}

ChunksOverseer.prototype = {

	initChunk : function(x, z, hypo)
	{
		if (this.chunks[x] == undefined)
			this.chunks[x] = [];
		if (this.chunks[x][z] == undefined)
			this.chunks[x][z] = new Chunk(x, z, hypo, this.bone);
	},

	does_neighbour_resolved : function(x, z)
	{
		promises = [];

		if (this.chunks[x - 1])
		{
			if (this.chunks[x - 1][z - 1])
				promises.push(this.chunks[x - 1][z - 1].resolved);
			if (this.chunks[x - 1][z])
				promises.push(this.chunks[x - 1][z].resolved);
			if (this.chunks[x - 1][z + 1])
				promises.push(this.chunks[x - 1][z + 1].resolved);
		}

		if (this.chunks[x][z - 1])
			promises.push(this.chunks[x][z - 1].resolved);
		if (this.chunks[x][z + 1])
			promises.push(this.chunks[x][z + 1].resolved);

		if (this.chunks[x + 1])
		{
			if (this.chunks[x + 1][z - 1])
				promises.push(this.chunks[x + 1][z - 1].resolved);
			if (this.chunks[x + 1][z])
				promises.push(this.chunks[x + 1][z].resolved);
			if (this.chunks[x + 1][z + 1])
				promises.push(this.chunks[x + 1][z + 1].resolved);
		}

		return (promises);
	},

	get : function(list)
	{
		let i;
		var t0 = performance.now();
		for (i = 0; i < list.length; i++)
		{
			let x = list[i].x;
			let z = list[i].z;
			let hypo = list[i].hypo;
			let level = Math.floor(this.levelMax - hypo / 2);

var t0 = performance.now();

			overseer.initChunk(x, z, list[i].hypo);

var t1 = performance.now();

			this.chunks[x][z].break_all(hypo, level);

var t2 = performance.now();

			this.chunks[x][z].clean(level);

var t3 = performance.now();

			this.chunks[x][z].realoc();

var t4 = performance.now();

			this.chunks[x][z].send();

var t5 = performance.now();
			console.log(
				"x", x,
				"z", z,
				"	nb", i,
				"		L", level,
				"		INIT", (t1 - t0),
				"\nBREAK", (t2 - t1),
				"	CLEAN", (t3 - t2),
				"	REALOC", (t4 - t3),
				"	SEND", (t5 - t4),
				"\nTOTAL", (t5 - t0), "ms"
			);
		}

		var t1 = performance.now();
		console.log("INIT " + i + " chunks in " + (t1 - t0) + " ms")

		// PROMISE
		for (let i = 0; i < list.length; i++)
		{
			let x = list[i].x;
			let z = list[i].z;
			this.chunks[x][z].resolved = new Promise((resolve, reject) => {
				overseer.chunks[x][z].getBTTLod(list[i].hypo);
				resolve();
			})
		}
		for (let i = 0; i < list.length; i++)
		{
			let x = list[i].x;
			let z = list[i].z;
			this.chunks[x][z].resolved.then(() => {
				pro = overseer.does_neighbour_resolved(x, z);
				Promise.all(pro)
					.then(() => {
						overseer.send_chunk(overseer.chunks[x][z]);
						this.chunks[x][z] = undefined;
					})
				.catch(error => console.log(`Error in promises ${error}`))
			})
		}

	},

	send_chunk : function(chunk)
	{
		postMessage({
			type : "chunk_refresh",
			position : {
				x : this.position.x,
				z : this.position.z
			},
			data : chunk.printLOD(),
			chunk : {
				x : chunk.x,
				z : chunk.z
			}
		});
	},

	unBreakAll : function()
	{
		for (var x in this.chunks)
			for (var z in this.chunks[x])
				this.chunks[x][z].unbreakChunk();
	}
}

onmessage = function(e) {
	order = e.data;

	switch(order.type)
	{
		case "init":
			overseer = new ChunksOverseer(order.levelMax);
		break;
		case "request_chunks_list":
			overseer.position.x = order.position.x;
			overseer.position.z = order.position.z;
			overseer.get(order.list);
		break;
		default:
			console.log("ORDER ERROR");
			console.log(order);
	}
}

