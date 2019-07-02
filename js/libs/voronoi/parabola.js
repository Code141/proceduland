function VParabola(s)
{
	this.cEvent = null;
	this.parent = null;
	this._left = null;
	this._right = null;

	this.site = s;
	this.isLeaf = (this.site != null);
}

VParabola.prototype = {
	get left(){
		return this._left;
	},

	get right(){
		return this._right;
	},

	set left(p){
		this._left = p;
		p.parent = this;
	},

	set right(p){
		this._right = p;
		p.parent = this;
	}
};

