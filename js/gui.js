class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}


initGUI = function(){

  let gui = new dat.GUI( { width: 300 } );

  // - TEXTURE -----------------------------------------------------
  
  let textureGui = gui.addFolder('Texture');
  textureGui.open();
  texture = {
    repeat: 1
  }

  textureGui.add(texture, 'repeat', 1, 100).step(1).onChange( (value) => {
    map.repeat.set(value, value);
    }
  );
  // - MATERIAL ------------------------------------------------------

  let materialGui = gui.addFolder('Material');
  materialGui.open();
  materialGui.add(terrain_material, 'shininess', 0, 100).step(1);

  materialGui.addColor(new ColorGUIHelper(terrain_material, 'specular'), 'value').name('Specular');

  materialGui.add(terrain_material, 'wireframe').onChange( (value) => {
    if (value)
    {
      
    }
  });

  // - Light --------------------------------------------------

  console.log(world.sunLight.color)

  let lightGui = gui.addFolder('Light');
  lightGui.open();


  lightGui.addColor(new ColorGUIHelper(world.sunLight, 'color'), 'value')
    .name('Sun Light');
  lightGui.add(world.sunLight, 'intensity', 0, 10).step(0.1);

  lightGui.addColor(new ColorGUIHelper(world.ambiantLight, 'color'), 'value')
    .name('Ambiant');
  lightGui.add(world.ambiantLight, 'intensity', 0, 1).step(0.01);
  // - FOG --------------------------------------------------

  let fogGui = gui.addFolder('Fog');
  fogGui.open();

  class FogGUIHelper {
    constructor(fog, backgroundColor) {
      this.fog = fog;
      this.backgroundColor = backgroundColor;
    }
    get near() {
      return this.fog.near;
    }
    set near(v) {
      this.fog.near = v;
      this.fog.far = Math.max(this.fog.far, v);
    }
    get far() {
      return this.fog.far;
    }
    set far(v) {
      this.fog.far = v;
      this.fog.near = Math.min(this.fog.near, v);
    }
    get color() {
      return `#${this.fog.color.getHexString()}`;
    }
    set color(hexString) {
      this.fog.color.set(hexString);
      this.backgroundColor.set(hexString);
    }
  }

  const near = -10000;
  const far = 10000;

  const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);

  fogGui.add(fogGUIHelper, 'near', near, far).listen();
  fogGui.add(fogGUIHelper, 'far', near, far).listen();
  fogGui.addColor(fogGUIHelper, 'color');




  // - PROCEDULAND ---------------------------------------------------


  let procedulandGUI = gui.addFolder('Proceduland');
  procedulandGUI.open();

  let proData = world.proceduland;

  procedulandGUI.add(proData, 'levelMax', 1, 25).step(1).onChange( () => {
    proData.requestChunks()
  });

  procedulandGUI.add(proData, 'chunksDistance', 1, 20).step(1).onChange( () => {
    proData.requestChunks()
  });

  procedulandGUI.add(proData, 'chunkSize', 0, 1000).onChange(() => {
    proData.group.scale.set( proData.chunkSize, proData.maxHeight, proData.chunkSize)
  });

  procedulandGUI.add(proData, 'maxHeight', 1, 1000).onChange(() => {
    proData.group.scale.set( proData.chunkSize, proData.maxHeight, proData.chunkSize)
  });
}

