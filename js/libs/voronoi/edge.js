function VEdge(s, a, b)		// start, left, right
{
	this.left = a;		// point on left
	this.right = b;		// point on right

	this.start = s;		// start point
	this.end = null;	// end point

	this.f = (b.x - a.x) / (a.y - b.y);
	this.g = s.y - this.f * s.x;
	this.direction = new Point(b.y - a.y, -(b.x - a.x));

	// second point of line
	this.B = new Point(s.x + this.direction.x, s.y + this.direction.y);

	this.intersected = false;
	this.iCounted = false;

	this.neighbour = null;
}

