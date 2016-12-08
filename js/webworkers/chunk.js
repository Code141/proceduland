Chunk = function(x, z, chunkSize){
	this.chunk = { 
		x : x,
		z : z
	};

	this.LODArray = [];

	this.bttNorth = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttEast = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttSouth = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttWest = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	
	this.initBTT(chunkSize);
}


Chunk.prototype = {

	initBTT : function(chunkSize){

		this.bttNorth.VA = new V3( chunkSize/2, 0, chunkSize/2 );
		this.bttNorth.VL = new V3( chunkSize, 0, 0 );
		this.bttNorth.VR = new V3( 0, 0, 0 );
		this.bttNorth.VC = new V3( chunkSize/2, 0, 0 );

		this.bttEast.VA = new V3( chunkSize/2, 0, chunkSize/2 );
		this.bttEast.VL = new V3( chunkSize, 0, chunkSize );
		this.bttEast.VR = new V3( chunkSize, 0, 0 );
		this.bttEast.VC = new V3( chunkSize, 0, chunkSize/2 );

		this.bttSouth.VA = new V3( chunkSize/2, 0, chunkSize/2 );
		this.bttSouth.VL = new V3( 0, 0, chunkSize );
		this.bttSouth.VR = new V3( chunkSize, 0, chunkSize );
		this.bttSouth.VC = new V3( chunkSize/2, 0, chunkSize );

		this.bttWest.VA = new V3( chunkSize/2, 0, chunkSize/2 );
		this.bttWest.VL = new V3( 0, 0, 0 );
		this.bttWest.VR = new V3( 0, 0, chunkSize );
		this.bttWest.VC = new V3( 0, 0, chunkSize/2 );
		
		this.bttNorth.getHeight(this.bttNorth.VC);
		this.bttNorth.getHeight(this.bttNorth.VA);
		this.bttNorth.getHeight(this.bttNorth.VL);
		this.bttNorth.getHeight(this.bttNorth.VR);

		this.bttEast.getHeight(this.bttEast.VC);
		this.bttEast.getHeight(this.bttEast.VA);
		this.bttEast.getHeight(this.bttEast.VL);
		this.bttEast.getHeight(this.bttEast.VR);

		this.bttSouth.getHeight(this.bttSouth.VC);
		this.bttSouth.getHeight(this.bttSouth.VA);
		this.bttSouth.getHeight(this.bttSouth.VL);
		this.bttSouth.getHeight(this.bttSouth.VR);
		
		this.bttWest.getHeight(this.bttWest.VC);
		this.bttWest.getHeight(this.bttWest.VA);
		this.bttWest.getHeight(this.bttWest.VL);
		this.bttWest.getHeight(this.bttWest.VR);

		this.bttNorth.createChilds();
		this.bttEast.createChilds();
		this.bttSouth.createChilds();
		this.bttWest.createChilds();
	},

	getBTTLod : function(hypo){
		this.bttNorth.getLod(hypo);
		this.bttEast.getLod(hypo);
		this.bttSouth.getLod(hypo);
		this.bttWest.getLod(hypo);
	},

	printLOD : function(){

		this.LODArray = [];

		this.bttNorth.printLod(this.LODArray);
		this.bttEast.printLod(this.LODArray);
		this.bttSouth.printLod(this.LODArray);
		this.bttWest.printLod(this.LODArray);

		return this.LODArray;
	},

	unbreakChunk : function(){
		this.bttNorth.unbreakBTT();
		this.bttEast.unbreakBTT();
		this.bttSouth.unbreakBTT();
		this.bttWest.unbreakBTT();
	}

};