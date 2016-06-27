BinaryTriangleTree = function ( x, z, chunkSize, level, geometry, parent){
	this.levelMax = 6;
	this.chunk = { x : x, z : z};
	this.level = level;
	this.chunkSize = chunkSize;
	this.parent = parent;
this.geometry = geometry;
	this.neighbor = {};
	//this.neighbor.base = neighbor.base;
	//this.neighbor.left = neighbor.left;
	//this.neighbor.right = neighbor.right;

	this.vertex = {};
	this.vertex.apex = new THREE.Vector3( 0, 0, 0 );
	this.vertex.left = new THREE.Vector3( 0, 0, 0 );
	this.vertex.right = new THREE.Vector3( 0, 0, 0 );
	this.vertex.center = new THREE.Vector3( 0, 0, 0 );

	this.deltaBaseApex = 0;
	this.breaked = false;
	

}

BinaryTriangleTree.prototype.getHeight = function(vector){
		absoluteX = (this.chunkSize * this.chunk.x ) + ( vector.x );
		absoluteZ = (this.chunkSize * this.chunk.z ) + ( vector.z );
		height = procedural(absoluteX, absoluteZ);
		vector.y = height*300;
	}


BinaryTriangleTree.prototype.getBttHeight = function(){
		this.getHeight(this.vertex.apex);
		this.getHeight(this.vertex.left);
		this.getHeight(this.vertex.right);
	}

BinaryTriangleTree.prototype.insertFace = function(){

		this.geometry.vertices.push( this.vertex.left, this.vertex.apex, this.vertex.right );
		currentFaceVertice = this.geometry.vertices.length - 3 ;
		this.geometry.faces.push( new THREE.Face3( currentFaceVertice, currentFaceVertice + 1, currentFaceVertice + 2 ) );

		//COLORIZE
		face  = this.geometry.faces[ (this.geometry.faces.length - 1) ];

		faceHignessFactor = 1 - ( (this.vertex.apex.y + this.vertex.left.y + this.vertex.right.y) / 3 ) / 300 ;
		face.color.setHSL( faceHignessFactor,1, 0.5 );
	//	face.color.setHSL( (this.level/9)/1.2,1, 0.5 );

		this.faceIndex = this.geometry.faces.length - 1;
	}

BinaryTriangleTree.prototype.printLod = function(){
		if(this.breaked == false){
			this.insertFace();
		}else{
			this.leftChildren.printLod();
			this.rightChildren.printLod();	
		}
	}

BinaryTriangleTree.prototype.break = function(){
		this.breaked = true;
		if(this.parent != undefined && this.parent.breaked == false) this.parent.break();
		if(this.neighbor.base != undefined && this.neighbor.base.breaked == false) this.neighbor.base.break();

	}
BinaryTriangleTree.prototype.getLod = function(hypo){
		if(this.level < this.levelMax+1){
			this.rightChildren.getLod(hypo);
			this.leftChildren.getLod(hypo);
		}

		detailfactor = (7/this.level)*((hypo+1)/3);
	//	detailfactor = 7/this.level;

		if(this.deltaBaseApex*2 > detailfactor){
			this.break();
		}
	}
BinaryTriangleTree.prototype.linkNeighbor = function(){

		// IF EXISTE, LINK BASE NEIGHBOR !!!!!
		this.leftChildren.neighbor.left = this.rightChildren;
		this.rightChildren.neighbor.right = this.leftChildren;
		
		if(this.neighbor.base != undefined ){
			this.leftChildren.neighbor.right = this.neighbor.base.rightChildren;
			this.rightChildren.neighbor.left = this.neighbor.base.leftChildren;
		}

		if(this.neighbor.left != undefined ){
			this.leftChildren.neighbor.base = this.neighbor.left.rightChildren;
		}

		if(this.neighbor.right != undefined ){
			this.rightChildren.neighbor.base = this.neighbor.right.leftChildren;
		}


		if(this.level < this.levelMax){
			this.rightChildren.linkNeighbor();
			this.leftChildren.linkNeighbor();
		}

	}

BinaryTriangleTree.prototype.createChilds = function(){
		level = this.level + 1;

		this.leftChildren = new BinaryTriangleTree( this.chunk.x, this.chunk.z, this.chunkSize, level, this.geometry, this );
		this.rightChildren = new BinaryTriangleTree( this.chunk.x, this.chunk.z, this.chunkSize, level, this.geometry, this );

		this.leftChildren.vertex.apex = this.vertex.center;
		this.leftChildren.vertex.left = this.vertex.left;
		this.leftChildren.vertex.right = this.vertex.apex;
		this.leftChildren.vertex.center.x = 0.5 * ( this.leftChildren.vertex.right.x + this.leftChildren.vertex.left.x );
		this.leftChildren.vertex.center.z = 0.5 * ( this.leftChildren.vertex.right.z + this.leftChildren.vertex.left.z );
		this.leftChildren.getHeight(this.leftChildren.vertex.center);

		this.rightChildren.vertex.apex = this.vertex.center;
		this.rightChildren.vertex.left = this.vertex.right;
		this.rightChildren.vertex.right = this.vertex.apex;
		this.rightChildren.vertex.center.x = 0.5 * ( this.rightChildren.vertex.right.x + this.rightChildren.vertex.left.x );
		this.rightChildren.vertex.center.z = 0.5 * ( this.rightChildren.vertex.right.z + this.rightChildren.vertex.left.z );
		this.rightChildren.getHeight(this.rightChildren.vertex.center);

		virtualBaseHeight = ( this.vertex.left.y + this.vertex.right.y ) / 2;
		this.deltaBaseApex = Math.abs( virtualBaseHeight - this.vertex.center.y);

		if(this.level < this.levelMax){
			this.rightChildren.createChilds();
			this.leftChildren.createChilds();
		}
	}