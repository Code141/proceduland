
initGUI = function(){
	var gui = new dat.GUI( { width: 300 } );
	//-------------------SKY

	var sunGui = gui.addFolder('Sky');

	var effectController  = {
		turbidity: 10,
		rayleigh: 2,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.8,
		luminance: 1,
		inclination: 0.49, // elevation / inclination
		azimuth: 0.25, // Facing front,
		sun: ! true,
		fog : [ 0, 128, 255 ]
	};

	var distance = 400000;

	function skyGuiChanged() {

		var uniforms = sky.sky.uniforms;
		uniforms.turbidity.value = effectController.turbidity;
		uniforms.rayleigh.value = effectController.rayleigh;
		uniforms.luminance.value = effectController.luminance;
		uniforms.mieCoefficient.value = effectController.mieCoefficient;
		uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

		var theta = Math.PI * ( effectController.inclination - 0.5 );
		var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

		sunSphere.position.x = distance * Math.cos( phi );
		sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
		sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

		sky.changePos(sunSphere.position);
		sunSphere.visible = effectController.sun;
		sky.sky.uniforms.sunPosition.value.copy( sunSphere.position );

		R = effectController.fog[0].toFixed(0);
		G = effectController.fog[1].toFixed(0);
		B = effectController.fog[2].toFixed(0);

		var color = new THREE.Color("rgb("+R+", "+G+", "+B+")");
		scene.fog.color = color;
	}

	sunGui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "luminance", 0.0, 2 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( skyGuiChanged );
	sunGui.add( effectController, "sun" ).onChange( skyGuiChanged );
	sunGui.addColor( effectController, "fog" ).onChange( skyGuiChanged );



	//-------------------WORLD
	
	var worldGui = gui.addFolder('World');

	var worldData  = {
		chunksDistance: 2,
		levelMax: 14,
		chunkSize: 500,
		maxHeight: 200,
		wireframe: false,
		reload: function(){
			scene.remove(world.group);
			world = new World({
				chunkSize: worldData.chunkSize,
				maxHeight: worldData.maxHeight,
				chunksDistance: worldData.chunksDistance,
				levelMax: worldData.levelMax
			});
			scene.add(world.group);
			world.requestChunks();

		}
	};

	worldGui.add(world, 'chunksDistance', 1, 20).step(1).onChange( () => {
    world.requestChunks()
  });

	worldGui.add(world, 'levelMax', 1, 25).step(1).onChange( () => {
    world.requestChunks()
  });

  worldGui.add(world, 'chunkSize', 10, 1000).onChange(() => {
    world.group.scale.set(world.chunkSize, world.maxHeight, world.chunkSize)
  });

	worldGui.add(world, 'maxHeight', 10, 1000).onChange(() => {
    world.group.scale.set(world.chunkSize, world.maxHeight, world.chunkSize)
  });

api = {};
  api.distribution = 90
  worldGui.add( api, 'distribution' ).options( [ 'random', 'weighted' ] ).onChange( 
    () =>{

    world.group.scale.set(world.chunkSize, world.maxHeight, world.chunkSize)
    } );	

	worldGui.add(worldData, 'reload');

}
