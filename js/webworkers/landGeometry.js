procedural = function(absoluteX, absoluteZ){

	landNoiseFrequance = 10;
	land = 100;
	riverFrequance = 500;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	landNoise = ( noise.simplex2( absoluteX / landNoiseFrequance, absoluteZ / landNoiseFrequance ) + 1 ) / 2;

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;
	river = 1 - ( Math.abs(river - 0.5) * 2 );
	river *= river;


	if (river > 0.8)
		river = 0.8;

	finalNoise = ( land * land + ( landNoise * land * land ) ) / 2;
	finalNoise = ((finalNoise - (river ) ));
//	finalNoise += 0.5;

	if (finalNoise < -0.1)
		finalNoise = -0.1;

	return finalNoise;
}



procedural2 = function(absoluteX, absoluteZ){
	continent = 10000;
	riverFrequance = 4000;
	mountFrequance = 6000;

	continent = noise.simplex2( absoluteX / continent , absoluteZ / continent );

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;
	river = 1 - ( Math.abs(river - 0.5) * 2 );
	river = Math.pow(river, 4 );

	mount = ( noise.perlin2( absoluteX / mountFrequance , absoluteZ / mountFrequance ) + 1 ) / 2;
	mount = 1 - ( Math.abs(mount - 0.5) * 2 );
	mount = Math.pow(mount, 4 );


	finalNoise = (continent*2 - river + mount) / 4;

//	finalNoise = ( finalNoise + 1 ) / 2; // Make it positive (0-1);


	return finalNoise;
}

