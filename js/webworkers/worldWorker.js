importScripts(
  'bone.js',
  'chunk.js',
  '../algo/perlin.js',
  'landGeometry.js',
  '../algo/andresCircle.js'
);

ChunksOverseer = function(levelMax){
  this.chunks = [];
  this.position = { x : 0, z : 0 };
  this.levelMax = levelMax;
  this.bone = new Bone(levelMax);
}

ChunksOverseer.prototype = {

  initChunk : function(x, z)
  {
    if (this.chunks[x] == undefined)
      this.chunks[x] = [];
    if (this.chunks[x][z] == undefined)
      this.chunks[x][z] = new Chunk(x, z, this.bone.info);
  },

  link_neighbour : function(x, z)
  {
    if (this.chunks[x][z + 1])
      this.chunks[x][z].neighbourSouth = this.chunks[x][z + 1];

    if (this.chunks[x][z - 1])
      this.chunks[x][z].neighbourNorth = this.chunks[x][z - 1];

    if (this.chunks[x - 1] && this.chunks[x - 1][z])
      this.chunks[x][z].neighbourEst = this.chunks[x - 1][z];

    if (this.chunks[x + 1] && this.chunks[x + 1][z])
      this.chunks[x][z].neighbourWest = this.chunks[x + 1][z];
  },

  get : function(list)
  {
    var tstart = performance.now();
    for (let i = 0; i < list.length; i++)
    {
      let x = list[i].x;
      let z = list[i].z;
      let hypo = list[i].hypo;

      this.initChunk(x, z);



      let level = Math.floor(this.levelMax - hypo / 2);
      if (level < 1)
        level = 1;
      this.chunks[x][z].set_level(level);
    }

    for (let i = 0; i < list.length; i++)
    {
      let x = list[i].x;
      let z = list[i].z;
      this.link_neighbour(x, z);
    }

    for (let i = 0; i < list.length; i++)
    {
      let x = list[i].x;
      let z = list[i].z;
      let hypo = list[i].hypo;

      let level = Math.floor(this.levelMax - hypo / 2);
      if (level < 1)
        level = 1;

      this.chunks[x][z].resolved = new Promise((resolve, reject) => {
        this.chunks[x][z].break_all(hypo, level);
        resolve();
      })

      pro = overseer.does_neighbour_resolved(x, z);
      this.chunks[x][z].resolved.then(() => {
        Promise.all(pro)
          .then(() => {
              this.chunks[x][z].clean(level);
              this.chunks[x][z].realoc();
              this.chunks[x][z].send();
          })
          .catch((error) => {
            console.log(`Error in promises ${error}`)
          })
      })
    }

    var tend = performance.now();
    console.log( list.length, "chunks FINISHED IN", (tend - tstart));

  },

  does_neighbour_resolved : function(x, z)
  {
    promises = [];

    if (this.chunks[x - 1])
    {
      if (this.chunks[x - 1][z - 1])
        promises.push(this.chunks[x - 1][z - 1].resolved);
      if (this.chunks[x - 1][z])
        promises.push(this.chunks[x - 1][z].resolved);
      if (this.chunks[x - 1][z + 1])
        promises.push(this.chunks[x - 1][z + 1].resolved);
    }

    if (this.chunks[x][z - 1])
      promises.push(this.chunks[x][z - 1].resolved);
    if (this.chunks[x][z + 1])
      promises.push(this.chunks[x][z + 1].resolved);

    if (this.chunks[x + 1])
    {
      if (this.chunks[x + 1][z - 1])
        promises.push(this.chunks[x + 1][z - 1].resolved);
      if (this.chunks[x + 1][z])
        promises.push(this.chunks[x + 1][z].resolved);
      if (this.chunks[x + 1][z + 1])
        promises.push(this.chunks[x + 1][z + 1].resolved);
    }

    return (promises);
  },

}

onmessage = function(e) {
  order = e.data;

  switch(order.type)
  {
    case "init":
      overseer = new ChunksOverseer(order.levelMax);
      break;
    case "request_chunks_list":
      overseer.position.x = order.position.x;
      overseer.position.z = order.position.z;
      overseer.get(order.list);
      break;
    default:
      console.log("ORDER ERROR");
      console.log(order);
  }
}

