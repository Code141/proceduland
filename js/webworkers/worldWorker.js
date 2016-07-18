importScripts('chunk.js', 'btt.js','../algo/perlin.js', '../algo/andresCircle.js'); 

V3 = function ( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};



procedural = function(absoluteX, absoluteZ){
	landNoiseFrequance = 100;
	land = 1000;
	riverFrequance = 5000;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	landNoise = ( noise.simplex2( absoluteX / landNoiseFrequance, absoluteZ / landNoiseFrequance ) + 1 ) / 2;

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;
	river = 1 - ( Math.abs(river - 0.5) * 2 );
	river = Math.pow(river, 4 );

	finalNoise = ( land * land + ( landNoise * land * land ) ) / 2;
	finalNoise = ((finalNoise - river) + 1 )/2 ;
	return finalNoise;

}




ChunksOverseer = function(chunkSize, chunksDistance){
	this.chunks = [];
	this.chunkSize = chunkSize;
	this.chunksDistance = chunksDistance;
	this.position = { x : 0, z : 0 };
}

ChunksOverseer.prototype = {

	initChunk : function( x, z ){
		this.chunks[x][z] = new Chunk(x,z, this.chunkSize);
	},

	linkChunk : function( x , z ){

		if(this.chunks[x][z+1]){
			this.chunks[x][z].bttSouth.NB = this.chunks[x][z+1].bttNorth;
			if(!this.chunks[x][z+1].bttNorth.NB){
				this.chunks[x][z+1].bttNorth.NB = this.chunks[x][z].bttSouth;
				this.chunks[x][z+1].bttNorth.linkNeighbor();
			} 
		}

		if(this.chunks[x][z-1]){
			this.chunks[x][z].bttNorth.NB = this.chunks[x][z-1].bttSouth;
			if(!this.chunks[x][z-1].bttSouth.NB){
				this.chunks[x][z-1].bttSouth.NB = this.chunks[x][z].bttNorth;
				this.chunks[x][z-1].bttSouth.linkNeighbor();
			} 
		}

		if(this.chunks[x-1]){
			if(this.chunks[x-1][z]){
				this.chunks[x][z].bttWest.NB = this.chunks[x-1][z].bttEast;
				if(!this.chunks[x-1][z].bttEast.NB){
					this.chunks[x-1][z].bttEast.NB = this.chunks[x][z].bttWest;
					this.chunks[x-1][z].bttEast.linkNeighbor();

				} 
			}
		}

		if(this.chunks[x+1]){
			if(this.chunks[x+1][z]){
				this.chunks[x][z].bttEast.NB = this.chunks[x+1][z].bttWest;
				if(!this.chunks[x+1][z].bttWest.NB){
					this.chunks[x+1][z].bttWest.NB = this.chunks[x][z].bttEast;
					this.chunks[x+1][z].bttWest.linkNeighbor();

				} 
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

	},

	unBreakAll : function(){

		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);

				this.chunks[x][z].unbreakChunk();

			}
		}

	},

	refreshDiam : function(diam){
		var newChunkList = getAndresCircularArray(diam, this.position.x, this.position.z, false);

		// INIT AND DYNAMIQUALLY LINKED (heavy cpu)

		for(var x in newChunkList){
			x = parseInt(x);

			if(this.chunks[x] == undefined){
				this.chunks[x] = [];
			}

			for(var z in newChunkList[x]){
				z = parseInt(z);
				if(!this.chunks[x][z]){
					overseer.initChunk(x,z);
					overseer.linkChunk(x,z);

				}

			}
		}		


		// GET LOD

		if(diam>0){
			var newChunkList = getAndresCircularArray(diam-1, this.position.x, this.position.z, false);




			for(var x in newChunkList){
				x = parseInt(x);
				for(var z in newChunkList[x]){
					z = parseInt(z);

					hypo = Math.hypot(this.position.x - x, this.position.z - z);
					overseer.chunks[x][z].getBTTLod(diam);

				}
			}


		}

		// PRINT LOD

		if(diam>1){
			var newChunkList = getAndresCircularArray(diam-2, this.position.x, this.position.z, false);
			
			for(var x in newChunkList){
				x = parseInt(x);
				for(var z in newChunkList[x]){
					z = parseInt(z);

					LODArray = this.chunks[x][z].printLOD();

					postMessage({
						type : "LODArray",
						position : {
							x : this.position.x,
							z : this.position.z
						},
						LODArray : LODArray,
						chunk : {
							x : x,
							z : z
						}

					});

				}
			}
		}
	},

	flush : function(){
		flushList = getAndresCircularArray(this.chunksDistance+2, this.position.x, this.position.z, true);
		chunksToFlush = [];

		for(var x in this.chunks){
			x = parseInt(x);
			for(var z in this.chunks[x]){
				z = parseInt(z);

				if(!flushList[x]){
					chunksToFlush.push({ x : x, z : z})
				}else if(!flushList[x][z]){
					chunksToFlush.push({ x : x, z : z})
				}
			}
		}	

		for(var i = 0; i<chunksToFlush.length; i++){
			postMessage({ type : "flushChunks", x : chunksToFlush[i].x, z : chunksToFlush[i].z});
		}	
	},

	moveOn : function( x, z){
		console.log("RUN MF");

		i = 0;
		do{
			this.refreshDiam(i);
			i++;
		}while( i<=this.chunksDistance+2 && this.position.x == x && this.position.z == z );
		
		this.flush();
		console.log("flush")

		//	this.chunks = [];
		//	this.unBreakAll();
		}
	}



onmessage = function(e) {
	order = e.data;

	switch(order.type) {

		case "initOverseer":
		overseer = new ChunksOverseer(order.chunkSize, order.chunksDistance);
		break;

		case "moveOn":
		overseer.position.x = order.positionX;
		overseer.position.z = order.positionZ;
		
		overseer.moveOn( order.positionX, order.positionZ );
		break;

		default:
		console.log("ORDER ERROR");
	}

}







