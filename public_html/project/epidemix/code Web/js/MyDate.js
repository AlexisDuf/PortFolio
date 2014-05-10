function MyDate(_day, _month, _year){
	this.day = _day;
	this.month = _month;
	this.year = _year;
}

MyDate.prototype.getDays = function(){
	return this.day;
}

MyDate.prototype.getMonths = function(){
	return this.month;
}

MyDate.prototype.getYears = function(){
	return this.year;
}