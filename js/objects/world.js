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
	this.ChunkToRefresh = [];

	cubePosition = new SelectorTool( 0x00ff00, this.chunkSize, this.maxHeight );
	Rchunk = new SelectorTool( 0xff0000, this.chunkSize, this.maxHeight );

	this.init = function()
	{
		this.group = new THREE.Group();

		scene.add(this.group);

		this.chunks = [];
		this.ChunkToRefresh = [];

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
					if(world.position.x == response.position.x && world.position.z == response.position.z)
						this.ChunkToRefresh.push(response);
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

	this.move = function( x, z )
	{
		this.position.x += x;
		this.position.z += z;

		this.ChunkToRefresh = []; // flush queued chunks

		this.requestChunks();

		cubePosition.move( this.position.x, this.position.z );

		if (this.ChunkToRefresh.length != 0)
		{
			ccl.endApp("Chunks Loaded");
			ccl.print("Current chunks load cancelled");
		}
	}


	this.update = function()
	{
		this.refreshChunk();
	}

	this.refreshChunk = function()
	{
		if (this.drawingChunk == null) // If don't currently draw a chunk
		{
			if (this.ChunkToRefresh.length != 0) // If there is chunk to draw
			{
				this.prepareChunkMesh();
			}
		}
		else if (LODArray.length != 0) // If there is more vetors to push in geometry
		{
			this.buildChunkMesh( x, z, LODArray);
		}
		else if (this.drawingChunk != null) // If there is chunk not finished
		{
			this.addChunkMesh();
			this.drawingChunk = null;
		}
	}

	this.prepareChunkMesh = function()
	{
		this.drawingChunk = this.ChunkToRefresh.shift();

		LODArray = this.drawingChunk.LODArray;

		x = this.drawingChunk.chunk.x;
		z = this.drawingChunk.chunk.z;

		Rchunk.move( x, z );

		this.geometry = new THREE.Geometry();
	}

	this.buildChunkMesh = function( x, z, LODArray)
	{
		VA = LODArray.shift();
		VL = LODArray.shift();
		VR = LODArray.shift();

		VA = new THREE.Vector3( VA.x, VA.y, VA.z);
		VL = new THREE.Vector3( VL.x, VL.y, VL.z);
		VR = new THREE.Vector3( VR.x, VR.y, VR.z);

		this.geometry.vertices.push( VL, VA, VR );
		currentFaceVertice = this.geometry.vertices.length - 3 ;
		this.geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );

		//COLORIZE
	}

	this.addChunkMesh = function()
	{
//		this.geometry.computeBoundingSphere();
		this.geometry.computeFaceNormals();

		var cols = [ {
				stop: 0,
				color: new THREE.Color(0xCCCCCC)	// WHITE
			}, {
				stop: 0.15,
				color: new THREE.Color(0x555555)	// GreyE
			}, {
				stop: .20,
				color: new THREE.Color(0x555041)	// brown
			}, {
				stop: .35,
				color: new THREE.Color(0x001500)	// dark green
			}, {
				stop: .45,
				color: new THREE.Color(0x114411)	// plain green
			}, {
				stop: .51,
				color: new THREE.Color(0x664c32)	// Sand
			}, {
				stop: .55,
				color: new THREE.Color(0x221100)	// Oceanic floor
			}, {
				stop: 1,
				color: new THREE.Color(0x000000)	// Black
			}
		];
		
/*		color1 = new THREE.Color(0xFF0000);
		color2 = new THREE.Color(0x0000FF);

		for (var i = 0; i < cols.length; i++)
		{
			cols[i].color.lerp(color1, x / 10);
			cols[i].color.lerp(color2, - (y / 10));
		}
*/
		setGradient(this.geometry, cols, 'y', true);

		mesh = new THREE.Mesh( this.geometry, mat );

		mesh.scale.set(1,this.maxHeight,1);

		mesh.position.x = ( x * this.chunkSize ) - (this.chunkSize / 2);
		mesh.position.z = ( z * this.chunkSize ) - (this.chunkSize / 2);

		//REDRAW AN EXISTING CHUNK
		if (!this.chunks[x])
			this.chunks[x] = [];
		if (this.chunks[x][z])
			this.group.remove(this.chunks[x][z]);
		this.chunks[x][z] = mesh;

		//WATER

		var geometry = new THREE.PlaneGeometry( this.chunkSize, this.chunkSize );
		var water = new THREE.Mesh( geometry, waterMaterial );
		water.rotation.x = deg(-90);
		water.position.x = (this.chunkSize / 2);
		water.position.z = (this.chunkSize / 2);
		mesh.add( water );

		//CCL
		this.chunkWaited--;
		chunkMax = getAndresLenght(this.chunksDistance, 0, 0, true);
		ccl.load("Chunks Loaded", chunkMax-this.chunkWaited, chunkMax);

		this.group.add(mesh);
	}

	this.flushChunks = function( x, z )
	{
		if (this.chunks[x])
		{
			if (this.chunks[x][z])
			{
				console.log("flush", x, z);
				this.group.remove(this.chunks[x][z]);
				this.chunks[x][z] = undefined;
			}
		}
	}

	this.reload = function()
	{
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
}

