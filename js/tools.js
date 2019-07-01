deg = function(deg){
	return ((deg/180)*Math.PI);
}


SelectorTool = function( color, chunkSize, maxHeight){

	var geometry = new THREE.BoxGeometry( chunkSize, maxHeight, chunkSize );
	var material = new THREE.MeshBasicMaterial( {
		color: color,
		transparent: true,
		opacity:0.5
	} );

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.y = maxHeight/2;

	scene.add( this.mesh );

	this.move = function(x,z){
		this.mesh.position.x = x * chunkSize;
		this.mesh.position.z = z * chunkSize;
	}
	
}


pointViewer = function( x, z){

	var geometry = new THREE.SphereGeometry( 10, 4, 4 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.x = x;
	sphere.position.z = z;
	sphere.position.y = 500;

	scene.add( sphere );

}



function circleGridHelper(radius, radials, circles, color1, color2) {

	var radials = radials || 1;
	var circles = circles || 1;
	color1 = new THREE.Color(color1 !== undefined ? color1 : 0x444444);
	color2 = new THREE.Color(color2 !== undefined ? color2 : 0x888888);

	var step = radius / circles;
	var degrees = 360 / radials;
	var vertices = [],
		colors = [];
	//create the radials
	for (var i = 0, j = 0; i <= radials; i++) {
		var rAngle = THREE.Math.degToRad(degrees * i);
		//console.log(rAngle);
		var vec3 = new THREE.Vector3(radius, 0, 0);
		vec3.applyAxisAngle(new THREE.Vector3(0, 0, 1), rAngle);
		vertices.push(0, 0, 0, vec3.x, 0, vec3.y);
		var color = i & 1 ? color1 : color2;
		color.toArray(colors, j);
		j += 3;
		color.toArray(colors, j);
		j += 3;
	}
	//create the circles
	var offset = colors.length;
	for( var i = 0; i <= circles; i++) {
		var curve = new THREE.EllipseCurve(
			0, 0, // ax, aY
			(radius - (step * i)), (radius - (step * i)), // xRadius, yRadius
			0, 2 * Math.PI, // aStartAngle, aEndAngle
			false, // aClockwise
			0 // aRotation 
		);

		var path = new THREE.Path(curve.getSpacedPoints(100));
		var geometry = path.createSpacedPointsGeometry(100);
		geometry.rotateX(THREE.Math.degToRad(90));
		var color = i & 1 ? color1 : color2;
		offset = colors.length;
		for ( var ii = 0, j = 0; ii < geometry.vertices.length-1; ii++ ) {
			vertices.push(
				geometry.vertices[ii].x,
				geometry.vertices[ii].y,
				geometry.vertices[ii].z,
				geometry.vertices[ii+1].x,
				geometry.vertices[ii+1].y,
				geometry.vertices[ii+1].z);
			//var color = new THREE.Color(0xff0000);
			color.toArray(colors, j + offset);
			j += 3;
			color.toArray(colors, j + offset);
			j += 3;
		}
		//close the circle by using the last/first vertex pair too
		vertices.push(
			geometry.vertices[geometry.vertices.length-1].x,
			geometry.vertices[geometry.vertices.length-1].y,
			geometry.vertices[geometry.vertices.length-1].z,
			geometry.vertices[0].x,
			geometry.vertices[0].y,
			geometry.vertices[0].z
		);
		color.toArray(colors, j + offset);
		j += 3;
		color.toArray(colors, j + offset);
		j += 3;
	}
	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute('position', new THREE.Float32Attribute(vertices, 3));
	geometry.addAttribute('color', new THREE.Float32Attribute(colors, 3));

	var material = new THREE.LineBasicMaterial({
		vertexColors: THREE.VertexColors
	});
	var line = new THREE.LineSegments(geometry, material);
	scene.add(line);

}
