var sky, sunLight, sunlight;

function Sky(){

}

Sky.prototype = {

  changePos(newPos){
    this.sunLight.position.x = newPos.x;
    this.sunLight.position.y = newPos.y;
    this.sunLight.position.z = newPos.z;
    this.sunLight.lookAt({ x: 0, y: 0, z:0 })
  }

}

