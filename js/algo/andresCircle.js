andresList = function(rayon, x_centre, z_centre) {
	let list = [];
	let r = 0;
	rayon++;

	tracerPixel = function(x, z) {
		list.push({
			x: x_centre + x,
			z: z_centre + z,
			hypo: r - 1
		});
	}

	for (r = 1; r < rayon; r++)
	{
		x = 1;
		z = r;
		d = r - 1;

		while ( z > x )
		{
			tracerPixel(x - 1, -z);
			tracerPixel(z - 1, -x);
			tracerPixel(z - 1, x -1);
			tracerPixel(x - 1, z - 1);
			tracerPixel(-x, z - 1);
			tracerPixel(-z, x - 1);
			tracerPixel(-z, -x);
			tracerPixel(-x, -z);
			if (d >= 2 * x)
				d = d - ( 2 * x++ ) - 1;
			else if ( d < 2 * ( r - z ))
				d = d + ( 2 * z-- ) - 1;
			else
				d = d + 2 * ( z-- - x++ - 1 );
		}

		if (z == x)
		{
			tracerPixel(x - 1, -z);
			tracerPixel(x - 1, z - 1);
			tracerPixel(-x, z - 1);
			tracerPixel(-x, -z);
		}

	}
	return list;
}
