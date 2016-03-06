Chunk = function(chunkX, chunkZ, chunkSize, chunkSubdivisions, crossingSub, maxHeight){
	this.chunkX = chunkX;
	this.chunkZ = chunkZ;

	this.chunkSize = chunkSize;
	this.chunkSubdivisions = chunkSubdivisions;
	this.crossingSub = crossingSub;
	this.maxHeight = maxHeight;

	this.vertices = [];
	this.pos = 0;


	this.generateChunk = function(){
		
	//	finalSubdivisions = this.chunkSubdivisions+(this.crossingSub);

	//	finalChunkSize = this.chunkSize+( ((this.chunkSize/this.chunkSubdivisions)*(this.crossingSub*2)) /2);
	

		this.geometry = new THREE.PlaneGeometry( this.chunkSize, this.chunkSize, this.chunkSubdivisions, this.chunkSubdivisions );
		
		this.material = new THREE.MeshPhongMaterial( {
		//	color : new THREE.Color( 0xFFFFFF ).setRGB(Math.random(),Math.random(),Math.random()),
			shading: THREE.FlatShading,
			vertexColors: THREE.VertexColors,
			shininess: 0,
			transparent : false,
			opacity : 0.7,
			side : THREE.DoubleSide
		} );

		this.chunkMesh = new THREE.Mesh( this.geometry, this.material );

		this.chunkMesh.rotation.x = deg(-90);
		this.chunkMesh.position.x = this.chunkX * this.chunkSize;
		this.chunkMesh.position.z = this.chunkZ * this.chunkSize;

		this.chunkMesh.userData = {chunk : {x: chunkX, z : chunkZ}};





		// STORE VERTICES
		for(var i = 0; i<this.geometry.vertices.length; i++){
			x = ( i % (this.chunkSubdivisions+1) ) ;
			y = Math.floor( i / (this.chunkSubdivisions+1) );
			
			if(this.vertices[x] === undefined){
				this.vertices[x] = [];
			}
			
			this.vertices[x][y] = this.geometry.vertices[i];

		}

		this.waveIt(0);

		this.colorise();

	}

	this.delete = function(){

	}

	this.writeVertices = function(callback){
		for(var x = 0; x<this.chunkSubdivisions+1; x++){
			for(var y = 0; y<this.chunkSubdivisions+1; y++){

				xPos = ( ( this.chunkX * this.chunkSize ) + ( x * (this.chunkSize/this.chunkSubdivisions) ) ) ;
				zPos = ( ( this.chunkZ * this.chunkSize ) + ( y * (this.chunkSize/this.chunkSubdivisions) ) ) ;

				this.vertices[x][y].z = callback(this)*this.maxHeight;

			}
		}
	}


	this.update = function(delta){
	//	this.waveIt(delta);
	//	this.colorise();
}

this.waveIt = function(delta){

	this.writeVertices( function(that){
	
		biomeFrequance = 10000;
		landFrequance = 500;
		landNoiseFrequance = 16;

		biome = noise.simplex2(xPos / biomeFrequance , zPos / biomeFrequance );
		land = noise.simplex2(xPos / landFrequance , zPos / landFrequance );
		landNoise = noise.simplex2(xPos / landNoiseFrequance, zPos / landNoiseFrequance );

		finalNoise = (biome+1/2)*((land+1)/2)*((land+1)/2)*((landNoise+1)/32)*16;

		return finalNoise;

	});
	this.geometry.verticesNeedUpdate = true;

}


this.colorise = function(){
	for ( var i = 0; i < this.geometry.faces.length; i ++ ) {

		face  = this.geometry.faces[ i ];

		vertexA = this.geometry.vertices[ face[ 'a' ] ];
		vertexB = this.geometry.vertices[ face[ 'b' ] ];
		vertexX = this.geometry.vertices[ face[ 'c' ] ];
		faceHignessFactor = ( (vertexA.z + vertexB.z + vertexX.z) / 3 ) / this.maxHeight;

	//	faceHignessFactor = (faceHignessFactor/4) + 0.2; // GREEN RADIANT
		face.color.setHSL( faceHignessFactor, 0.5, 0.5 );
		this.geometry.colorsNeedUpdate = true;

	}


}


this.generateChunk();
}



