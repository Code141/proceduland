procedural = function(absoluteX, absoluteZ){
	landNoise = 0.1;
	plumb = 5;
	land = 1;
	riverFrequance = 7;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	landNoise = ( noise.simplex2( absoluteX / landNoise, absoluteZ / landNoise ) + 1 ) / 2;
	plumb = ( noise.simplex2( absoluteX / plumb -5, absoluteZ / plumb ) + 1 ) / 2;

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;
	river = 1 - ( Math.abs(river )  );
	river *= river;


	finalNoise = ( land * land + ( landNoise * land * land * land * land ) ) / 2;

	finalNoise -= river;

	if (finalNoise < -0.7)
		finalNoise = -0.2;

	if (finalNoise < -0.2 && finalNoise > -0.6)
		finalNoise = -0.2;

	if (finalNoise < -0.2)
		finalNoise /= 1.5;


	color = colorise(
			gradient, (finalNoise + 1 ) / 2,
			gradient2, landNoise / 3  ,
			((finalNoise + 1) / 2) * land * land
		);

	return ({
		height: finalNoise,
		color: color
	});
}

let gradient = [
	{
		stop: 0, // Black
		r: 0x00, g: 0x00, b: 0x00
	}, {
		stop: .3, // Black
		r: 0x11, g: 0x09, b: 0x00
	}, {
		stop: .4, // Oceanic floor
		r: 0x22, g: 0x11, b: 0x00
	}, {
		stop: .55, // Sand
		r: 0x66, g: 0x4c, b: 0x32
	}, {
		stop: .6, // plain green
		r: 0x11, g: 0x44, b: 0x11
	}, {
		stop: .65, // dark green
		r: 0x00, g: 0x15, b: 0x00
	}, {
		stop: .8, // brown
		r: 0x55, g: 0x50, b: 0x41
	}, {
		stop: .9, // Grey
		r: 0x55, g: 0x55, b: 0x55
	}, {
		stop: 1, // White
		r: 0xCC, g: 0xCC, b: 0xCC
	}
];

let gradient2 = [
	{
		stop: 0,
		r: 0x00, g: 0x00, b: 0x00 
	}, {
		stop: 1,
		r: 0xff, g: 0xff, b: 0xff 
	}
];

let lerp = function (v0, v1, t) {
	return ((1 - t) * v0 + t * v1);
}

let rgb_lerp = function (c1, c2, t)
{
	return ( {
		r: lerp(c1.r, c2.r, t),
		g: lerp(c1.g, c2.g, t),
		b: lerp(c1.b, c2.b, t)
	});
}

let rgb_color_bilerp = function (c1, c2, c3, c4, t1, t2, t3)
{
	return (
		rgb_lerp(
			rgb_lerp(c1, c2, t1),
			rgb_lerp(c3, c4, t2),
			t3
		)
	);
}

function colorise(g1, t1, g2, t2, t3)
{
	let i = 0;
	let j = 0;

	while (g1[i + 1].stop < t1 && i + 1 < g1.length)
		i++;
	while (g2[j + 1].stop < t2 && j + 1 < g2.length)
		j++;

	c1 = g1[i];
	c2 = g1[i + 1];

	t1 = (t1 - c1.stop) / (c2.stop - c1.stop);

	c3 = g2[j];
	c4 = g2[j + 1];

	t2 = (t2 - c3.stop) / (c4.stop - c3.stop);

	return (rgb_color_bilerp(c1, c2, c3, c4, t1, t2, t3));
}
