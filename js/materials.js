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

var mat = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
//	color: 0x222222
});

var colors = [ {
		stop: 0,
		color: new THREE.Color(0xCCCCCC)	// WHITE
	}, {
		stop: 0.15,
		color: new THREE.Color(0x555555)	// GreyE
	}, {
		stop: .20,
		color: new THREE.Color(0x555041)	// brown
	}, {
		stop: .35,
		color: new THREE.Color(0x001500)	// dark green
	}, {
		stop: .45,
		color: new THREE.Color(0x114411)	// plain green
	}, {
		stop: .51,
		color: new THREE.Color(0x664c32)	// Sand
	}, {
		stop: .55,
		color: new THREE.Color(0x221100)	// Oceanic floor
	}, {
		stop: 1,
		color: new THREE.Color(0x000000)	// Black
	}
];

function setGradient(geometry, axis, reverse) {
	min = { y: -1 };
	max = { y: 1 };

	var size = new THREE.Vector3().subVectors(max, min);
	var vertexIndices = ['a', 'b', 'c'];
	var face, vertex, normalized = new THREE.Vector3(),

		normalizedAxis = 0;


	vertices = geometry.attributes.position.array;
for (let v = 0; v < vertices.length; v++)
	{

	}

	/*
	for (var c = 0; c < colors.length - 1; c++)
	{
		var colorDiff = colors[c + 1].stop - colors[c].stop;
		for (var i = 0; i < geometry.faces.length; i++)
		{

			face = geometry.faces[i];
			for (var v = 0; v < 3; v++)
			{
				vertex = geometry.vertices[face[vertexIndices[v]]];
				normalizedAxis = normalized.subVectors(vertex, min).divide(size)[axis];
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
	*/
}

