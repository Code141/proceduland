water_material = new THREE.MeshPhongMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.6
} );

ground_material = new THREE.MeshLambertMaterial({
	vertexColors: THREE.VertexColors,
	shading: THREE.FlatShading,
	color: 0xffffff,
/*
	wireframe: true,
	transparent : true,
	opacity : 0.3
	*/
});

var map = new THREE.TextureLoader().load('texture/025_KaiMoischCom_Grass_Ground_Mixed_1x1_Seamless_Albedo_1K.jpg');

var normalMap = new THREE.TextureLoader().load('texture/025_KaiMoischCom_Grass_Ground_Mixed_1x1_Seamless_Normal_1K.jpg');
var bumpMap = new THREE.TextureLoader().load('texture/025_KaiMoischCom_Grass_Ground_Mixed_1x1_Seamless_Height_1K.jpg');
var specularMap = new THREE.TextureLoader().load('texture/025_KaiMoischCom_Grass_Ground_Mixed_1x1_Seamless_Specular_1K.jpg');


var terrain_material = new THREE.MeshPhongMaterial({
//	vertexColors: THREE.VertexColors,

  map: map,
  specularMap: specularMap,
  normalMap: normalMap,
  bumpMap: bumpMap,

  color: 0x888888,
  specularMap: specularMap,
  shininess: 10
});



state_cube_material = new THREE.MeshBasicMaterial( {
	color: 0xff5500,
	transparent : true,
	opacity : 0.3,
	wireframeLinewidth: 1,
	wireframeLinejoin: 'round',
	wireframeLineCap: 'round'
} );

