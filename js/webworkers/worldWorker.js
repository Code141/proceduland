var LEVELMAX, DISTANCE;

importScripts('chunk.js', 'btt.js','../algo/perlin.js', 'landGeometry.js', '../algo/andresCircle.js'); 

V3 = function ( x, y, z )
{
	this.x = x;
	this.y = y;
	this.z = z;
}


ChunksOverseer = function(levelMax){
	this.chunks = [];
	this.position = { x : 0, z : 0 };
	LEVELMAX = levelMax;
}

ChunksOverseer.prototype = {

	initChunk : function( x, z, hypo)
	{
		if (this.chunks[x] == undefined)
			this.chunks[x] = [];
		this.chunks[x][z] = new Chunk(x,z, hypo);

	},

	linkChunk : function( x, z )
	{
		if (this.chunks[x][z + 1])
			this.chunks[x][z].south.NB = this.chunks[x][z + 1].north;

		if (this.chunks[x][z-1])
			this.chunks[x][z].north.NB = this.chunks[x][z - 1].south;

		if (this.chunks[x + 1] && this.chunks[x + 1][z])
			this.chunks[x][z].east.NB = this.chunks[x + 1][z].west;

		if (this.chunks[x - 1] && this.chunks[x - 1][z])
			this.chunks[x][z].west.NB = this.chunks[x - 1][z].east;

		this.chunks[x][z].north.linkNeighbor();
		this.chunks[x][z].east.linkNeighbor();
		this.chunks[x][z].south.linkNeighbor();
		this.chunks[x][z].west.linkNeighbor();
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
			overseer.initChunk(list[i].x, list[i].z, list[i].hypo);
		var t1 = performance.now();
		console.log("INIT " + i + " chunks in " + (t1 - t0) + " ms")


/*		var t0 = performance.now();
		for (i = 0; i < list.length; i++)
			overseer.linkChunk(list[i].x, list[i].z);
		var t1 = performance.now();
		console.log("LINKED in " + (t1 - t0) + " ms")
*/
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
//						this.chunks[x][z] = undefined;

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

