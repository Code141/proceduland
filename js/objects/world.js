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
	ChunkToRefresh = [];


//	Voronoi(500, this.chunkSize, this.chunksDistance);
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
					addToQueue(world.refreshQueuedChunks);
			}
			break;
			
			case "flushChunks" :
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
		
		if(ChunkToRefresh.length != 0){
			ccl.endApp("Chunks Loaded");
			ccl.print("Current chunks load cancelled");
		}

		this.position.x += x;
		this.position.z += z;
		this.buildChunks();
	
		cubePosition.move( this.position.x, this.position.z );

		function cancelRefresh(element) {
		  return element == world.position.x && element == world.position.z;
		}


		ChunkToRefresh = ChunkToRefresh.filter(cancelRefresh);

	}

	this.refreshQueuedChunks = function(){

		if(ChunkToRefresh.length != 0){

			chunk = ChunkToRefresh.shift();

			LODArray = chunk.LODArray;
			x = chunk.chunk.x;
			z = chunk.chunk.z;

			world.drawMesh( x, z, LODArray);

			world.chunkWaited--;

			
			chunkMax = getAndresLenght(world.chunksDistance, 0, 0, true);
			ccl.load("Chunks Loaded", chunkMax-world.chunkWaited, chunkMax);
		}

	}

	this.drawMesh = function( x, z, LODArray){

		geometry = new THREE.Geometry();
	
		for(var i = 0; i < LODArray.length; i += 3){
		
				var VA = LODArray[ i ];
				var VL = LODArray[ i + 1 ];
				var VR = LODArray[ i + 2 ];

				VA = new THREE.Vector3( VA.x, VA.y * this.maxHeight, VA.z);
				VL = new THREE.Vector3( VL.x, VL.y * this.maxHeight, VL.z);
				VR = new THREE.Vector3( VR.x, VR.y * this.maxHeight, VR.z);

				geometry.vertices.push( VL, VA, VR );

				currentFaceVertice = geometry.vertices.length - 3 ;

				geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );
			
				//COLORIZE
				
				face  = geometry.faces[ (geometry.faces.length - 1) ];
				faceHignessFactor = 1 - ( (VA.y + VL.y + VR.y) / 3 ) / this.maxHeight ;
				face.color.setHSL( faceHignessFactor,0.8, 0.3 );

		}

		//	geometry.computeBoundingSphere();
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh( geometry, groundMaterial );	
		mesh.position.x = ( x * world.chunkSize ) - (world.chunkSize/2);
		mesh.position.z = ( z * world.chunkSize ) - (world.chunkSize/2);
		

		if(!world.chunks[x]){
			world.chunks[x] = [];
		}

		if(world.chunks[x][z]){
			world.group.remove(world.chunks[x][z]);
		}

		world.chunks[x][z] = mesh;	
		world.group.add(mesh);


		Rchunk.move( x, z );

		var geometry = new THREE.PlaneGeometry( this.chunkSize, this.chunkSize );

		var water = new THREE.Mesh( geometry, waterMaterial );
		water.rotation.x = deg(-90);
		mesh.add( water );
		water.position.x = (this.chunkSize/2);
		water.position.z = (this.chunkSize/2);

	}

	this.flushChunks = function( x, z ){
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
