Chunk = function(x, z)
{
	this.x = x;
	this.z = z;

	this.LODArray = [];

	this.bttNorth = new BinaryTriangleTree(x, z, 0, undefined);
	this.bttEast = new BinaryTriangleTree(x, z, 0, undefined);
	this.bttSouth = new BinaryTriangleTree(x, z, 0, undefined);
	this.bttWest = new BinaryTriangleTree(x, z, 0, undefined);

	this.initBTT();
}


Chunk.prototype = {

	initBTT : function()
	{
		let a = this.bttNorth.getHeight(new V3(0, 0, 0));
		let b = this.bttNorth.getHeight(new V3(0.5, 0, -0.5));
		let c = this.bttNorth.getHeight(new V3(-0.5, 0, -0.5));
		let d = this.bttEast.getHeight(new V3(0.5, 0, 0.5));
		let e = this.bttSouth.getHeight(new V3(-0.5, 0, 0.5));

		this.bttNorth.VA = a;
		this.bttEast.VA = a;
		this.bttSouth.VA = a;
		this.bttWest.VA = a;

		this.bttNorth.VL = b;
		this.bttEast.VR = b;

		this.bttNorth.VR = c;
		this.bttWest.VL = c;

		this.bttEast.VL = d;
		this.bttSouth.VR = d;

		this.bttSouth.VL = e;
		this.bttWest.VR = e;

		this.bttNorth.VC = this.bttNorth.getHeight(new V3(0, 0, -0.5));
		this.bttEast.VC = this.bttEast.getHeight(new V3(0.5, 0, 0));
		this.bttSouth.VC = this.bttSouth.getHeight(new V3(0, 0, 0.5));
		this.bttWest.VC = this.bttWest.getHeight(new V3(-0.5, 0, 0));

		this.bttNorth.createChilds();
		this.bttEast.createChilds();
		this.bttSouth.createChilds();
		this.bttWest.createChilds();
	},

	getBTTLod : function(hypo)
	{
		this.nb_faces = 0;

		this.bttNorth.getLod(hypo);
		this.bttEast.getLod(hypo);
		this.bttSouth.getLod(hypo);
		this.bttWest.getLod(hypo);
	},

	printLOD : function()
	{

		let length = Math.pow(2, (LEVELMAX)) * (3 * 3 * 4);


		vertices = new Float32Array(length);
		colors = new Uint8Array(length);

		data = {
			vertices: vertices,
			colors: colors
		}

		let index = 0;
		index += this.bttNorth.printLod(data, index);
		index += this.bttEast.printLod(data, index);
		index += this.bttSouth.printLod(data, index);
		index += this.bttWest.printLod(data, index);

console.log("alloc vertices: " + length / 3);
console.log("used vertices:  " + index * 3);
console.log("ratio:          " + (index * 3) / (length / 3) );
console.log("----------------------");

		return data;
	},

	unbreakChunk : function()
	{
		this.bttNorth.unbreakBTT();
		this.bttEast.unbreakBTT();
		this.bttSouth.unbreakBTT();
		this.bttWest.unbreakBTT();
	}

};
