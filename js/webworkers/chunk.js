let Chunk = function(x, z, bone)
{
  this.x = x;
  this.z = z;
  this.bone = bone;
  this.info = null;

  this.level = 0;

  this.vue_vertices_x = [];
  this.vue_vertices_y = [];
  this.vue_vertices_z = [];

  this.vue_colors = [];

  this.breaked_bitmap = [];

  this.neighbourNorth = null;
  this.neighbourSouth = null;
  this.neighbourWest = null;
  this.neighbourEst = null;
}

Chunk.prototype = {

  set_layer_deepness(level) {
    this.info = this.bone.info;

    if (level > this.level)
    {
      for (let l = this.level; l < this.info.length; l++)
        this.init_layer(l);
      this.level = level;
    }

    for (let l = 0; l <= this.level; l++)
      for(let i = 0, ll = this.breaked_bitmap[l].length; i < ll; i++)
        this.breaked_bitmap[l][i] = 0;
    // ELSE DESTRUCT LAYERS OR STORE IT ON HDD
    // FREE MEMORY

    for(let i = 0, l = this.breaked_bitmap[0].length; i < l; i++)
      this.breaked_bitmap[0][i] = 1;
  },

  init_layer(level) {
    let info = this.info[level];
    this.vue_vertices_y[level] = new Float32Array(info.v.nb);
    this.vue_vertices_x[level] = this.info[level].v.data_x;
    this.vue_vertices_z[level] = this.info[level].v.data_z;

    this.vue_colors[level] = new Uint8Array(info.v.nb * 3);
    this.breaked_bitmap[level] = new Uint8Array(info.f.nb);

    for (let i = 0, j = 0; i < info.v.nb; i++, j += 3)
    {
      pro = procedural(
        this.vue_vertices_x[level][i] + this.x,
        this.vue_vertices_z[level][i] + this.z
      );

      this.vue_vertices_y[level][i] = pro.height;

      this.vue_colors[level][j + 0] = pro.color.r;
      this.vue_colors[level][j + 1] = pro.color.g;
      this.vue_colors[level][j + 2] = pro.color.b;
    }
  },

  get_vertice_from_layer(vertice) {
    let i = this.info.length - 1;
    while (vertice < this.info[i].v.offset)
      i--;
    return (this.vue_vertices_y[i][vertice - this.info[i].v.offset]);
  },

  does_break(parents_faces, hypo, real, v) {
    if (this.x < 0)
      return (true);
    v1 = this.get_vertice_from_layer(parents_faces[v + 1]);
    v2 = this.get_vertice_from_layer(parents_faces[v + 2]);
    vr = this.get_vertice_from_layer(real);

    delta = Math.abs((( v1 + v2 ) / 2) - vr);
    if ( (delta * 400) / (hypo + 1)> 1)
      return (true);

    return (false);
  },

  break_all(hypo, level) {
    for (let l = level; l > 0; l--)
    {
      i = this.info[l];
      let indice = i.indice;
      parents_faces = this.info[l - 1].f.data;

      if (l % 2)
      {
        for (let z = 0; z < indice; z++) {
          for (let x = 0; x < indice; x++) {

            decalage = i.v.offset + x + (z * indice);
            dec_f_2 = (x + z * indice) * 2 * 3;
            if (this.does_break(parents_faces, hypo, decalage, dec_f_2))
              this.break_Diag(l, x, z);
          }
        }
      }
      else
      {
        let ligne2 = (2 * indice) + 1;

        for (let z = 0; z < indice; z++) {
          for (let x = 0; x < indice; x++) {

            let decalage = i.v.offset + x + (z * ligne2);
            let dec_f_2 = (x + z * indice) * 4 * 3;

            if (this.does_break(parents_faces, hypo, decalage, dec_f_2))
              this.break_N(l, x, z);
            if (this.does_break(parents_faces, hypo, decalage + indice, dec_f_2 + 3))
              this.break_E(l, x, z);
            if (this.does_break(parents_faces, hypo, decalage + indice + 1, dec_f_2 + 6))
              this.break_W(l, x, z);
            if (this.does_break(parents_faces, hypo, decalage + ligne2, dec_f_2 + 9))
              this.break_S(l, x, z);
          }
        }
      }
    }
  },

  break_Diag(l, x, z) {
    let indice = this.info[l].indice;
    let breaked = this.breaked_bitmap[l];
    let dec_f_1 = (x + z * indice) * 4;

    if ( breaked[dec_f_1 + 0] && breaked[dec_f_1 + 1]
      && breaked[dec_f_1 + 2] && breaked[dec_f_1 + 3])
      return;

    // CHILDREN && NEIGNBOUR
    breaked[dec_f_1 + 0] = 1; // NORTH
    breaked[dec_f_1 + 1] = 1; // WEST
    breaked[dec_f_1 + 2] = 1; // EAST
    breaked[dec_f_1 + 3] = 1; // SOUTH

    if (l > 1)
    {
      // NEED PATH HERE
      // SEEMS TO BREAK TOO MUCH
      x = Math.floor(x/2);
      z = Math.floor(z/2);
      // if (((x % 2) + (z % 2)) % 2)
      this.break_N(l - 1, x, z);
      this.break_E(l - 1, x, z);
      this.break_W(l - 1, x, z);
      this.break_S(l - 1, x, z);
    }
  },

  break_N(l, x, z) {
    let indice = this.info[l].indice;
    let breaked = this.breaked_bitmap[l];
    let dec_f_1a = (x + (z * indice * 2)) * 4;
    let c1 = dec_f_1a + 0;
    let c2 = dec_f_1a + 2;

    if (breaked[c1] && breaked[c2])
      return

    breaked[c1] = 1; // Right 
    breaked[c2] = 1; // Left 
    this.break_Diag(l - 1, x, z);

    if (z > 0)
      this.break_S(l, x, z - 1);
    else if (this.neighbourNorth)
      this.neighbourNorth.break_S( l, x, this.neighbourNorth.info[l].indice - 1);
  },

  break_S(l, x, z) {
    let indice = this.info[l].indice;
    let breaked = this.breaked_bitmap[l];
    let dec_f_1b = (x + (z * indice * 2) + indice) * 4;
    let c1 = dec_f_1b + 3;
    let c2 = dec_f_1b + 1;

    if (breaked[c1] && breaked[c2])
      return

    breaked[c1] = 1; // Right
    breaked[c2] = 1; // Left

    this.break_Diag(l - 1, x, z);

    if (z + 1 < indice)
      this.break_N(l, x, z + 1);
    else if (this.neighbourSouth)
      this.neighbourSouth.break_N(l, x, 0);
  },

  break_E(l, x, z) {
    let indice = this.info[l].indice;
    let breaked = this.breaked_bitmap[l];
    let dec_f_1a = (x + (z * indice * 2)) * 4;
    let dec_f_1b = (x + (z * indice * 2) + indice) * 4;
    let c1 = dec_f_1a + 1;
    let c2 = dec_f_1b + 0;

    if (breaked[c1] && breaked[c2])
      return

    breaked[c1] = 1; // Right 
    breaked[c2] = 1; // Left 
    this.break_Diag(l - 1, x, z);

    if (x > 0)
      this.break_W(l, x - 1, z);
    else if (this.neighbourEst)
      this.neighbourEst.break_W( l, this.neighbourEst.info[l].indice - 1, z);
  },

  break_W(l, x, z) {
    let indice = this.info[l].indice;
    let breaked = this.breaked_bitmap[l];
    let dec_f_1a = (x + (z * indice * 2)) * 4;
    let dec_f_1b = (x + (z * indice * 2) + indice) * 4;
    let c1 = dec_f_1a + 3;
    let c2 = dec_f_1b + 2;

    if (breaked[c1] && breaked[c2])
      return

    breaked[c1] = 1; // Right 
    breaked[c2] = 1; // Left 
    this.break_Diag(l - 1, x, z);

    if (x + 1 < indice)
      this.break_E(l, x + 1, z);
    else if (this.neighbourWest)
      this.neighbourWest.break_E(l, 0, z);
  },

  clean(level) {
    for (let l = 1; l <= level; l++)
    {
      last_i = this.info[l - 1];
      i = this.info[l];

      let indice = i.indice;

      if (l % 2)
      {
        for (let z = 0; z < indice; z++) {
          for (let x = 0; x < indice; x++) {
            dec_f_1 = x + z * indice;
            dec_f_1 *= 4;

            dec_f_2 = x + z * indice;
            dec_f_2 *= 3 * 2;

            // set parents
            // set self
            if ( this.breaked_bitmap[l][dec_f_1 + 0] || this.breaked_bitmap[l][dec_f_1 + 1]
              || this.breaked_bitmap[l][dec_f_1 + 2] || this.breaked_bitmap[l][dec_f_1 + 3])
            {
              this.breaked_bitmap[l - 1][dec_f_2 / 3] = 0;
              this.breaked_bitmap[l - 1][dec_f_2 / 3 + 1] = 0;
            }
          }
        }
      }
      else
      {
        let ligne1 = (1 * indice);
        let ligne2 = (2 * indice) + 1;

        for (let z = 0; z < indice; z++) {
          for (let x = 0; x < indice; x++) {

            decalage = i.v.offset + x + (z * ligne2);

            dec_f_2 = x + z * indice;
            dec_f_2 *= 3 * 4;

            dec_f_1a = x + z * indice * 2;
            dec_f_1a *= 4;

            dec_f_1b =  x + z * indice * 2 + indice;
            dec_f_1b *= 4;

            if (this.breaked_bitmap[l][dec_f_1a + 0] || this.breaked_bitmap[l][dec_f_1a + 2])
              this.breaked_bitmap[l - 1][dec_f_2 / 3] = 0;

            if (this.breaked_bitmap[l][dec_f_1a + 1] || this.breaked_bitmap[l][dec_f_1b + 0])
              this.breaked_bitmap[l - 1][dec_f_2 / 3 + 1] = 0;

            if (this.breaked_bitmap[l][dec_f_1a + 3] || this.breaked_bitmap[l][dec_f_1b + 2])
              this.breaked_bitmap[l - 1][dec_f_2 / 3 + 2] = 0;

            if (this.breaked_bitmap[l][dec_f_1b + 3] || this.breaked_bitmap[l][dec_f_1b + 1])
              this.breaked_bitmap[l - 1][dec_f_2 / 3 + 3] = 0;
          }
        }
      }
    }
  },

  count_visible_faces(level) {
    let nb_f = 0;
    //for (let i = 0, l = this.breaked_bitmap.length; i < l; i++)
    for (let i = 0; i <= level; i++)
    {
      let breaked = this.breaked_bitmap[i];
      for (let j = 0, ll = breaked.length; j < ll; j++)
        if (breaked[j])
          nb_f++;
    }
    return (nb_f);
  },

  remap_faces(level, new_vertice) {
    for (let i = 0, l = new_vertice.length ; i < l; i++)
      new_vertice[i] = 0xFFFFFFFF;

    let nb_v = 0;
    let f = 0;
    for (let l = 0; l <= level; l++)
    {
      let data = this.info[l].f.data;
      let breaked = this.breaked_bitmap[l];

      for (let i = 0, ll = breaked.length, b = 0; i < ll; i++, b += 3)
        if (breaked[i])
        {
          if (new_vertice[data[b + 0]] == 0xFFFFFFFF) {
            this.faces[f + 0] = nb_v;
            new_vertice[data[b + 0]] = nb_v++;
          } else {
            this.faces[f + 0] = new_vertice[data[b + 0]];
          }

          if (new_vertice[data[b + 1]] == 0xFFFFFFFF) {
            this.faces[f + 1] = nb_v;
            new_vertice[data[b + 1]] = nb_v++;
          } else {
            this.faces[f + 1] = new_vertice[data[b + 1]];
          }

          if (new_vertice[data[b + 2]] == 0xFFFFFFFF) {
            this.faces[f + 2] = nb_v;
            new_vertice[data[b + 2]] = nb_v++;
          } else {
            this.faces[f + 2] = new_vertice[data[b + 2]];
          }

          f += 3;
        }
    }
    return nb_v;
  },

  get_layer_from_vertice(vertice) {
    let i = this.info.length - 1;
    while (vertice < this.info[i].v.offset)
      i--;
    return (i);
  },

  remap_vertices(new_vertice) {
    for (let i = 0; i < new_vertice.length; i++)
    {
      let current_vertice = new_vertice[i];
      if (current_vertice != 0xFFFFFFFF)
      {
        let pos = current_vertice * 3;

        layer = this.get_layer_from_vertice(i);
        relI = i - this.info[layer].v.offset;

        let x = this.vue_vertices_x[layer][relI];
        let y = this.vue_vertices_y[layer][relI];
        let z = this.vue_vertices_z[layer][relI];

        this.send_vertices[pos + 0] = x;
        this.send_vertices[pos + 1] = y;
        this.send_vertices[pos + 2] = z;

        this.send_colors[pos + 0] = this.vue_colors[layer][relI * 3];
        this.send_colors[pos + 1] = this.vue_colors[layer][relI * 3 + 1];
        this.send_colors[pos + 2] = this.vue_colors[layer][relI * 3 + 2];

        this.send_normals[pos + 0] = 0;
        this.send_normals[pos + 1] = 1;
        this.send_normals[pos + 2] = 0;

        this.uvs[current_vertice * 2 + 0] = x;
        this.uvs[current_vertice * 2 + 1] = z;
      }
    }
  },

  realoc(level) {
    let nb_f = this.count_visible_faces(level);

    new_vertice = new Uint32Array(
      this.info[level].v.offset + this.info[level].v.nb
    );

    this.faces = new Uint32Array(nb_f * 3 );

    let nb_v = this.remap_faces(level, new_vertice);

    this.send_vertices = new Float32Array(nb_v * 3);
    this.send_normals = new Float32Array(nb_v * 3);
    this.send_colors = new Uint8Array(nb_v * 3);
    this.uvs = new Float32Array(nb_v * 2);

    this.remap_vertices(new_vertice);
  },

  send() {
    postMessage({
      type : "chunk_refresh",
      chunk : { x : this.x, z : this.z },
      data : {
        vertices: this.send_vertices,
        faces: this.faces,
        vertex_normals: this.send_normals,
        colors: this.send_colors,
        uvs: this.uvs
      }
    });
  }
};
