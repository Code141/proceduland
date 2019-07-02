function VQueue()
{
	this.q = new Array();
	this.i = 0;
}

function sortOnY(a, b)
{
	return (a.y > b.y) ? 1 : -1;
}

VQueue.prototype.enqueue = function(p)
{
	this.q.push(p);
}

VQueue.prototype.dequeue = function()
{
	this.q.sort(sortOnY);
	return this.q.pop();
}

VQueue.prototype.remove = function(e)
{
	var index = -1;
	for (this.i=0; this.i < this.q.length; this.i++)
	{
		if (this.q[this.i] == e)
		{
			index = this.i;
			break;
		}
	}
	this.q.splice(index, 1);
}

VQueue.prototype.isEmpty = function()
{
	return (this.q.length==0);
}

VQueue.prototype.clear = function(b)
{
	this.q = [];
}


