procedural = function(absoluteX, absoluteZ){

absoluteX *= 128;
absoluteZ *= 128;

	landNoiseFrequance = 20;
	land = 200;
	riverFrequance = 1000;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	landNoise = ( noise.simplex2( absoluteX / landNoiseFrequance, absoluteZ / landNoiseFrequance ) + 1 ) / 2;

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
		finalNoise /= 2;

	return finalNoise;
}

