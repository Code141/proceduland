
function Minimap()
{
  this.width = 500;
  this.height = 500;
  this.zoom = 50;
  this.offsetX = -(this.width / 2);
  this.offsetZ = -(this.height / 2);

  this.canvas = document.getElementById("minimap"); 
  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.context = this.canvas.getContext("2d");
  this.imagedata = this.context.createImageData(this.width, this.height);


  this.canvas.onmousedown = (evt) => {
    previousX = evt.screenX;
    previousZ = evt.screenY;

    window.onmousemove = (evt) => {
      this.offsetX += (previousX - evt.screenX);
      this.offsetZ += (previousZ - evt.screenY);
      this.draw();

  this.draw_chunk(0, 0);
  this.draw_chunk(-2, 4);
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
    this.draw();

  this.draw_chunk(0, 0);
  this.draw_chunk(-2, 4);
  };
  this.draw();

  this.draw_chunk(0, 0);
  this.draw_chunk(-2, 4);

}

Minimap.prototype = {
  draw_chunk(cx, cz)
  {
    for (let x = 0; x < this.zoom; x++)
    {
      for (let z = 0; z < this.zoom; z++)
      {
        
        let pixelindex = (z * this.width + x ) * 4;
        this.imagedata.data[pixelindex] = 0;
        this.imagedata.data[pixelindex + 1] = 255;
        this.imagedata.data[pixelindex + 2] = 0;
        this.imagedata.data[pixelindex + 3] = 255;
      }
    }
    this.context.putImageData(this.imagedata, 0, 0);
  },

  draw ()
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



        r *= 2;
        g *= 2;
        b *= 2;

        if ((newX > 0 && newX < 1)
        && (newZ > 0 && newZ < 1))
        {
          r = 255;
          g *= 2;
          b *= 2;
        }

        if (newX % 1 == 0 || newZ % 1 == 0) {
          r += 70;
          g += 70;
          b += 70;
        }


        let pixelindex = (z * this.width + x) * 4;

        this.imagedata.data[pixelindex] = r;
        this.imagedata.data[pixelindex + 1] = g;
        this.imagedata.data[pixelindex + 2] = b;
        this.imagedata.data[pixelindex + 3] = 255;
      }
    }
    this.context.putImageData(this.imagedata, 0, 0);
  }
}
