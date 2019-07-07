function World(chunkSize, maxHeight, chunksDistance, levelMax)
{
	this.chunkSize = chunkSize;
	this.maxHeight = maxHeight;
	this.chunksDistance = chunksDistance;
	this.levelMax = levelMax;

	this.chunks = [];
	this.position = { x: 0, z: 0 };

	this.chunkWaited = 0;

	this.group = new THREE.Group();
	this.group.scale.set(this.chunkSize, this.maxHeight, this.chunkSize);

	this.worker_init();
}

World.prototype = {

	worker_init : function()
	{
		this.nb_vertices = 0;

		if (this.ChunksWorker)
			this.ChunksWorker.terminate();

		this.ChunksWorker = new Worker("js/webworkers/worldWorker.js");

		this.ChunksWorker.postMessage({
			type : "init",
			chunkSize : this.chunkSize,
			chunksDistance : this.chunksDistance,
			levelMax : this.levelMax
		});

		this.ChunksWorker.onmessage = (e) => {
			r = e.data;
			switch(r.type) {
				case "chunk_refresh" :
					this.chunks[r.chunk.x][r.chunk.z].update(
						r.data.vertices,
						r.data.faces,
						r.data.colors
					);
					this.nb_vertices += r.data.vertices.length;
					console.log(this.nb_vertices);
				break;
				default:
					console.log("WORLD WORKER RESPONSE ERROR");
			}
		};
	},

	move : function( x, z )
	{
		this.position.x += x;
		this.position.z += z;

		this.worker_init();

		this.requestChunks();
	},

	requestChunks : function()
	{
		let list = andresList(this.chunksDistance, this.position.x, this.position.z);
		this.chunkWaited = list.length;
		for (var i = 0; i < this.chunkWaited; i++)
		{
			this.newChunk(list[i].x, list[i].z);
			this.ChunksWorker.postMessage(
				{
					type : "request_chunks_list",
					list : [ list[i] ],
					position :
					{
						x : this.position.x,
						z : this.position.z
					}
				});
		}
	},

	newChunk : function (x, z)
	{
		if (!this.chunks[x])
			this.chunks[x] = [];

		if (!this.chunks[x][z])
		{
			this.chunks[x][z] = new chunk(x, z);
			this.chunks[x][z].group.position.x = x;
			this.chunks[x][z].group.position.z = z;
			this.group.add(this.chunks[x][z].group);
		}
		else
			this.chunks[x][z].state_cube("loading");
	},

	update : function()
	{
	}
}


