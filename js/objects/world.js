function World(){
	this.chunkSize = 500;
	this.maxHeight = 500;

	this.chunksDistance = 5;
	this.levelMax = 5;

	this.chunks = [];

	this.position = {};
	this.position.x = 0;
	this.position.z = 0;

	this.chunkWaited = 0;

	this.drawingChunk = null;
	ChunkToRefresh = [];


	cubePosition = new SelectorTool( 0x00ff00, this.chunkSize, this.maxHeight );
	Rchunk = new SelectorTool( 0xff0000, this.chunkSize, this.maxHeight );


	this.init = function(){

		this.group = new THREE.Group();
		scene.add(this.group);

		this.chunks = [];
		ChunkToRefresh = [];

		this.ChunksWorker = new Worker("js/webworkers/worldWorker.js");

		this.ChunksWorker.postMessage({
			type : "initOverseerParams",
			chunkSize : this.chunkSize,
			chunksDistance : this.chunksDistance,
			levelMax : this.levelMax
		});

		this.ChunksWorker.onmessage = function(e) {
			response = e.data;
			switch(response.type) {
				case "LODArray" :
				if(world.position.x == response.position.x && world.position.z == response.position.z){
					ChunkToRefresh.push(response);
				}
				break;

				case "flushChunks" :
						console.log("flush");

				world.flushChunks(response.x, response.z);
				break;

				default:
				console.log("RESPONSE ERROR");
			}

		};

	}

	this.buildChunks = function(){
		this.ChunksWorker.postMessage({
			type : "moveOn",
			position : { 
				x : this.position.x,
				z : this.position.z
			}
		});

		this.chunkWaited = getAndresLenght(this.chunksDistance, 0, 0, true);
	}


	this.move = function( x, z ){
		
		this.position.x += x;
		this.position.z += z;

		ChunkToRefresh = []; // flush queued chunks

		this.buildChunks();

		cubePosition.move( this.position.x, this.position.z );

		if(ChunkToRefresh.length != 0){
			ccl.endApp("Chunks Loaded");
			ccl.print("Current chunks load cancelled");
		}

	}


	this.update = function(){

			this.refreshChunk();

	}

	this.refreshChunk = function(){


		if(this.drawingChunk == null){ // If don't currently draw a chunk

			if(ChunkToRefresh.length != 0){ // If there is chunk to draw
				this.prepareChunkMesh();
			}

		}else if(LODArray.length != 0){ // If there is more vetors to push in geometry

			this.buildChunkMesh( x, z, LODArray);
		
		}else if(this.drawingChunk != null){ // If there is chunk not finished
			this.addChunkMesh();
			this.drawingChunk = null;
		}

	}

	this.prepareChunkMesh = function(){

		this.drawingChunk = ChunkToRefresh.shift();

		LODArray = this.drawingChunk.LODArray;

		x = this.drawingChunk.chunk.x;
		z = this.drawingChunk.chunk.z;

		Rchunk.move( x, z );

		this.geometry = new THREE.Geometry();

	}

	this.buildChunkMesh = function( x, z, LODArray){

		VA = LODArray.shift();
		VL = LODArray.shift();
		VR = LODArray.shift();

		VA = new THREE.Vector3( VA.x, VA.y * this.maxHeight, VA.z);
		VL = new THREE.Vector3( VL.x, VL.y * this.maxHeight, VL.z);
		VR = new THREE.Vector3( VR.x, VR.y * this.maxHeight, VR.z);

		this.geometry.vertices.push( VL, VA, VR );
		currentFaceVertice = this.geometry.vertices.length - 3 ;
		this.geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );

		//COLORIZE
		
		face  = this.geometry.faces[ (this.geometry.faces.length - 1) ];
		faceHignessFactor = 1 - ( (VA.y + VL.y + VR.y) / 3 ) / this.maxHeight ;
		face.color.setHSL( faceHignessFactor, 0.8, 0.3 );
	


	}

	this.addChunkMesh = function(){

		//	this.geometry.computeBoundingSphere();
		this.geometry.computeFaceNormals();
		mesh = new THREE.Mesh( this.geometry, groundMaterial );	
		mesh.position.x = ( x * this.chunkSize ) - (this.chunkSize/2);
		mesh.position.z = ( z * this.chunkSize ) - (this.chunkSize/2);
		
		//REDRAW AN EXISTING CHUNK
		if(!this.chunks[x]){
			this.chunks[x] = [];
		}
		if(this.chunks[x][z]){
			this.group.remove(this.chunks[x][z]);
		}
		this.chunks[x][z] = mesh;	
		this.group.add(mesh);
		
		//WATER
		var geometry = new THREE.PlaneGeometry( this.chunkSize, this.chunkSize );
		var water = new THREE.Mesh( geometry, waterMaterial );
		water.rotation.x = deg(-90);
		mesh.add( water );
		water.position.x = (this.chunkSize/2);
		water.position.z = (this.chunkSize/2);

		//CCL
		this.chunkWaited--;
		chunkMax = getAndresLenght(this.chunksDistance, 0, 0, true);

		ccl.load("Chunks Loaded", chunkMax-this.chunkWaited, chunkMax);

	}

	this.flushChunks = function( x, z ){
		console.log("flush");
		if(this.chunks[x]){
			if(this.chunks[x][z]){
				console.log(x,z)
				this.group.remove(this.chunks[x][z]);
				this.chunks[x][z] = undefined;
			}
		}
	}


	this.reload = function(){

		this.ChunksWorker.terminate();
		scene.remove(this.group);

		this.position.x = 0;
		this.position.z = 0;

		this.init();
		world.buildChunks();

		scene.remove(cubePosition.mesh);
		scene.remove(Rchunk.mesh);
		cubePosition = new SelectorTool( 0x00ff00, this.chunkSize, this.maxHeight );
		Rchunk = new SelectorTool( 0xff0000, this.chunkSize, this.maxHeight );

	}


}
