manager = new THREE.LoadingManager();

manager.onLoad = function(){
	console.log("ALL RESOURCES FINE LOADED");
}

manager.onProgress = function(item, loaded, total) {
	console.log(item, loaded, total);
}

manager.onStart = function(item, loaded, total) {
}



loader = new THREE.ColladaLoader(manager);
loader.options.convertUpAxis = true;

function load(name, daePath, size){

	loader.load(daePath, function(collada) {
		dae = collada.scene;
		if (typeof size != undefined){
			dae.scale.x = dae.scale.y = dae.scale.z = size;
		}

		scene.add(dae.clone());

	}, function(progress) {
	});
}



