World = function(){
	//	params
	//	distance
	//	positionx
	//	positiony
	this.group = new THREE.Group();
	scene.add(this.group);

	this.chunkSize = 500;
	this.chunksDistance = 5;
	this.chunks = [];

	this.position = {};
	this.position.x = 0;
	this.position.z = 0;
	
		this.material = new THREE.MeshLambertMaterial( {
			emissive : 0x000000,
			vertexColors : THREE.VertexColors,
			transparent : false,
			opacity : 0.2,
			side : THREE.BackSide,
			wireframe : false
		} );

	this.ChunksWorker = new Worker("js/webworkers/worldWorker.js");

	this.ChunksWorker.postMessage({
		type : "initOverseer",
		chunkSize : this.chunkSize,
		chunksDistance : this.chunksDistance
	});

	ChunkToRefresh = [];


	this.ChunksWorker.onmessage = function(e) {
		response = e.data;
		switch(response.type) {
			case "LODArray" :
				ChunkToRefresh.push({
						position : {
							x : response.position.x,
							z : response.position.z
						},
						LODArray : response.LODArray,
						chunk : {
							x : response.chunk.x,
							z : response.chunk.z
						}
				});


				addToQueue(world.refreshQueuedChunks);
			break;
			
			case "flushChunks" :
			world.flushChunks(response.x, response.z);
			break;


			default:
			console.log("RESPONSE ERROR");
		}

	};


	this.buildChunks = function(){
		this.ChunksWorker.postMessage({
			type : "moveOn",
			positionX : this.position.x,
			positionZ : this.position.z
		});
	}


	this.move = function( x, z){
		this.position.x += x;
		this.position.z += z;
		this.buildChunks();
		cubePosition.position.x = (this.chunkSize * this.position.x);
		cubePosition.position.z = (this.chunkSize * this.position.z);




		function cancelRefresh(element) {
		  return element == world.position.x && element == world.position.z;
		}
		ChunkToRefresh = ChunkToRefresh.filter(cancelRefresh);
		console.log(ChunkToRefresh)



	}



	this.drawMesh = function(chunk){

		LODArray = chunk.LODArray;

		x = chunk.chunk.x;
		z = chunk.chunk.z;

		geometry = new THREE.Geometry();
	
		for(var i = 0; i<LODArray.length; i += 3){
		
				var VA = LODArray[ i ];
				var VL = LODArray[ i + 1 ];
				var VR = LODArray[ i + 2 ];

				VA = new THREE.Vector3( VA.x, VA.y, VA.z);
				VL = new THREE.Vector3( VL.x, VL.y, VL.z);
				VR = new THREE.Vector3( VR.x, VR.y, VR.z);

				geometry.vertices.push( VL, VA, VR );

				currentFaceVertice = geometry.vertices.length - 3 ;

				geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );
			
				//COLORIZE
				face  = geometry.faces[ (geometry.faces.length - 1) ];
				faceHignessFactor = 1 - ( (VA.y + VL.y + VR.y) / 3 ) / 500 ;
				face.color.setHSL( faceHignessFactor,0.8, 0.3 );
		}


//		geometry.computeBoundingSphere();
		geometry.computeFaceNormals();
		


		mesh = new THREE.Mesh( geometry, world.material );	
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

		Rchunk.position.x = ( x * world.chunkSize );
		Rchunk.position.z = ( z * world.chunkSize );
	

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

	this.refreshQueuedChunks = function(){
		if(ChunkToRefresh.length != 0){
			chunk = ChunkToRefresh.shift();
			world.drawMesh(chunk);
		}
	}



}
