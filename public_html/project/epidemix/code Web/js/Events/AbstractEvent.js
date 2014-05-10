function AbstractEvent(_sender){
	this.sender = _sender;
}

AbstractEvent.prototype.getSender=function(){
	return this.sender;
}