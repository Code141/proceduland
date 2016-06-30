/*
VA - Vector Apex
VL - Vector Left
VR - Vector Right
VC - Vector Center

CL - Child Left
CR - Child Right

NL - Neighbor Left
NR - Neighbor Right
NB - Neighbor Base
*/

BinaryTriangleTree = function ( x, z, chunkSize, level, parent){

	this.chunkX = x;
	this.chunkZ = z;

	this.chunkSize = chunkSize;

	this.level = level;
	this.levelMax = 7;

	this.parent = parent;

	this.VA = new THREE.Vector3( 0, 0, 0 );
	this.VL = new THREE.Vector3( 0, 0, 0 );
	this.VR = new THREE.Vector3( 0, 0, 0 );
	this.VC = new THREE.Vector3( 0, 0, 0 );

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
			this.CR.linkNeighbor();
			this.CL.linkNeighbor();
		}

	},

	getLod : function(hypo){

		if(this.level < this.levelMax){
			this.CR.getLod(hypo);
			this.CL.getLod(hypo);
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

	printLod : function(geometry){

		if(this.breaked){
			this.CL.printLod(geometry);
			this.CR.printLod(geometry);	
		}else{
			this.insertFace(geometry);
		}

	},

	insertFace : function(geometry){

		geometry.vertices.push( this.VL, this.VA, this.VR );
		currentFaceVertice = geometry.vertices.length - 3 ;
		geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );

		//COLORIZE
		face  = geometry.faces[ (geometry.faces.length - 1) ];
		faceHignessFactor = 1 - ( (this.VA.y + this.VL.y + this.VR.y) / 3 ) / 500 ;
		face.color.setHSL( faceHignessFactor,0.8, 0.3 );
		//face.color.setHSL( (this.level/9)/1.2,1, 0.5 );
		this.faceIndex = geometry.faces.length - 1;

	},



	getHeight : function(vector){

		absoluteX = (this.chunkSize * this.chunkX ) + ( vector.x );
		absoluteZ = (this.chunkSize * this.chunkZ ) + ( vector.z );
		height = procedural(absoluteX, absoluteZ);
		vector.y = height*500;

	},

	CRADEunbreak : function(){

		if(this.breaked){
			this.CL.CRADEunbreak();
			this.CR.CRADEunbreak();	
		}
		this.breaked = false;

	}


}




