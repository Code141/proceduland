World = function(){
	//	params
	//	distance
	//	positionx
	//	positiony
	this.group = new THREE.Group();
	scene.add(this.group);

	this.chunkSize = 500;
	this.chunkDistance = 15;
	this.chunks = [];

	this.position = {};
	this.position.x = 0;
	this.position.z = 0;
	
	this.buildChunks = function(){

		BresenhamCircularArray = getBresenhamCircularArray(this.chunkDistance, this.position.x, this.position.z);
		
		for(var x in BresenhamCircularArray){
			x = parseInt(x);

			if(this.chunks[x] == undefined){
				this.chunks[x] = [];
			}

			for(var z in BresenhamCircularArray[x]){
				z = parseInt(z);
				this.chunks[x][z] = new Chunk(x,z, this.chunkSize);

			}	

		}

	}

	this.linksChunks = function(){

		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);
				
				if(this.chunks[x][z+1] !== undefined){
					this.chunks[x][z].bttSouth.NB = this.chunks[x][z+1].bttNorth;
				}

				if(this.chunks[x][z-1] !== undefined){
					this.chunks[x][z].bttNorth.NB = this.chunks[x][z-1].bttSouth;
				}

				if(this.chunks[x-1] !== undefined){
					if(this.chunks[x-1][z] !== undefined){
						this.chunks[x][z].bttWest.NB = this.chunks[x-1][z].bttEast;
					}
				}
				
				if(this.chunks[x+1] !== undefined){
					if(this.chunks[x+1][z] !== undefined){
						this.chunks[x][z].bttEast.NB = this.chunks[x+1][z].bttWest;
					}
				}	

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

			}

		}

	}

	this.getBTTLod = function(){
		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);
			
				hypo = Math.hypot(
					
						this.position.x - x
						,
					
						this.position.z - z)
					;
				
				this.chunks[x][z].getBTTLod(hypo);
			}	
		}
	}

	this.drawMesh = function(){
		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);

				this.chunks[x][z].buildMesh();
			
				this.chunks[x][z].mesh.position.x = ( x * this.chunkSize ) - (this.chunkSize/2);
				this.chunks[x][z].mesh.position.z = ( z * this.chunkSize ) - (this.chunkSize/2);
			
				this.group.add(this.chunks[x][z].mesh);
			}	
		}
	}

	this.move = function( x, z){
		this.position.x += x;
		this.position.z += z;
		
		// NEED PATCH HERE !
		
		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);
				this.chunks[x][z].bttNorth.CRADEunbreak();
				this.chunks[x][z].bttEast.CRADEunbreak();
				this.chunks[x][z].bttSouth.CRADEunbreak();
				this.chunks[x][z].bttWest.CRADEunbreak();

				this.group.remove(this.chunks[x][z].mesh);
			}	
		}

	
		this.getBTTLod();
		this.drawMesh();
	}





console.log("buildChunks");

	this.buildChunks();

console.log("Link Chunks");

	this.linksChunks();

console.log("Get BTT LOD");

	this.getBTTLod();

console.log("Draw Mesh");

	this.drawMesh();

console.log("FINISH");


}
