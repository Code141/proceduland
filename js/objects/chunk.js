Chunk = function(x, z, chunkSize){
	this.chunk = { 
		x : x,
		z : z
	};

	this.bttNorth = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttEast = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttSouth = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	this.bttWest = new BinaryTriangleTree(x, z, chunkSize, 0, undefined);
	
	this.initBTT(chunkSize);
}



Chunk.prototype = {

	initBTT : function(chunkSize){

		this.bttNorth.VA = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttNorth.VL = new THREE.Vector3( chunkSize, 0, 0 );
		this.bttNorth.VR = new THREE.Vector3( 0, 0, 0 );
		this.bttNorth.VC = new THREE.Vector3( chunkSize/2, 0, 0 );

		this.bttEast.VA = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttEast.VL = new THREE.Vector3( chunkSize, 0, chunkSize );
		this.bttEast.VR = new THREE.Vector3( chunkSize, 0, 0 );
		this.bttEast.VC = new THREE.Vector3( chunkSize, 0, chunkSize/2 );

		this.bttSouth.VA = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttSouth.VL = new THREE.Vector3( 0, 0, chunkSize );
		this.bttSouth.VR = new THREE.Vector3( chunkSize, 0, chunkSize );
		this.bttSouth.VC = new THREE.Vector3( chunkSize/2, 0, chunkSize );

		this.bttWest.VA = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttWest.VL = new THREE.Vector3( 0, 0, 0 );
		this.bttWest.VR = new THREE.Vector3( 0, 0, chunkSize );
		this.bttWest.VC = new THREE.Vector3( 0, 0, chunkSize/2 );
		
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

	buildMesh : function(){
		this.geometry = new THREE.Geometry();

		this.bttNorth.printLod(this.geometry);
		this.bttEast.printLod(this.geometry);
		this.bttSouth.printLod(this.geometry);
		this.bttWest.printLod(this.geometry);

		var material = new THREE.MeshLambertMaterial( {
			emissive : 0x000000,
			vertexColors : THREE.VertexColors,
			transparent : false,
			opacity : 0.2,
			side : THREE.BackSide,
			wireframe : false
		} );



		this.geometry.computeBoundingSphere();
		this.geometry.computeFaceNormals();


		this.mesh = new THREE.Mesh( this.geometry, material );


	//	this.mesh = THREE.SceneUtils.createMultiMaterialObject( 
	//		this.geometry, [
	//		new THREE.MeshLambertMaterial( {
	//			emissive : 0x000000,
	//			vertexColors : THREE.VertexColors,
	//			transparent : false,
	//			opacity : 1,
	//			side : THREE.BackSide
	//		} ),
	//		new THREE.MeshLambertMaterial( {
	//			wireframe : true,
	//			transparent : true,
	//			opacity : 0.3,
	//		} )
	//		]);

	}
};