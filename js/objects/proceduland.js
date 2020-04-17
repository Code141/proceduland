function Proceduland(options)
{

  this.chunkSize = options.chunkSize;
  this.maxHeight = options.maxHeight;
  this.chunksDistance = options.chunksDistance;
  this.levelMax = options.levelMax;

  this.chunks = [];
  this.position = { x: 0, z: 0 };
  this.group = new THREE.Group();

  this.group.scale.set(this.chunkSize, this.maxHeight, this.chunkSize);

  this.worker_init();
}

Proceduland.prototype = {

  worker_init()
  {
    this.nb_vertices = 0;

    if (this.ChunksWorker)
      this.ChunksWorker.terminate();

    this.ChunksWorker = new Worker("js/webworkers/worldWorker.js");

    this.ChunksWorker.onmessage = (e) => {
      r = e.data;
      switch(r.type) {
        case "chunk_refresh" :
          this.newChunk(r.chunk.x, r.chunk.z);
          this.chunks[r.chunk.x][r.chunk.z].updateAttribute(r.data);
          break;
        default:
          console.log("WORLD WORKER RESPONSE ERROR");
      }
    };

    this.ChunksWorker.onerror = function(error) {
      console.error(error);
    };

  },

  move( x, z )
  {
    this.position.x += x;
    this.position.z += z;

    this.requestChunks();
  },

  requestChunks()
  {
    let list = andresList(this.chunksDistance, this.position.x, this.position.z);
    this.deleteOldChunks(list);
    //    list = [{ hypo: 1, x: 0, z:0 }];

    for (var i = 0; i < list.length; i++)
      this.newChunk(list[i].x, list[i].z);

    minimap.chunk_list = list;
    minimap.refresh_chunks();
    minimap.draw();

    this.ChunksWorker.postMessage( {
      type : "request_chunks_list",
      list : list,
      levelMax: this.levelMax,
      position :
      {
        x : this.position.x,
        z : this.position.z
      }
    });
  },

  deleteOldChunks(list)
  {
    for (let [x, chunksX] of Object.entries(this.chunks))
    {
      for (let [z, chunlXZ] of Object.entries(chunksX))
      {
        let existe = false;
        for (var i = 0; i < list.length; i++)
          if (list[i].x == x && list[i].z == z)
            existe = true;
        if (!existe)
        {
          this.group.remove(this.chunks[x][z].group);
          this.chunks[x][z].destroy();
          delete this.chunks[x][z];
        }
      }
    }
  },

  newChunk(x, z)
  {
    if (!this.chunks[x])
      this.chunks[x] = [];

    if (!this.chunks[x][z])
    {
      this.chunks[x][z] = new chunk(x, z);

      group = this.chunks[x][z].group;
      group.position.x = x;
      group.position.z = z;

      this.group.add(group);
    }
    else
      this.chunks[x][z].state_cube("loading");
  },

  update()
  {

    for (let [x, chunksX] of Object.entries(this.chunks))
    {
      for (let [z, chunlXZ] of Object.entries(chunksX))
      {
        chunlXZ.update();
      }
    }
  }
}
