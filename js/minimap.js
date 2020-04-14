
function minimap()
{
  let width = 500;
  let height = 500;

  let canvas = document.getElementById("minimap"); 
  canvas.width = width;
  canvas.height = height;
  let context = canvas.getContext("2d");

  let imagedata = context.createImageData(width, height);

  zoom = 0.01;
  offsetX= -((width * zoom ) / 2);
  offsetZ= -((height * zoom ) / 2);
  function createImage() {

    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        let pixelindex = (z * width + x) * 4;
        pro = procedural(x * zoom + offsetX, z * zoom + offsetZ);

        let r = pro.color.r;
        let g = pro.color.g;
        let b = pro.color.b;

        if (
        ((x * zoom + offsetX ) % 1 == 0)
          ||
        ((z * zoom + offsetZ ) % 1 == 0))
        {
          r += 25;
          g += 25;
          b += 25;
        }


        // Set the pixel data
        imagedata.data[pixelindex] = r;     // Red
        imagedata.data[pixelindex+1] = g; // Green
        imagedata.data[pixelindex+2] = b;  // Blue
        imagedata.data[pixelindex+3] = 255;   // Alpha
      }
    }
  }

  createImage();
  context.putImageData(imagedata, 0, 0);




}
