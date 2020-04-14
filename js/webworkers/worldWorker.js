importScripts(
  'bone.js',
  'chunk.js',
  '../algo/perlin.js',
  'landGeometry.js',
);

ChunksOverseer = function(){
  this.chunks = [];
  this.position = { x : 0, z : 0 };
  this.levelMax = 0;
  this.bone = new Bone();
}

ChunksOverseer.prototype = {

  initChunk : function(x, z)
  {
    if (this.chunks[x] == undefined)
      this.chunks[x] = [];
    if (this.chunks[x][z] == undefined)
      this.chunks[x][z] = new Chunk(x, z, this.bone);
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

    this.bone.set_layer_deepness(this.levelMax);

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

      this.chunks[x][z].set_layer_deepness(level);

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

/*
    var t0 = performance.now();
      this.chunks[x][z].break_all(hypo, level);
    var t1 = performance.now();
      this.chunks[x][z].clean(level);
    var t2 = performance.now();
      this.chunks[x][z].realoc(level);
    var t3 = performance.now();
      this.chunks[x][z].send();
    var t4 = performance.now();

    console.log (
      "X", x, "Z", z,
      "BREAK", (t1 - t0),
      "CLEAN", (t2 - t1),
      "REALOC", (t3 - t2),
      "SEND", (t4 - t3)
      );
      */
      this.chunks[x][z].resolved = new Promise((resolve, reject) => {
        this.chunks[x][z].break_all(hypo, level -1); // LEVEL - 1 !
        pro = overseer.does_neighbour_resolved(x, z);
        Promise.all(pro)
          .then(() => {
            this.chunks[x][z].clean(level );
            this.chunks[x][z].realoc(level );
            this.chunks[x][z].send();
          })
          .catch((error) => {
            console.log(`Error in promises ${error}`)
          })
        resolve();
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

overseer = new ChunksOverseer();

onmessage = function(e) {
  order = e.data;

  switch(order.type)
  {
    case "request_chunks_list":
      overseer.position.x = order.position.x;
      overseer.position.z = order.position.z;

      let levelMax = order.levelMax;
      if (levelMax > 24)
        throw "error level max is 24"
      levelMax = (levelMax < 1) ? 1: levelMax;

      overseer.levelMax = levelMax;

      overseer.get(order.list);
      break;
    default:
      console.log("ORDER ERROR");
      console.log(order);
  }
}

