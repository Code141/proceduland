// counter clock wise
// (-1,1), (1,1), (1,-1), (-1,-1)

function VPolygon()
{
	this.size = 0;
	this.vertices = [];
	this.first = null;
	this.last = null;
}

VPolygon.prototype.addRight = function(p)
{
	this.vertices.push(p);
	++this.size;
	this.last = p;
	if(this.size==1) this.first = p;
}

VPolygon.prototype.addLeft  = function(p)
{
	var vs = this.vertices;
	this.vertices = [p];
	for(var i=0; i<vs.length; i++) 
		this.vertices.push(vs[i]);
		
	++this.size;
	this.first = p;
	if(this.size==1) this.last = p;
}


