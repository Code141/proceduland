World = function(){
	//	params
	//	distance
	//	positionx
	//	positiony
	this.group = new THREE.Group();
	scene.add(this.group);

	this.chunkSize = 100;
	this.chunkDistance = 10;
	this.chunks = [];

	this.position = {};
	this.position.x = 0;
	this.position.z = 0;
	
	this.init = function(){
		
		BresenhamCircularArray = getBresenhamCircularArray(this.chunkDistance, this.position.x, this.position.z);
		
		for(var x in BresenhamCircularArray){
			x = parseInt(x);

			if(this.chunks[x] == undefined){
				this.chunks[x] = [];
			}

			for(var z in BresenhamCircularArray[x]){
				z = parseInt(z);
				this.chunks[x][z] = new Chunk(x,z, this.chunkSize);
				this.chunks[x][z].mesh.position.x = ( x * this.chunkSize ) - (this.chunkSize/2);
				this.chunks[x][z].mesh.position.z = ( z * this.chunkSize ) - (this.chunkSize/2);
				this.group.add(this.chunks[x][z].mesh);
			}	

		}

	}

	this.linkChunks = function(){
		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);
				
				if(this.chunks[x][z+1] !== undefined){
					this.chunks[x][z].bttSouth.neighbor.base = this.chunks[x][z+1].bttNorth;
				}	
				
				if(this.chunks[x-1] !== undefined){
					if(this.chunks[x-1][z] !== undefined){
						this.chunks[x][z].bttWest.neighbor.base = this.chunks[x-1][z].bttEast;
					}
				}
				
				if(this.chunks[x][z-1] !== undefined){
					this.chunks[x][z].bttNorth.neighbor.base = this.chunks[x][z-1].bttSouth;
				}
				
				if(this.chunks[x+1] !== undefined){
					if(this.chunks[x+1][z] !== undefined){
						this.chunks[x][z].bttEast.neighbor.base = this.chunks[x+1][z].bttWest;
					}
				}	

				this.chunks[x][z].bttNorth.neighbor.left = this.chunks[x][z].bttEast;
				this.chunks[x][z].bttNorth.neighbor.right = this.chunks[x][z].bttWest;
				this.chunks[x][z].bttEast.neighbor.left = this.chunks[x][z].bttSouth;
				this.chunks[x][z].bttEast.neighbor.right = this.chunks[x][z].bttNorth;
				this.chunks[x][z].bttSouth.neighbor.left = this.chunks[x][z].bttWest;
				this.chunks[x][z].bttSouth.neighbor.right = this.chunks[x][z].bttEast;
				this.chunks[x][z].bttWest.neighbor.left = this.chunks[x][z].bttNorth;
				this.chunks[x][z].bttWest.neighbor.right = this.chunks[x][z].bttSouth;

				this.chunks[x][z].bttNorth.linkNeighbor();
				this.chunks[x][z].bttEast.linkNeighbor();
				this.chunks[x][z].bttSouth.linkNeighbor();
				this.chunks[x][z].bttWest.linkNeighbor();
			}
		}
		
	}

	this.make = function(){
		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);
				hypo = Math.hypot(Math.abs(Math.abs(this.position.x) - Math.abs(x)), Math.abs(Math.abs(this.position.z) - Math.abs(z)));
				this.chunks[x][z].getLod(hypo);
			}	

		}

	}
console.log("start")
	this.init();
	this.linkChunks();
	this.make();
	console.log("end");
}
