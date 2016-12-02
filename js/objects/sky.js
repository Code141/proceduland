var sky, sunSphere, sunlight;

function Sky(){

	this.sky = new THREE.Sky();
	scene.add( this.sky.mesh );
	
	// Add Sun Helper
	sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700000;
	sunSphere.visible = false;
	scene.add( sunSphere );

	this.sunlight = new THREE.PointLight( 0xffffff,2.5, 4000000 );
	this.sunlight.position.set( 0, 100, 100 );
	scene.add(this.sunlight);

	this.changePos = function(newPos){
		this.sunlight.position.x = newPos.x;
		this.sunlight.position.y = newPos.y;
		this.sunlight.position.z = newPos.z;
	}

}

