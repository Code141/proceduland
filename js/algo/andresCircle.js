andresList = function(rayon, x_centre, y_centre) {
	let list = [];
	let i = 0;

	tracerPixel = function(x, y)
	{
		list.push({
			x: x_centre + x,
			y: y_centre + y,
			hypo: i
		});
	}

	tracerPixel(0, 0);

	for (r = 1; r < rayon; r++)
	{
		x = 1;
		y = r;
		d = r - 1;

		tracerPixel(r , 0);
		tracerPixel(-r , 0);
		tracerPixel(0, -r);
		tracerPixel(0, r);

		while ( y > x )
		{
			tracerPixel(x, -y);
			tracerPixel(y, -x);
			tracerPixel(y, x);
			tracerPixel(x, y);
			tracerPixel(-x, y);
			tracerPixel(-y, x);
			tracerPixel(-y, -x);
			tracerPixel(-x, -y);

			if (d >= 2 * x)
				d = d - ( 2 * x++ ) - 1;
			else if ( d < 2 * ( r - y ))
				d = d + ( 2 * y-- ) - 1;
			else
				d = d + 2 * ( y-- - x++ - 1 );
		}

		if (y == x)
		{
			tracerPixel(x, -y);
			tracerPixel(x, +y);
			tracerPixel(-x, -y);
			tracerPixel(-x, +y);
		}

	}

	return list;
}


