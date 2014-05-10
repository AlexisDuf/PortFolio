function Point(x,y,pColor){
	if(pColor){
		this.pColor = pColor;
	}else{
		this.pColor = "black";
	}
	this.coordX = x;
	this.coordY = y;
	this.bezierIndex;
}


Point.prototype.getX = function(){
	return this.coordX;
}

Point.prototype.setBezierIndex = function(_bezierIndex){
	this.bezierIndex = _bezierIndex;
}

Point.prototype.getY = function(){
	return this.coordY;
}

Point.prototype.setX = function(_x){
	this.coordX = _x;
}

Point.prototype.setY = function(_y){
	this.coordY = _y;
}

Point.prototype.generateSvg = function(){
	var svg = '<circle id="point'+this.bezierIndex+'" cx="'+this.coordX+'" class="point" cy="'+this.coordY+'" r="5" data="'+this.bezierIndex+'" stroke="transparent" stroke-width="0" fill="'+this.pColor+'" />';
	return svg;
}

Point.prototype.computeTVect = function(point1, point2){
var vect = new Point(point2.coordX-point1.coordX,point2.coordY-point1.coordY,point1.pColor);
return vect;
}

Point.prototype.scalarMultiplication = function(value){
	this.coordX = this.coordX * value;
	this.coordY = this.coordY * value;
	return ;
}

Point.prototype.getNorme = function(){
	return Math.sqrt( (Math.pow(this.coordX,2)) + Math.pow(this.coordY,2) ) ;

}

Point.prototype.vectorialSum = function(vect){
	return new Point(this.coordX + vect.coordX, this.coordY + vect.coordY,this.pColor);
}