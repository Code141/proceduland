Chunk = function(x, z)
{
	this.x = x;
	this.z = z;

	this.LODArray = [];

	V3.prototype.setHeight = function()
	{
		let pro = procedural(x + this.x, z + this.z);
		this.y = pro.height;
		this.color = pro.color;
	}

	let a = new V3(0, 0, 0);

	let b = new V3(0.5, 0, -0.5);
	let c = new V3(-0.5, 0, -0.5);
	let d = new V3(0.5, 0, 0.5);
	let e = new V3(-0.5, 0, 0.5);

	a.setHeight();
	b.setHeight();
	c.setHeight();
	d.setHeight();
	e.setHeight();

	this.north = new BinaryTriangleTree(a, b, c);
	this.east = new BinaryTriangleTree(a, d, b);
	this.south = new BinaryTriangleTree(a, e, d);
	this.west = new BinaryTriangleTree(a, c, e);

	this.north.NL = this.east;
	this.north.NR = this.west;
	this.east.NL = this.south;
	this.east.NR = this.north;
	this.south.NL = this.west;
	this.south.NR = this.east;
	this.west.NL = this.north;
	this.west.NR = this.south;

	this.north.createChilds();
	this.east.createChilds();
	this.south.createChilds();
	this.west.createChilds();
}

Chunk.prototype = {

	getBTTLod : function(hypo)
	{
		this.nb_faces = 0;

		this.north.getLod(hypo);
		this.east.getLod(hypo);
		this.south.getLod(hypo);
		this.west.getLod(hypo);
	},

	printLOD : function()
	{

		let nb_face = this.north.count() + this.east.count() + this.south.count() + this.west.count();

		let length = nb_face * (3 * 3);

		vertices = new Float32Array(length);
		colors = new Uint8Array(length);

		data = {
			vertices: vertices,
			colors: colors
		}

		let index = 0;
		index += this.north.printLod(data, index);
		index += this.east.printLod(data, index);
		index += this.south.printLod(data, index);
		index += this.west.printLod(data, index);

		return data;
	},

};
