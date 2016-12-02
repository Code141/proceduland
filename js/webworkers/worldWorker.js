var LEVELMAX, DISTANCE;
importScripts('chunk.js', 'btt.js','../algo/perlin.js', 'landGeometry.js', '../algo/andresCircle.js'); 

V3 = function ( x, y, z ) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};


<<<<<<< HEAD
=======
console.log("hello");

>>>>>>> origin/master
ChunksOverseer = function(chunkSize, chunksDistance, levelMax){
	this.chunks = [];
	this.chunkSize = chunkSize;
	this.position = { x : 0, z : 0 };
	DISTANCE = chunksDistance;
	LEVELMAX = levelMax;
}


ChunksOverseer.prototype = {

	initChunk : function( x, z ){

		this.chunks[x][z] = new Chunk(x,z, this.chunkSize);

	},

	linkChunk : function( x, z ){

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
<<<<<<< HEAD
			
			x = parseInt(x);
			
			for(var z in this.chunks[x]){
				
=======
			x = parseInt(x);
			for(var z in this.chunks[x]){
>>>>>>> origin/master
				z = parseInt(z);

				this.chunks[x][z].unbreakChunk();

			}
		}

	},

<<<<<<< HEAD
	refreshDiam : function( diam ){
=======
	refreshDiam : function(diam){
>>>>>>> origin/master
		var newChunkList = getAndresCircularArray(diam, this.position.x, this.position.z, false);

		// INIT AND DYNAMIQUALLY LINKED (warning heavy cpu cost)

		for(var x in newChunkList){

			x = parseInt(x);

			if(this.chunks[x] == undefined){

				this.chunks[x] = [];

			}

			for(var z in newChunkList[x]){

				z = parseInt(z);

				if(!this.chunks[x][z]){

					overseer.initChunk( x, z);
					overseer.linkChunk( x, z);

				}

			}
		}		


		// GET LOD

		if(diam>0){

<<<<<<< HEAD
			var newChunkList = getAndresCircularArray( diam - 1, this.position.x, this.position.z, false);
=======
			var newChunkList = getAndresCircularArray(diam-1, this.position.x, this.position.z, false);
>>>>>>> origin/master

			for(var x in newChunkList){

				x = parseInt(x);

				for(var z in newChunkList[x]){

					z = parseInt(z);

					hypo = Math.hypot(this.position.x - x, this.position.z - z);
<<<<<<< HEAD
					overseer.chunks[x][z].getBTTLod( diam );
=======
					overseer.chunks[x][z].getBTTLod(diam);
>>>>>>> origin/master

				}

			}


		}

		// PRINT LOD

		if(diam>1){
<<<<<<< HEAD
			var newChunkList = getAndresCircularArray( diam - 2, this.position.x, this.position.z, false);
=======
			var newChunkList = getAndresCircularArray(diam-2, this.position.x, this.position.z, false);
>>>>>>> origin/master
			
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
<<<<<<< HEAD
	
=======
>>>>>>> origin/master
		flushList = getAndresCircularArray(DISTANCE+2, this.position.x, this.position.z, true);
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
<<<<<<< HEAD
			postMessage({
				type : "flushChunks",
				x : chunksToFlush[i].x,
				z : chunksToFlush[i].z
			});
=======
			postMessage({ type : "flushChunks", x : chunksToFlush[i].x, z : chunksToFlush[i].z});
>>>>>>> origin/master
		}	
	},

	moveOn : function( x, z){
		console.log("RUN MF");

		i = 0;
<<<<<<< HEAD

		do{
			this.refreshDiam(i);
			i++;
		
		}while( i <= DISTANCE + 2 );//&& this.position.x != x && this.position.z != z);
=======
		do{
			this.refreshDiam(i);
			i++;
		}while( i<=DISTANCE+2);
>>>>>>> origin/master
		
		this.flush();
	
		console.log("flush");

<<<<<<< HEAD
			this.chunks = [];
=======
		//	this.chunks = [];
>>>>>>> origin/master
			this.unBreakAll();

		}
	}



onmessage = function(e) {
	order = e.data;

	switch(order.type) {

		case "initOverseerParams":

<<<<<<< HEAD
			overseer = new ChunksOverseer(order.chunkSize, order.chunksDistance, order.levelMax);
=======
		overseer = new ChunksOverseer(order.chunkSize, order.chunksDistance, order.levelMax);
>>>>>>> origin/master

		break;

		case "moveOn":

<<<<<<< HEAD
			overseer.position.x = order.position.x;
			overseer.position.z = order.position.z;

			overseer.moveOn( order.position.x, order.position.z );

			
=======
		overseer.position.x = order.positionX;
		overseer.position.z = order.positionZ;

		overseer.moveOn( order.positionX, order.positionZ );
>>>>>>> origin/master

		break;

		default:

		console.log("ORDER ERROR");

	}

}

