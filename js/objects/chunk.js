Chunk = function(x, z, chunkSize){

	this.initChunk = function(){
		
		lod = {};

		this.geometry = new THREE.Geometry();

		this.bttNorth = new BinaryTriangleTree( x, z, chunkSize, 0, this.geometry );
		this.bttEast = new BinaryTriangleTree( x, z, chunkSize, 0, this.geometry );
		this.bttSouth = new BinaryTriangleTree( x, z, chunkSize, 0, this.geometry );
		this.bttWest = new BinaryTriangleTree( x, z, chunkSize, 0, this.geometry );

		this.bttNorth.vertex.apex = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttNorth.vertex.left = new THREE.Vector3( chunkSize, 0, 0 );
		this.bttNorth.vertex.right = new THREE.Vector3( 0, 0, 0 );
		this.bttNorth.vertex.center = new THREE.Vector3( chunkSize/2, 0, 0 );

		this.bttEast.vertex.apex = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttEast.vertex.left = new THREE.Vector3( chunkSize, 0, chunkSize );
		this.bttEast.vertex.right = new THREE.Vector3( chunkSize, 0, 0 );
		this.bttEast.vertex.center = new THREE.Vector3( chunkSize, 0, chunkSize/2 );

		this.bttSouth.vertex.apex = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttSouth.vertex.left = new THREE.Vector3( 0, 0, chunkSize );
		this.bttSouth.vertex.right = new THREE.Vector3( chunkSize, 0, chunkSize );
		this.bttSouth.vertex.center = new THREE.Vector3( chunkSize/2, 0, chunkSize );

		this.bttWest.vertex.apex = new THREE.Vector3( chunkSize/2, 0, chunkSize/2 );
		this.bttWest.vertex.left = new THREE.Vector3( 0, 0, 0 );
		this.bttWest.vertex.right = new THREE.Vector3( 0, 0, chunkSize );
		this.bttWest.vertex.center = new THREE.Vector3( 0, 0, chunkSize/2 );

		this.bttNorth.getBttHeight();
		this.bttEast.getBttHeight();
		this.bttSouth.getBttHeight();
		this.bttWest.getBttHeight();

		this.bttNorth.getHeight(this.bttNorth.vertex.center);
		this.bttEast.getHeight(this.bttEast.vertex.center);
		this.bttSouth.getHeight(this.bttSouth.vertex.center);
		this.bttWest.getHeight(this.bttWest.vertex.center);

		this.bttNorth.createChilds();
		this.bttEast.createChilds();
		this.bttSouth.createChilds();
		this.bttWest.createChilds();


		var material = new THREE.MeshLambertMaterial( {
			emissive : 0x000000,
			vertexColors : THREE.VertexColors,
			transparent : false,
			opacity : 0.7,
			side : THREE.DoubleSide
		} );

		this.mesh = new THREE.Mesh( this.geometry, material );
		this.mesh.userData = {
			chunk : {
				x: x,
				z: z
			}
		};

	}

	this.getLod = function(hypo){
		this.bttNorth.getLod(hypo);
		this.bttEast.getLod(hypo);
		this.bttSouth.getLod(hypo);
		this.bttWest.getLod(hypo);

		this.bttNorth.printLod();
		this.bttEast.printLod();
		this.bttSouth.printLod();
		this.bttWest.printLod();

		this.geometry.computeBoundingSphere();
		this.geometry.computeFaceNormals();

	}

	this.initChunk();
}