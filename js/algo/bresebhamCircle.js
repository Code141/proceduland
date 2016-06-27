BresenhamCircle = function(rayon, x_centre, y_centre){
	var x, y, m;
	x = 0 ;
	y = rayon ;// on se place en haut du cercle 
	m = 5 - 4 * rayon ;// initialisation

	while(x <= y){// parcours un octant

		// duplique l'octant 8 fois

for(var i = x_centre; i<= x + x_centre; i++ ){

}
		tracerPixel( x + x_centre, y + y_centre );
		tracerPixel( y + x_centre, x + y_centre );

		tracerPixel( - x + x_centre, y + y_centre );
		tracerPixel( - y + x_centre, x + y_centre );

		tracerPixel( x + x_centre, - y + y_centre );
		tracerPixel( y + x_centre, - x + y_centre );

		tracerPixel( - x + x_centre, - y + y_centre );
		tracerPixel( - y + x_centre, - x + y_centre );

		if(m > 0){
			y = y - 1 ;
			m = m - 8*y ;
		}

		x = x + 1 ;
		m = m + 8*x + 4 ;
	}
}



tracerPixel = function(x, y){
	
	if(circularArray[x] === undefined){
		circularArray[x] = [];
	}

	if(circularArray[x][y] === undefined){
		circularArray[x][y] = undefined;
	}

}

fillCircle = function(x_centre, y_centre){

	for(var x  in circularArray){
		x = parseInt(x);
		for(var y in circularArray[x]){
			y = parseInt(y);
			for(var i = y_centre; i<=y; i++){
				tracerPixel( x, i );
				tracerPixel( x, -i+(y_centre*2) );
			}

			
		}
	}

}



getBresenhamCircularArray = function(rayon, x_centre, y_centre){
	circularArray = [];
	
	BresenhamCircle(rayon, x_centre, y_centre);
	fillCircle(x_centre, y_centre);

	return circularArray;
}

