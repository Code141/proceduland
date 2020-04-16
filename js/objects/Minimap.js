function Minimap()
{
  this.width = 400;
  this.height = 400;
  this.zoom = 25;
  this.offsetX = -(this.width / 2);
  this.offsetZ = -(this.height / 2);

  this.canvas = document.getElementById("minimap_canvas"); 
  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.context = this.canvas.getContext("2d");
  this.imagedata = this.context.createImageData(this.width, this.height);

  this.color_map = new Uint8Array(this.width * this.height * 4);
  this.height_map= new Uint8Array(this.width * this.height * 4);
  this.chunk= new Uint8Array(this.width * this.height * 4);

  this.draw();
  this.display = "color";


  document.getElementById("button_height")
    .onmouseup = () => {
      this.display = "height";
      this.draw();
    };
  document.getElementById("button_color")
    .onmouseup = () => {
      this.display = "color";
      this.draw();
    };
  document.getElementById("button_normal")
    .onmouseup = () => {
      this.display = "normal";
      this.draw();
    };

  this.canvas.onmousedown = (evt) => {
    previousX = evt.screenX;
    previousZ = evt.screenY;

    window.onmousemove = (evt) => {
      this.offsetX += (previousX - evt.screenX);
      this.offsetZ += (previousZ - evt.screenY);
      this.draw();
      previousX = evt.screenX;
      previousZ = evt.screenY;
    }

    window.onmouseup = () => {
      window.onmouseup = null;
      window.onmousemove = null;
    }
  }

  this.canvas.onwheel = (event) => {
    if (event.deltaY > 0)
      this.zoom /= 2;
    else if (event.deltaY < 0)
      this.zoom *= 2;
    this.zoom = Math.floor(this.zoom);
    this.zoom = (this.zoom < 2) ? 2 : this.zoom;
    this.draw();
  };

}

Minimap.prototype = {

  draw() {
    this.draw_map();

    this.chunk= new Uint8Array(this.width * this.height * 4);
    this.draw_chunk(0, 0);
    this.draw_chunk(-1, 2);
    this.draw_chunk(1, -2);

    this.grid = new Uint8Array(this.width * this.height * 4);
    this.draw_grid();



    let length = this.width * this.height * 4;
    for (let i = 0; i < length; i++)
    {
      this.imagedata.data[i] = this.color_map[i];
      this.imagedata.data[i] += this.grid[i];
      this.imagedata.data[i] += this.chunk[i];
    }

    this.context.putImageData(this.imagedata, 0, 0);
  },

  draw_chunk(cx, cz)
  {
    cx = cx * this.zoom - this.offsetX;
    cz = cz * this.zoom - this.offsetZ;
    let lenX = cx + this.zoom;
    let lenZ = cz + this.zoom;

    if (cx < 0)
      cx = 0;
    if (lenX > this.width)
      lenX = this.width;

    if (cz < 0)
      cz = 0;
    if (lenZ > this.width)
      lenZ = this.width;

    for (let x = cx; x < lenX; x++)
    {
      for (let z = cz; z < lenZ; z++)
      {

        let i = (z * this.width + x ) * 4;
        this.chunk[i] = 0;
        this.chunk[i + 1] = 128;
        this.chunk[i + 2] = 0;
        this.chunk[i + 3] = 255;
      }
    }
  },

  draw_grid ()
  {
    for (let x = 0; x < this.width; x++)
    {
      for (let z = 0; z < this.height; z++)
      {

        newX = (x + this.offsetX) / this.zoom
        newZ = (z + this.offsetZ) / this.zoom

        if (newX % 1 == 0 || newZ % 1 == 0)
        {
          let i = (z * this.width + x) * 4;

          this.grid[i]     = 70;
          this.grid[i + 1] = 70;
          this.grid[i + 2] = 70;
          this.grid[i + 3] = 255;
        }
      }
    }
  },

  draw_map ()
  {
    for (let x = 0; x < this.width; x++)
    {
      for (let z = 0; z < this.height; z++)
      {
        newX = (x + this.offsetX) / this.zoom
        newZ = (z + this.offsetZ) / this.zoom

        pro = procedural(newX, newZ);

        let r = pro.color.r;
        let g = pro.color.g;
        let b = pro.color.b;
        let height = Math.floor((pro.height + 1) * 128);

        let i = (z * this.width + x) * 4;

        this.color_map[i]     = r;
        this.color_map[i + 1] = g;
        this.color_map[i + 2] = b;
        this.color_map[i + 3] = 255;

        this.height_map[i]     = height;
        this.height_map[i + 1] = height;
        this.height_map[i + 2] = height;
        this.height_map[i + 3] = 255;

      }
    }
  },
}
