function Segment(_point1, _point2){
	this.point1=_point1;
	this.point2=_point2;
}

Segment.prototype.getPoint1 = function(){
	return this.point1;
}

Segment.prototype.getPoint2 = function(){
	return this.point2;
}

Segment.prototype.generateSvg = function(_class){
	
	var svg = '<line class="'+_class+'" x1="'+this.point1.getX()+'" x2="'+this.point2.getX()+'" y1="'+this.point1.getY()+'" y2="'+this.point2.getY()+'" />';
	
	return svg;
}