function World(chunkSize, maxHeight, chunksDistance, levelMax)
{
	this.chunkSize = chunkSize;
	this.maxHeight = maxHeight;

	this.chunksDistance = chunksDistance;
	this.levelMax = levelMax;

	this.chunks = [];

	this.position = {};
	this.position.x = 0;
	this.position.z = 0;

	this.chunkWaited = 0;
	this.drawingChunk = null;

	cubePosition = new SelectorTool( 0x00ff00, this.chunkSize, this.maxHeight );
	Rchunk = new SelectorTool( 0xff0000, this.chunkSize, this.maxHeight );

	this.init = function()
	{
		this.group = new THREE.Group();

		scene.add(this.group);

		this.chunks = [];

		this.ChunksWorker = new Worker("js/webworkers/worldWorker.js");

		this.ChunksWorker.postMessage({
			type : "initOverseerParams",
			chunkSize : this.chunkSize,
			chunksDistance : this.chunksDistance,
			levelMax : this.levelMax
		});

		this.ChunksWorker.onmessage = (e) => {
			response = e.data;
			switch(response.type) {
				case "LODArray" :
					this.newChunk(response);
				break;
				case "flushChunks" :
					console.log("flush");
					world.flushChunks(response.x, response.z);
				break;
				default:
					console.log("WORLD WORKER RESPONSE ERROR");
			}
		};
	}

	this.newChunk = function(r)
	{
		let x = r.chunk.x;
		let z = r.chunk.z;

		Rchunk.move(x, z);

		c = new chunk(x, z);

		c.insertVertices(r.data.vertices, r.data.colors);
		this.COUNT += r.data.vertices.length / 3 / 3;
		console.log(this.COUNT);
		c.buildChunkMesh();

		c.group.position.x = ( x * this.chunkSize );
		c.group.position.z = ( z * this.chunkSize );

		c.group.scale.set(this.chunkSize, this.maxHeight, this.chunkSize);

		this.group.add(c.group);
	}

	this.reload = function()
	{
this.COUNT = 0;
		this.ChunksWorker.terminate();
		scene.remove(this.group);

		this.position.x = 0;
		this.position.z = 0;

		this.init();
		world.requestChunks();

		scene.remove(cubePosition.mesh);
		scene.remove(Rchunk.mesh);
		cubePosition = new SelectorTool( 0x00ff00, this.chunkSize, this.maxHeight );
		Rchunk = new SelectorTool( 0xff0000, this.chunkSize, this.maxHeight );
	}



	this.move = function( x, z )
	{
		scene.remove(this.group);
		this.group = new THREE.Group();
		scene.add(this.group);
		this.position.x += x;
		this.position.z += z;

		this.requestChunks();

		cubePosition.move( this.position.x, this.position.z );
/*
	ccl.endApp("Chunks Loaded");
	ccl.print("Current chunks load cancelled");
*/
	}

	this.requestChunks = function()
	{
		var newChunkList = andresList(this.chunksDistance, this.position.x, this.position.z);
		this.chunkWaited = newChunkList.length;

		this.ChunksWorker.postMessage(
			{
				type : "request_chunks_list",
				list : newChunkList,
				position :
				{
					x : this.position.x,
					z : this.position.z
				}
			});
	}

	this.update = function()
	{
	}

}

