function World(chunkSize, maxHeight, chunksDistance, levelMax)
{
	this.chunkSize = chunkSize;
	this.maxHeight = maxHeight;
	this.chunksDistance = chunksDistance;
	this.levelMax = levelMax;

	this.chunks = [];
	this.position = { x: 0, z: 0 };
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
					this.chunks[r.chunk.x][r.chunk.z].update(r.data);
				break;
				default:
					console.log("WORLD WORKER RESPONSE ERROR");
			}
		};

		this.ChunksWorker.onerror = function(error) {
			console.error(error);
		};

	},

	move : function( x, z )
	{
		this.position.x += x;
		this.position.z += z;

//		this.worker_init();
		this.requestChunks();
	},

	requestChunks : function()
	{
		let list = andresList(this.chunksDistance, this.position.x, this.position.z);

//		list = [{x: 0, z: 0, hypo: 0}];

		for (var i = 0; i < list.length; i++)
			this.newChunk(list[i].x, list[i].z);

		this.ChunksWorker.postMessage(
			{
				type : "request_chunks_list",
				list : list,
				position :
				{
					x : this.position.x,
					z : this.position.z
				}
			});
	},

	newChunk : function (x, z)
	{
		if (!this.chunks[x])
			this.chunks[x] = [];

		if (!this.chunks[x][z])
		{
			this.chunks[x][z] = new chunk(x, z);

			group = this.chunks[x][z].group;
			group.position.x = x ;
			group.position.z = z ;

			this.group.add(group);
		}
		else
			this.chunks[x][z].state_cube("loading");
	},

	update : function()
	{
	}
}
