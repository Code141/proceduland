World = function(){
	this.group = new THREE.Group();
	scene.add(this.group);
	
	this.chunks= [];

	this.position = { x : 0, z : 0 };

	this.chunksDistance = 20;

	this.chunkSize = 100;
	this.chunkSubdivisions = 10;
	this.crossingSub = 1;
	this.maxHeight = 500;


	this.loadChunks = function( moveX, moveZ){
		this.position.x += moveX;
		this.position.z += moveZ;


		for(var x = -(this.chunksDistance-1)+this.position.x; x<this.chunksDistance+this.position.x; x++){
			if(this.chunks[x] === undefined){
				this.chunks[x] = [];
			} 
			for(var z = -(this.chunksDistance-1)+this.position.z; z<this.chunksDistance+this.position.z; z++){
				if(this.chunks[x][z] === undefined){

					LODSUB = this.chunkSubdivisions/(  Math.max( Math.abs( x ), Math.abs( z ) )*Math.max( Math.abs( x ), Math.abs( z ) )+ 1 )  ;

					this.chunks[x][z] = new Chunk( x, z, this.chunkSize, this.chunkSubdivisions, this.crossingSub, this.maxHeight);	
					this.group.add( this.chunks[x][z].chunkMesh );	


					

				}
			}
		}

		for(var x in this.chunks){
			for(var z in this.chunks[x]){
				if(this.chunks[x][z] !== undefined){
					deleteChunk = false;

					if(x >= this.position.x+this.chunksDistance){
						deleteChunk = true;
					}
					if(x <= this.position.x-this.chunksDistance){
						deleteChunk = true;
					}

					if(z >= this.position.z+this.chunksDistance){
						deleteChunk = true;
					}

					if(z <= this.position.z-this.chunksDistance){
						deleteChunk = true;
					}

					if(deleteChunk){
						this.group.remove( this.chunks[x][z].chunkMesh );
						this.chunks[x][z] = undefined;
					}
				}
			}
		}



	}



	this.update = function(delta){
		for(var x in this.chunks){
			for(var z in this.chunks[x]){
				if(this.chunks[x][z] !== undefined){
					this.chunks[x][z].update(delta);
				}
			}
		}
	}
	
	this.loadChunks( 0, 0 );
}


