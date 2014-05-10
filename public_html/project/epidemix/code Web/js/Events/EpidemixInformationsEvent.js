function EpidemixInformationsEvent(_guerisonFactor, _contagionFactor, _nbInfectes, _nbDead, _time){
	this.guerisonFactor = _guerisonFactor;
	this.contagionFactor = _contagionFactor;
	this.nbInfectes = _nbInfectes;
	this.nbDead = _nbDead;
	this.currentTime = _time;
}

EpidemixInformationsEvent.prototype = new AbstractEvent();