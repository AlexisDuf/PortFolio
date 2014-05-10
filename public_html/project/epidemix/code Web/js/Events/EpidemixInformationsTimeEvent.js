function EpidemixInformationsTimeEvent(_sender, _currentTime){
	AbstractEvent.call(_sender);
	this.currentTime = _currentTime;
}

EpidemixInformationsTimeEvent.prototype = new AbstractEvent();