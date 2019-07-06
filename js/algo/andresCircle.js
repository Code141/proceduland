andresList = function(rayon, x_centre, z_centre) {
	let list = [];
	let r = 0;

	tracerPixel = function(x, z)
	{
		list.push({
			x: x_centre + x,
			z: z_centre + z,
			hypo: r
		});
	}

	tracerPixel(0, 0);
	for (r = 1; r < rayon; r++)
	{
		x = 1;
		z = r;
		d = r - 1;

		tracerPixel(r , 0);
		tracerPixel(-r , 0);
		tracerPixel(0, -r);
		tracerPixel(0, r);

		while ( z > x )
		{
			tracerPixel(x, -z);
			tracerPixel(z, -x);
			tracerPixel(z, x);
			tracerPixel(x, z);
			tracerPixel(-x, z);
			tracerPixel(-z, x);
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
			tracerPixel(x, -z);
			tracerPixel(x, +z);
			tracerPixel(-x, -z);
			tracerPixel(-x, +z);
		}

	}
	return list;
}


