function World(options)
{
  this.position = { x: 0, z: 0 };
  this.group = new THREE.Group();

  this.proceduland = new Proceduland({
    chunkSize: 500,
    maxHeight: 200,
    chunksDistance: 5,
    levelMax: 10
  });
  this.group.add(this.proceduland.group);
  this.proceduland.requestChunks();

  // Sun

  this.sunLight = new THREE.DirectionalLight( 0xffffff, 1 );
  this.sunLight.position.set( 150, 70, 0 );

this.sunLight.castShadow = true;
this.sunLight.shadow.mapSize.width = 512;  // default
this.sunLight.shadow.mapSize.height = 512; // default
this.sunLight.shadow.camera.near = 0.5;    // default
this.sunLight.shadow.camera.far = 5000;     // default

  this.group.add( this.sunLight );

  var helper = new THREE.DirectionalLightHelper( this.sunLight, 50 );
  this.group.add( helper );

  this.ambiantLight= new THREE.AmbientLight( 0xffffff, 0.1 ); // soft white light
  this.group.add( this.ambiantLight);


}

World.prototype = {

  move( x, z )
  {
    this.position.x += x;
    this.position.z += z;
    this.proceduland.move(x, z);
    this.proceduland.requestChunks();
  },

  changePos(newPos){
    this.sunLight.position.x = newPos.x;
    this.sunLight.position.y = newPos.y;
    this.sunLight.position.z = newPos.z;
    this.sunLight.lookAt({ x: 0, y: 0, z:0 })
  },

  update()
  {
    this.proceduland.update();
  }
}
