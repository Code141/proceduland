andresCircle = function( r, x_centre, y_centre ){

	x = 0;
	y = r
	d = r - 1;

	while( y >=x ){

		tracerPixel( x_centre + x , y_centre - y ); // NORTH - EAST // 1H
		tracerPixel( x_centre + y , y_centre - x );	// EAST - NORTH // 2H
		tracerPixel( x_centre + y , y_centre + x ); // EAST - SOUTH // 4H
		tracerPixel( x_centre + x , y_centre + y ); // SOUTH - EAST // 5H
		tracerPixel( x_centre - x , y_centre + y ); // SOUTH - WEST // 7H
		tracerPixel( x_centre - y , y_centre + x );	// WEST - SOUTH // 8H
		tracerPixel( x_centre - y , y_centre - x ); // WEST - NORTH // 10H
		tracerPixel( x_centre - x , y_centre - y ); // NORTH - WEST // 11H

		if(d >= 2*x){

			d = d - ( 2 * x ) - 1;
			x ++;

		}else if( d < 2 * ( r - y )){

			d = d + ( 2 * y ) - 1;
			y --;    

		}else{

			d = d + 2 * ( y - x - 1 );
			y --;
			x ++;

		}

	}
}

tracerPixel = function(x, y){
	
	if(circularArray[x] === undefined){
		circularArray[x] = [];
	}

	if(circularArray[x][y] === undefined){
		circularArray[x][y] = true;
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

getAndresCircularArray = function(rayon, x_centre, y_centre, fill){
	circularArray = [];

	andresCircle(rayon, x_centre, y_centre);
	if(fill){
		fillCircle(x_centre, y_centre);
	}
	return circularArray;
}
