water_material = new THREE.MeshPhongMaterial( {
	color: 0x0000ff,
	transparent : true,
	opacity : 0.6
} );

ground_material = new THREE.MeshPhongMaterial({
	vertexColors: THREE.VertexColors,
	//shading: THREE.FlatShading,
	color: 0xffffff,
//	 wireframe: true,
	//transparent : true,
	//opacity : 0.3
});
let name;
let path = 'textures/';

name = '025_KaiMoischCom_Grass_Ground_Mixed_1x1_Seamless_';
//name = '022_KaiMoischCom_Soil_Ground_Mixed_1,5x1,5_Seamless_';
//name = '019_KaiMoischCom_Gravel_Branches_1,5x1,5_Seamless_';
//name = '026_KaiMoischCom_Brick_Wall_Old_1x2_Seamless_';
//name = 'KaiMoischCom_Dirt_Ground_0,5x0,5_Seamless_';
//name = 'KaiMoischCom_Gravel_1,5x1,5_Seamless_';
//name = 'KaiMoischCom_Gravel_1x1_Seamless_';
//name = 'KaiMoischCom_Gravel_Ground_Grass_2x2_Seamless_';
//name = 'KaiMoischCom_Leaves_Ground_2x2_Seamless_';
//name = 'KaiMoischCom_Pine_Forest_Ground_2x2_Seamless_';
name = 'KaiMoischCom_Sand_Footprints1,5x1,5_Seamless_';

let ext = '_1K.png';

var map = new THREE.TextureLoader().load(path + name + 'Albedo' + ext);
var normalMap = new THREE.TextureLoader().load(path + name + 'Normal' + ext);
var bumpMap = new THREE.TextureLoader().load(path + name + 'Height' + ext);
var specularMap = new THREE.TextureLoader().load(path + name + 'Specular' + ext);

let repeat = 10;

map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;
map.repeat.set( repeat, repeat );

normalMap.wrapS = THREE.RepeatWrapping;
normalMap.wrapT = THREE.RepeatWrapping;
normalMap.repeat.set( repeat, repeat );

bumpMap.wrapS = THREE.RepeatWrapping;
bumpMap.wrapT = THREE.RepeatWrapping;
bumpMap.repeat.set( repeat, repeat );

specularMap.wrapS = THREE.RepeatWrapping;
specularMap.wrapT = THREE.RepeatWrapping;
specularMap.repeat.set( repeat, repeat );

var terrain_material = new THREE.MeshPhongMaterial({
	vertexColors: THREE.VertexColors,
  color: 0xffffff,
  specular: 0xffffff,
  shininess: 10,

  map: map,
  specularMap: specularMap,
  normalMap: normalMap,
  bumpMap: bumpMap,
  specularMap: specularMap,
  bumpScale : 0.3,
  
});



state_cube_material = new THREE.MeshBasicMaterial( {
	color: 0xff5500,
	transparent : true,
	opacity : 0.3,
  wireframe: true,
	wireframeLinewidth: 3,
	wireframeLinejoin: 'ound',
} );


