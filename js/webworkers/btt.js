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
		level = this.level + 1;

		this.CL = new BinaryTriangleTree(this.chunkX, this.chunkZ, level, this);
		this.CR = new BinaryTriangleTree(this.chunkX, this.chunkZ, level, this);

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

		if (this.level < LEVELMAX)
		{
			this.CR.createChilds();
			this.CL.createChilds();
		}
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

		if (this.level < LEVELMAX)
		{
			this.CL.linkNeighbor();
			this.CR.linkNeighbor();
		}
	},

	getLod : function(hypo)
	{
		if (this.level < LEVELMAX)
		{
			this.CL.getLod(hypo);
			this.CR.getLod(hypo);
		}

		distanceFactor = (hypo * hypo);

		apexFactor = this.deltaBaseApex * (1000);

		if (apexFactor > (1 * (distanceFactor)))
			this.break();
	},

	printLod : function(LODArray)
	{
		if(this.breaked)
		{
			this.CL.printLod(LODArray);
			this.CR.printLod(LODArray);
		}
		else
		{
	//		if (!(this.VA.y W= -0.1 && this.VL.y == -0.1 && this.VR.y == -0.1))
				LODArray.push(this.VA, this.VL, this.VR)
		}
	},

	break : function()
	{
		this.breaked = true;

		if(this.NB != undefined && this.NB.breaked == false)
			this.NB.break();
		if(this.parent != undefined && this.parent.breaked == false)
			this.parent.break();
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
