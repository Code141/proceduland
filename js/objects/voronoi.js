function Voronoi(points, chunkSize, chunksDistance){

    zone = chunkSize * (chunksDistance * 2 + 1 );

    zone = zone - ( zone / 2);

    for(var i = 0; i<points; i++){

       rX = Math.random(1000) * 2 - 1;
       rZ = Math.random(1000) * 2 - 1;

       x = rX * zone;
       z = rZ * zone;

       pointViewer( x, z );

   }
   
}
