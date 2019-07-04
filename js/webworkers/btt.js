BinaryTriangleTree = function ( x, z, VA, VL, VR, parent){

	this.chunkX = x;
	this.chunkZ = z;

	this.parent = parent;
	this.level = (parent) ? parent.level + 1 : 0;

	this.VA = VA;
	this.VL = VL;
	this.VR = VR;

	this.VC = getHeight(new V3( (this.VR.x + this.VL.x) / 2, 0, (this.VR.z + this.VL.z) / 2));
	this.deltaBaseApex = Math.abs((this.VL.y + this.VR.y) / 2 - this.VC.y);
	this.breaked = false;
}

BinaryTriangleTree.prototype = {

	createChilds : function()
	{
		if (this.level == LEVELMAX)
			return;

		this.CL = new BinaryTriangleTree( this.chunkX, this.chunkZ, this.VC, this.VA, this.VL, this);
		this.CR = new BinaryTriangleTree( this.chunkX, this.chunkZ, this.VC, this.VR, this.VA, this);

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

		data.vertices[i] = this.VA.x;
		data.vertices[i + 1] = this.VA.y;
		data.vertices[i + 2] = this.VA.z;
		data.vertices[i + 3] = this.VL.x;
		data.vertices[i + 4] = this.VL.y;
		data.vertices[i + 5] = this.VL.z;
		data.vertices[i + 6] = this.VR.x;
		data.vertices[i + 7] = this.VR.y;
		data.vertices[i + 8] = this.VR.z;



		v1 = ((this.VA.y + 1) / 2) * 255;
		v2 = ((this.VL.y + 1) / 2) * 255;
		v3 = ((this.VR.y + 1) / 2) * 255;

		data.colors[i + 0] = v1;
		data.colors[i + 1] = v1;
		data.colors[i + 2] = v1;

		data.colors[i + 3] = v2;
		data.colors[i + 4] = v2;
		data.colors[i + 5] = v2;

		data.colors[i + 6] = v3;
		data.colors[i + 7] = v3;
		data.colors[i + 8] = v3;



		return 1;
	},

	unbreakBTT : function()
	{
		if(this.breaked)
		{
			this.CL.unbreakBTT();
			this.CR.unbreakBTT();
		}
		this.breaked = false;
	}

}

/*

	vertices = geometry.attributes.position.array;
	for (let v = 0; v < vertices.length; v++)
	{

	}

	/*
	for (var c = 0; c < colors.length - 1; c++)
	{
		var colorDiff = colors[c + 1].stop - colors[c].stop;
		for (var i = 0; i < geometry.faces.length; i++)
		{

			face = geometry.faces[i];
			for (var v = 0; v < 3; v++)
			{
				vertex = geometry.vertices[face[vertexIndices[v]]];
				normalizedAxis = normalized.subVectors(vertex, min).divide(size)[axis];
				if (reverse)
				{
					normalizedAxis = 1 - normalizedAxis;
				}
				if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop)
				{
					var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
					face.vertexColors[v] = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
				}
			}
		}
	}

*/
