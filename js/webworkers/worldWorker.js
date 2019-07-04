var LEVELMAX, DISTANCE;

importScripts('chunk.js', 'btt.js','../algo/perlin.js', 'landGeometry.js', '../algo/andresCircle.js'); 

V3 = function ( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

ChunksOverseer = function(levelMax){
	this.chunks = [];
	this.position = { x : 0, z : 0 };
	LEVELMAX = levelMax;
}

ChunksOverseer.prototype = {

	initChunk : function( x, z )
	{
		if (this.chunks[x] == undefined)
			this.chunks[x] = [];
		this.chunks[x][z] = new Chunk(x,z, this.chunkSize);
	},

	linkChunk : function( x, z )
	{
		if (this.chunks[x][z + 1])
			this.chunks[x][z].bttSouth.NB = this.chunks[x][z + 1].bttNorth;
		if (this.chunks[x][z-1])
			this.chunks[x][z].bttNorth.NB = this.chunks[x][z - 1].bttSouth;
		if (this.chunks[x + 1])
			if (this.chunks[x + 1][z])
				this.chunks[x][z].bttEast.NB = this.chunks[x + 1][z].bttWest;
		if (this.chunks[x - 1])
			if (this.chunks[x - 1][z])
				this.chunks[x][z].bttWest.NB = this.chunks[x - 1][z].bttEast;



		this.chunks[x][z].bttNorth.NL = this.chunks[x][z].bttEast;
		this.chunks[x][z].bttNorth.NR = this.chunks[x][z].bttWest;

		this.chunks[x][z].bttEast.NL = this.chunks[x][z].bttSouth;
		this.chunks[x][z].bttEast.NR = this.chunks[x][z].bttNorth;

		this.chunks[x][z].bttSouth.NL = this.chunks[x][z].bttWest;
		this.chunks[x][z].bttSouth.NR = this.chunks[x][z].bttEast;

		this.chunks[x][z].bttWest.NL = this.chunks[x][z].bttNorth;
		this.chunks[x][z].bttWest.NR = this.chunks[x][z].bttSouth;

		this.chunks[x][z].bttNorth.linkNeighbor();
		this.chunks[x][z].bttEast.linkNeighbor();
		this.chunks[x][z].bttSouth.linkNeighbor();
		this.chunks[x][z].bttWest.linkNeighbor();

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

		for (let i = 0; i < list.length; i++)
			overseer.initChunk(list[i].x, list[i].y);

		for (let i = 0; i < list.length; i++)
			overseer.linkChunk(list[i].x, list[i].y);

		// PROMISE
		for (let i = 0; i < list.length; i++)
		{
			let x = list[i].x;
			let z = list[i].y;

			this.chunks[x][z].resolved = new Promise((resolve, reject) => {
				overseer.chunks[x][z].getBTTLod(list[i].hypo);
				resolve();
			})
		}

		for (let i = 0; i < list.length; i++)
		{
			let x = list[i].x;
			let z = list[i].y;

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

		/*
		this.chunks = []; // ??? what are you breaking after that ?
		this.unBreakAll();
*/
	},

	send_chunk : function(chunk)
	{
		postMessage({
			type : "LODArray",
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
		case "initOverseerParams":
			overseer = new ChunksOverseer(order.levelMax);
		break;
		case "request_chunks_list":
			overseer.position.x = order.position.x;
			overseer.position.z = order.position.z;
			overseer.get( order.list );
		break;
		case "moveOn":
			overseer.position.x = order.position.x;
			overseer.position.z = order.position.z;
			overseer.moveOn( order.position.x, order.position.z );
		break;
		default:
			console.log("ORDER ERROR");
			console.log(order);
	}
}

