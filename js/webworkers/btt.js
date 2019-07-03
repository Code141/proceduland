BinaryTriangleTree = function ( x, z, level, parent){

	this.chunkX = x;
	this.chunkZ = z;

	this.level = level;

	this.parent = parent;

	this.VA = new V3();
	this.VL = new V3();
	this.VR = new V3();
	this.VC = new V3();

	this.deltaBaseApex = 0;
	this.breaked = false;

}

BinaryTriangleTree.prototype = {

	createChilds : function()
	{
		if (this.level == LEVELMAX)
			return;
		level = this.level + 1;

		this.CL = new BinaryTriangleTree(this.chunkX, this.chunkZ, this.level + 1, this);
		this.CR = new BinaryTriangleTree(this.chunkX, this.chunkZ, this.level + 1, this);

		this.CL.VA = this.VC;
		this.CL.VL = this.VA;
		this.CL.VR = this.VL;
		this.CL.VC.x = (this.CL.VR.x + this.CL.VL.x) / 2;
		this.CL.VC.z = (this.CL.VR.z + this.CL.VL.z) / 2;
		this.getHeight(this.CL.VC);

		this.CR.VA = this.VC;
		this.CR.VL = this.VR;
		this.CR.VR = this.VA;
		this.CR.VC.x = (this.CR.VR.x + this.CR.VL.x) / 2;
		this.CR.VC.z = (this.CR.VR.z + this.CR.VL.z) / 2;
		this.getHeight(this.CR.VC);

		virtualBaseHeight = (this.VL.y + this.VR.y) / 2;
		this.deltaBaseApex = Math.abs(virtualBaseHeight - this.VC.y);

		this.CR.createChilds();
		this.CL.createChilds();
	},

	getHeight : function(vector)
	{

		absoluteX = this.chunkX + vector.x;
		absoluteZ = this.chunkZ + vector.z;
		height = procedural(absoluteX, absoluteZ);
		vector.y = height;
		return vector;
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

		data.colors[i + 0] = Math.random() * 255;
		data.colors[i + 1] = Math.random() * 255;
		data.colors[i + 2] = Math.random() * 255;
		data.colors[i + 3] = Math.random() * 255;
		data.colors[i + 4] = Math.random() * 255;
		data.colors[i + 5] = Math.random() * 255;
		data.colors[i + 6] = Math.random() * 255;
		data.colors[i + 7] = Math.random() * 255;
		data.colors[i + 8] = Math.random() * 255;

		data.colors[i + 0] =255;
		data.colors[i + 1] =255;
		data.colors[i + 2] =255;

		data.colors[i + 3] =255;
		data.colors[i + 4] =255;
		data.colors[i + 5] =255;

		data.colors[i + 6] =255;
		data.colors[i + 7] =255;
		data.colors[i + 8] =255;

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
