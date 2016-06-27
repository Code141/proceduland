MODELS = [];
manager = new THREE.LoadingManager();

manager.onLoad = function(){
	console.log("ALL RESOURCES FINE LOADED");
	init();
}

manager.onProgress = function(item, loaded, total) {
}

manager.onStart = function(item, loaded, total) {
}

loader = new THREE.ColladaLoader(manager);
loader.options.convertUpAxis = true;

function load(name, daePath, size){

	loader.load(daePath, function(collada) {
		dae = collada.scene;
		
		if(typeof size != undefined){
			dae.scale.x = dae.scale.y = dae.scale.z = size;
		}
		MODELS[name] = dae;
	}, function(progress) {
	});
}


load("tinnyHouse", 'models/tinnyHouse.dae', 1);


// FLOOR WOOD
//textureWoodFloor = textureLoader.load( "textures/woodFloor.jpg" );
//		q2 = MODELS["q2"].clone();
//	var geometry = q1.children[0].geometry.clone();
//	var material = q1.children[0].material.clone();
//	frontWoodQ1 = new THREE.Mesh( geometry, material );