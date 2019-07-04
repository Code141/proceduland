Chunk = function(x, z)
{
	this.x = x;
	this.z = z;

	this.LODArray = [];

	getHeight = function(vector)
	{
		absoluteX = x + vector.x;
		absoluteZ = z + vector.z;
		height = procedural(absoluteX, absoluteZ);
		vector.y = height;
		return vector;
	}

	let a = getHeight(new V3(0.5, 0.5, 0.5));
	let b = getHeight(new V3(1, 0.5, 0));
	let c = getHeight(new V3(0, 0.5, 0));
	let d = getHeight(new V3(1, 0.5, 1));
	let e = getHeight(new V3(0, 0.5, 1));


	this.bttNorth = new BinaryTriangleTree(x, z, a, b, c);
	this.bttEast = new BinaryTriangleTree(x, z, a, d, b);
	this.bttSouth = new BinaryTriangleTree(x, z, a, e, d);
	this.bttWest = new BinaryTriangleTree(x, z, a, c, e);

	this.bttNorth.createChilds();
	this.bttEast.createChilds();
	this.bttSouth.createChilds();
	this.bttWest.createChilds();
}


Chunk.prototype = {


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

		let nb_face = 0;
		nb_face += this.bttNorth.count();
		nb_face += this.bttEast.count();
		nb_face += this.bttSouth.count();
		nb_face += this.bttWest.count();


		let length = nb_face * (3 * 3);

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
