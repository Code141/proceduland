/*
groundMaterial = new THREE.MeshLambertMaterial( {
		emissive : 0x050505,
		vertexColors : THREE.VertexColors,
		transparent : false,
		opacity : 0.2,
		side : THREE.BackSide,
		wireframe : false
	} );
 */
waterMaterial = new THREE.MeshBasicMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.7
} );

function setGradient(geometry, colors, axis, reverse) {

	geometry.computeBoundingBox();

	var bbox = geometry.boundingBox;

	bbox.min.y = -1;
	bbox.max.y = 1;

	var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
	var vertexIndices = ['a', 'b', 'c'];
	var face, vertex, normalized = new THREE.Vector3(),
		normalizedAxis = 0;

	for (var c = 0; c < colors.length - 1; c++)
	{
		var colorDiff = colors[c + 1].stop - colors[c].stop;
		for (var i = 0; i < geometry.faces.length; i++)
		{
			face = geometry.faces[i];
			for (var v = 0; v < 3; v++)
			{
				vertex = geometry.vertices[face[vertexIndices[v]]];
				normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[axis];
				if (reverse)
				{
					normalizedAxis = 1 - normalizedAxis;
				}
				if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop)
				{
					var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
					face.vertexColors[v] = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
				}
			}
		}
	}
}

var mat = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
	side : THREE.BackSide,
});


