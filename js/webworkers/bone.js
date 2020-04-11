let Bone = function()
{


}

Bone.prototype = {

  set_layer_deepness: function(level)
  {
    this.info = this.get_info(level);


  last = this.info[this.info.length - 1];
  nb_v = last.v.offset + last.v.nb;
  nb_f = last.f.offset + last.f.nb;

  let vertices_x = new ArrayBuffer(nb_v * 4);
  let vertices_z = new ArrayBuffer(nb_v * 4);
  let faces = new ArrayBuffer(nb_f * 3 * 4);

  this.vue_vertices_x = new Float32Array(vertices_x);
  this.vue_vertices_z = new Float32Array(vertices_z);
  this.vue_faces = new Uint32Array(faces);

  for (let l = 0; l < this.info.length; l++)
  {
    i = this.info[l];

    i.v.data_x = new Float32Array(vertices_x, i.v.offset * 4, i.v.nb);
    i.v.data_z = new Float32Array(vertices_z, i.v.offset * 4, i.v.nb);
    i.f.data = new Uint32Array(faces, i.f.offset * 3 * 4, i.f.nb * 3);
  }

    size = 1;
    this.vue_vertices_x.set([ 0, size, 0, size]);
    this.vue_vertices_z.set([ 0, 0, size, size]);
    this.vue_faces.set([1, 0, 3, 2, 3, 0]);

    this.generateLevel(this.info);

  },

  get_info: function (level)
  {
    let info = [];
    let i = 1;
    let v2 = 1

    info.push({ indice: 1,
      v : { nb: 4, offset: 0, },
      f : { nb: 2, offset: 0, }
    });

    info.push({ indice: 1,
      v : { nb: 1, offset: 4, },
      f : { nb: 4, offset: 2, }
    });

    for (let l = 0; l < level - 1; l++)
    {
      let v = 0;
      if (l % 2 == 0)
      {
        indice = Math.pow(2, (l / 2));
        v1 = i * (i + 1) * 2;
        v = v1;
        i *= 2;
      }
      else
      {
        indice = Math.pow(2, ((l + 1) / 2));
        v2 *= 4;
        v = v2;
      }

      last = info[l + 1];

      info.push({
        indice: indice,
        v : {
          nb: v,
          offset: last.v.offset + last.v.nb
        },
        f : {
          nb: last.f.nb * 2,
          offset: last.f.offset + last.f.nb,
        }
      }
      );
    }
    return info;
  },

  generateLevel: function(info)
  {
    for (let l = 1; l < info.length; l++)
    {
      let last_i = info[l - 1];
      let i = info[l];

      let indice = i.indice;
      let data_x = i.v.data_x;
      let data_z = i.v.data_z;

      let child = i.f.data;
      let paren = last_i.f.data;
      let v_offset = i.v.offset;

      if (l % 2)
        this.generateVertices_1(indice, data_x, data_z);
      else
        this.generateVertices_2(indice, data_x, data_z);

      if (l % 2)
        this.generateFace_1(child, paren, indice, v_offset);
      else
        this.generateFace_2(child, paren, indice, v_offset);

    }
  },

  generateVertices_1: function(indice, data_x, data_z)
  {
    let decal = size / (indice * 2);
    let decal_2 = decal * 2;

    for (let z = 0; z < indice; z++)
    {
      let decalage = (z * indice);
      let ligne_height = decal + (decal_2 * z);

      for (let x = 0; x < indice; x++)
      {
        data_x[decalage + x] = decal + (decal_2 * x);
        data_z[decalage + x] = ligne_height;
      }
    }
  },

  generateVertices_2: function(indice, data_x, data_z)
  {
    let decal = size / (indice * 2);
    let decal_2 = decal * 2;

    for (let z = 0, l = indice * 2 + 1; z < l; z++)
    {
      let decalage = (z * indice) + Math.floor(z / 2);
      let ligne_height = decal * z;
      if (z % 2)
      {
        for (let x = 0, ll = indice + 1; x < ll; x++)
        {
          data_x[decalage + x] = decal_2 * x;
          data_z[decalage + x] = ligne_height;
        }
      }
      else
      {
        for (let x = 0; x < indice; x++)
        {
          data_x[decalage + x] = decal_2 * x + decal;
          data_z[decalage + x] = ligne_height;
        }
      }
    }
  },

  generateFace_1: function(child, paren, indice, v_offset)
  {
    for (let z = 0; z < indice; z++)
    {
      for (let x = 0; x < indice; x++)
      {
        let apex = v_offset + x + (z * indice);

        let dec_f_1 = (x + z * indice) * 3 * 4;
        let dec_f_2 = (x + z * indice) * 3 * 2;

        diag = ((x % 2) + (z % 2)) % 2;
        if (diag)
        {
          child[dec_f_1 + 0] = apex;
          child[dec_f_1 + 1] = paren[dec_f_2 + 2];
          child[dec_f_1 + 2] = paren[dec_f_2 + 0];

          child[dec_f_1 + 3] = apex;
          child[dec_f_1 + 4] = paren[dec_f_2 + 0];
          child[dec_f_1 + 5] = paren[dec_f_2 + 1];

          child[dec_f_1 + 6] = apex;
          child[dec_f_1 + 7] = paren[dec_f_2 + 0 + 3];
          child[dec_f_1 + 8] = paren[dec_f_2 + 1 + 3];

          child[dec_f_1 + 9] = apex;
          child[dec_f_1 + 10] = paren[dec_f_2 + 2 + 3];
          child[dec_f_1 + 11] = paren[dec_f_2 + 0 + 3];
        }
        else
        {
          child[dec_f_1 + 0] = apex;
          child[dec_f_1 + 1] = paren[dec_f_2 + 0];
          child[dec_f_1 + 2] = paren[dec_f_2 + 1];

          child[dec_f_1 + 3] = apex;
          child[dec_f_1 + 4] = paren[dec_f_2 + 2 + 3];
          child[dec_f_1 + 5] = paren[dec_f_2 + 0 + 3];

          child[dec_f_1 + 6] = apex;
          child[dec_f_1 + 7] = paren[dec_f_2 + 2];
          child[dec_f_1 + 8] = paren[dec_f_2 + 0];

          child[dec_f_1 + 9] = apex;
          child[dec_f_1 + 10] = paren[dec_f_2 + 0 + 3];
          child[dec_f_1 + 11] = paren[dec_f_2 + 1 + 3];
        }
      }
    }
  },

  generateFace_2: function(child, paren, indice, v_offset)
  {
    let ligne1 = (1 * indice);
    let ligne2 = (2 * indice) + 1;

    for (let z = 0; z < indice; z++)
    {
      for (let x = 0; x < indice; x++)
      {
        let decalage = v_offset + x + (z * ligne2);
        let dec_f_2 = (x + z * indice) * 3 * 4;
        let dec_f_1a = (x + z * indice * 2) * 3 * 4;
        let dec_f_1b = (x + z * indice * 2 + indice) * 3 * 4;

        // North right
        child[dec_f_1a + 0] = decalage;
        child[dec_f_1a + 1] = paren[dec_f_2 + 2];
        child[dec_f_1a + 2] = paren[dec_f_2 + 0];

        // West left
        child[dec_f_1a + 3] = decalage + ligne1;
        child[dec_f_1a + 4] = paren[dec_f_2 + 0 + 3];
        child[dec_f_1a + 5] = paren[dec_f_2 + 1 + 3];

        // North left
        child[dec_f_1a + 6] = decalage;
        child[dec_f_1a + 7] = paren[dec_f_2 + 0];
        child[dec_f_1a + 8] = paren[dec_f_2 + 1];

        // East right
        child[dec_f_1a + 9] = decalage + ligne1 + 1;
        child[dec_f_1a + 10] = paren[dec_f_2 + 2 + 6];
        child[dec_f_1a + 11] = paren[dec_f_2 + 0 + 6];


        // West right
        child[dec_f_1b + 0] = decalage + ligne1;
        child[dec_f_1b + 1] = paren[dec_f_2 + 2 + 3];
        child[dec_f_1b + 2] = paren[dec_f_2 + 0 + 3];

        // South left
        child[dec_f_1b + 3] = decalage + ligne2;
        child[dec_f_1b + 4] = paren[dec_f_2 + 0 + 9];
        child[dec_f_1b + 5] = paren[dec_f_2 + 1 + 9];

        // East left
        child[dec_f_1b + 6] = decalage + ligne1 + 1;
        child[dec_f_1b + 7] = paren[dec_f_2 + 0 + 6];
        child[dec_f_1b + 8] = paren[dec_f_2 + 1 + 6];

        // South right
        child[dec_f_1b + 9] = decalage + ligne2;
        child[dec_f_1b + 10] = paren[dec_f_2 + 2 + 9];
        child[dec_f_1b + 11] = paren[dec_f_2 + 0 + 9];
      }
    }
  }
}
