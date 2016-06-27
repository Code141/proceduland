deg = function(deg){
	return ((deg/180)*Math.PI);
}







procedural = function(absoluteX, absoluteZ){
	landNoiseFrequance = 100;
	land = 1000;
	riverFrequance = 5000;

	land = ( noise.simplex2( absoluteX / land , absoluteZ / land ) + 1 ) / 2;
	landNoise = ( noise.simplex2( absoluteX / landNoiseFrequance, absoluteZ / landNoiseFrequance ) + 1 ) / 2;

	river = ( noise.simplex2( absoluteX / riverFrequance , absoluteZ / riverFrequance ) + 1 ) / 2;
	river = 1 - ( Math.abs(river - 0.5) * 2 );
	river = Math.pow(river, 4 );

	finalNoise = ( land * land + ( landNoise * land * land ) ) / 2;
	finalNoise = ((finalNoise - river) + 1 )/2 ;
	return finalNoise;

}
