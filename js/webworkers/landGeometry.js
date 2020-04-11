let procedural = function(absoluteX, absoluteZ)
{
	landNoise = 0.1;
	plumb = 5;
	plumb2 = 0.04;
	land = 1;
	riverFrequance = 7;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	land2 = ( Math.round( noise.simplex2( absoluteX / land , absoluteZ / land )) + 1 ) / 2;

	landNoise = ( noise.simplex2( absoluteX / landNoise, absoluteZ / landNoise ) + 1 ) / 2;
	plumb = ( noise.simplex2( absoluteX / plumb -5, absoluteZ / plumb ) + 1 ) / 2;
	plumb2 = ( noise.simplex2( absoluteX / plumb2 -5, absoluteZ / plumb2 ) + 1 ) / 2;

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;

	river = 1 - ( Math.abs(river )  );

	finalNoise = ( land  + ( landNoise * land * land * land * land ) + plumb2 / 30) / 2  ;
	finalNoise -= river * river;
/*
	if (finalNoise < -1)
		finalNoise = -1;

	if (finalNoise > 1)
		finalNoise = 1;

	if (finalNoise < -0.7 || finalNoise < -0.2 && finalNoise > -0.6)
		finalNoise = -0.2;

	if (finalNoise < -0.2)
		finalNoise /= 1.05;
    */
	color = colorise(
		gradient, (finalNoise + 1 ) / 2,
		gradient2, landNoise / 3  ,
		((finalNoise + 1) / 2) * land * land
	);



  /*
finalNoise = 0;

  if (absoluteX < 0.6 && absoluteX > 0.4 &&
  absoluteZ < 0.6 && absoluteZ > 0.4
  )
    finalNoise = 0.5;

	color = colorise(
		gradient, (finalNoise + 1 ) / 2,
		gradient2, finalNoise / 3  ,
		((finalNoise + 1) / 2)
	);
  */
	return ({
		height: finalNoise,
		color: color
	});

}

let gradient = [
	{ stop: .00, r: 0x00, g: 0x00, b: 0x00 },	// Black
	{ stop: .30, r: 0x11, g: 0x09, b: 0x00 },	// Black
	{ stop: .40, r: 0x22, g: 0x11, b: 0x00 },	// Oceanic floor
	{ stop: .50, r: 0x66, g: 0x4c, b: 0x32 },	// Sand
	{ stop: .56, r: 0x11, g: 0x44, b: 0x11 },	// plain green
	{ stop: .65, r: 0x00, g: 0x15, b: 0x00 },	// dark green
	{ stop: .80, r: 0x8b, g: 0x45, b: 0x13 },	// brown
	{ stop: .95, r: 0x55, g: 0x55, b: 0x55 },	// Grey
	{ stop: 1.0, r: 0xCC, g: 0xCC, b: 0xCC }	// White
];

let gradient2 = [
	{ stop: 0.0, r: 0x00, g: 0x00, b: 0x00 },
	{ stop: 1.0, r: 0xff, g: 0xff, b: 0xff }
];

let lerp = function (v0, v1, t) {
	return ((1 - t) * v0 + t * v1);
}

let rgb_lerp = function (c1, c2, t)
{
	return ({
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

/*WARN*/
	/*
	t1 = (t1 + Math.random() / 80 );
	t2 = (t2 + Math.random() / 80 );
	t3 = (t3 + Math.random() / 80 );
	*/
/*WARN*/

	while (g1[i + 1].stop < t1 && i + 1 < g1.length)
		i++;
	while (g2[j + 1].stop < t2 && j + 1 < g2.length)
		j++;

	c1 = g1[i];
	c2 = g1[i + 1];
	c3 = g2[j];
	c4 = g2[j + 1];
	t1 = (t1 - c1.stop) / (c2.stop - c1.stop);
	t2 = (t2 - c3.stop) / (c4.stop - c3.stop);

	return (rgb_color_bilerp(c1, c2, c3, c4, t1, t2, t3));
}
