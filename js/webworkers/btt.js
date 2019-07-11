BinaryTriangleTree = function (VA, VL, VR, parent)
{
	this.parent = parent;
	this.level = (parent) ? parent.level + 1 : 0;

	this.VA = VA;
	this.VL = VL;
	this.VR = VR;

	this.VC = new V3((this.VR.x + this.VL.x) / 2, 0, (this.VR.z + this.VL.z) / 2);
	this.VC.setHeight();

	this.deltaBaseApex = Math.abs((this.VL.y + this.VR.y) / 2 - this.VC.y);
	this.breaked = false;
}

BinaryTriangleTree.prototype = {

	createChilds : function()
	{
		if (this.level == LEVELMAX)
			return;

		this.CL = new BinaryTriangleTree(this.VC, this.VA, this.VL, this);
		this.CR = new BinaryTriangleTree(this.VC, this.VR, this.VA, this);

		this.CR.createChilds();
		this.CL.createChilds();
	},

	linkNeighbor : function()
	{
		if (this.level == LEVELMAX)
			return;

		this.CL.NL = this.CR;
		this.CR.NR = this.CL;

		if (this.NB)
		{
			this.CL.NR = this.NB.CR;
			this.CR.NL = this.NB.CL;
		}

		if (this.NL)
			this.CL.NB = this.NL.CR;

		if (this.NR)
			this.CR.NB = this.NR.CL;

		this.CL.linkNeighbor();
		this.CR.linkNeighbor();
	},

	getLod : function(hypo)
	{
		if (this.level == LEVELMAX)
			return;

		this.CL.getLod(hypo);
		this.CR.getLod(hypo);

		if ((this.deltaBaseApex * 1000) > (hypo * hypo))
			this.break();

	},

	break : function()
	{
		this.breaked = true;

		if(this.NB != undefined && this.NB.breaked == false)
			this.NB.break();
		if(this.parent != undefined && this.parent.breaked == false)
			this.parent.break();
	},

	count : function(index)
	{
		if (!this.breaked)
			return 1;
		return this.CL.count() + this.CR.count();
	},

	printLod : function(data, index)
	{

		let i;

		if (this.breaked)
		{
			i = this.CL.printLod(data, index);
			i += this.CR.printLod(data, index + i);
			return (i);
		}

		i = index * 9;

		v1 = this.VA;
		v2 = this.VL;
		v3 = this.VR;

		data.vertices[i + 0] = v1.x;
		data.vertices[i + 1] = v1.y;
		data.vertices[i + 2] = v1.z;

		data.vertices[i + 3] = v2.x;
		data.vertices[i + 4] = v2.y;
		data.vertices[i + 5] = v2.z;

		data.vertices[i + 6] = v3.x;
		data.vertices[i + 7] = v3.y;
		data.vertices[i + 8] = v3.z;

		data.colors[i + 0] = v1.color.r;
		data.colors[i + 1] = v1.color.g;
		data.colors[i + 2] = v1.color.b;

		data.colors[i + 3] = v2.color.r;
		data.colors[i + 4] = v2.color.g;
		data.colors[i + 5] = v2.color.b;

		data.colors[i + 6] = v3.color.r;
		data.colors[i + 7] = v3.color.g;
		data.colors[i + 8] = v3.color.b;
//		this.breaked == false;
		return 1;
	}
}

