function Point(x, y)
{
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function(a, b)
{
   return (Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)));
}
