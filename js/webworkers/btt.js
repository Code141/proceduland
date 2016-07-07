BinaryTriangleTree = function ( x, z, chunkSize, level, parent){

	this.chunkX = x;
	this.chunkZ = z;

	this.chunkSize = chunkSize;

	this.level = level;
	this.levelMax = 8;

	this.parent = parent;

	this.VA = new V3();
	this.VL = new V3();
	this.VR = new V3();
	this.VC = new V3();

	this.deltaBaseApex = 0;
	this.breaked = false;

}

BinaryTriangleTree.prototype = {

	createChilds : function(){

		level = this.level + 1;
		
		this.CL = new BinaryTriangleTree( this.chunkX, this.chunkZ, this.chunkSize, level, this );
		this.CR = new BinaryTriangleTree( this.chunkX, this.chunkZ, this.chunkSize, level, this );

		this.CL.VA = this.VC;
		this.CL.VL = this.VA;
		this.CL.VR = this.VL;

		this.CL.VC.x = 0.5 * ( this.CL.VR.x + this.CL.VL.x );
		this.CL.VC.z = 0.5 * ( this.CL.VR.z + this.CL.VL.z );
		this.CL.getHeight(this.CL.VC);

		this.CR.VA = this.VC;
		this.CR.VL = this.VR;
		this.CR.VR = this.VA;

		this.CR.VC.x = 0.5 * ( this.CR.VR.x + this.CR.VL.x );
		this.CR.VC.z = 0.5 * ( this.CR.VR.z + this.CR.VL.z );
		this.CR.getHeight(this.CR.VC);

		virtualBaseHeight = ( this.VL.y + this.VR.y ) / 2;
		this.deltaBaseApex = Math.abs( virtualBaseHeight - this.VC.y);

		if(this.level < this.levelMax){
			this.CR.createChilds();
			this.CL.createChilds();
		}

	},

	linkNeighbor : function(){

		this.CL.NL = this.CR;
		this.CR.NR = this.CL;

		if(this.NB){
			this.CL.NR = this.NB.CR;
			this.CR.NL = this.NB.CL;
		}

		if(this.NL){
			this.CL.NB = this.NL.CR;
		}

		if(this.NR){
			this.CR.NB = this.NR.CL;
		}

		if(this.level < this.levelMax){
			this.CL.linkNeighbor();
			this.CR.linkNeighbor();
		}

	},

	getLod : function(hypo){

		if(this.level < this.levelMax){
			this.CL.getLod(hypo);
			this.CR.getLod(hypo);
		}

		detailfactor = (this.levelMax/this.level)*((hypo*3-3));
		//detailfactor = 7/this.level;

		if(this.deltaBaseApex > detailfactor){

			this.break();
		}

	},

	break : function(){

		this.breaked = true;
		if(this.NB != undefined && this.NB.breaked == false) this.NB.break();
		if(this.parent != undefined && this.parent.breaked == false) this.parent.break();

	},

	printLod : function(LODArray){

		if(this.breaked){
			this.CL.printLod(LODArray);
			this.CR.printLod(LODArray);	
		}else{
			this.insertFace(LODArray);
		}

	},

	insertFace : function(LODArray){
		LODArray.push(this.VA, this.VL, this.VR)
	},

	getHeight : function(vector){

		absoluteX = (this.chunkSize * this.chunkX ) + ( vector.x );
		absoluteZ = (this.chunkSize * this.chunkZ ) + ( vector.z );
		height = procedural(absoluteX, absoluteZ);
		vector.y = height*500;

	},

	unbreakBTT : function(){
		if(this.breaked){
			this.CL.unbreakBTT();
			this.CR.unbreakBTT();	
		}
		this.breaked = false;

	}


}





