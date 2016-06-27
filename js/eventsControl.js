function keyboardState(){
	keyboard.update();

	if ( keyboard.down("Z")){ 
		world.move( 0, +1 );
	}
	if ( keyboard.down("S")){ 
		world.move( 0, -1 );
	}
	if ( keyboard.down("Q")){ 
		world.move( +1, 0 );
	}
	if ( keyboard.down("D")){ 
		world.move( -1, 0 );
	}
	if ( keyboard.down("W")){ 
		wireFrame();
	}
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, camera );

	// See if the ray from the camera into the world hits one of our meshes
	var intersects = raycaster.intersectObject( world.group, true );
	// Toggle rotation bool for meshes that we clicked
	
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ){
				INTERSECTED.material.wireframe = false;

			};
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.wireframe = true;
		}
	} else {

		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

	}

}

function onMouseClick( event ) {

}

findFace = function(faceIndex, btt){
	if(btt.faceIndex == faceIndex){
		return btt;
	}else if(btt.leftChildren != undefined && btt.rightChildren != undefined){
		findFace(faceIndex, btt.leftChildren);
		findFace(faceIndex, btt.rightChildren);
	}else{
		return;
	}
}

wireFrame = function(){

	scene.traverse (function (object){
		if(object.material){
			if(object.material.wireframe == true){
				object.material.wireframe = false;
			}else{
				object.material.wireframe = true;
			}
		}
	}, true);

}