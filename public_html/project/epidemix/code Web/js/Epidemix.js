function Epidemix(_guerisonFactor, _contagionFactor, _nbInfectes, _nbDead){

	this.startTime = new Date();
	this.daysFactor=1;
	this.currentCountry;
}


Epidemix.prototype = new AbstractModel();


Epidemix.prototype.setGuerisonFactor = function(_guerisonFactor){
	this.guerisonFactor = _guerisonFactor;
	this.fireEvent("refreshEpidemixInformations",new EpidemixInformationsEvent( this.guerisonFactor, this.contagionFactor, this.nbInfectes, this.nbDead, this.getCurrentTime() ) );
}

Epidemix.prototype.setContagionFactor = function(_contagionFactor){
	this.contagionFactor = _contagionFactor;
	this.fireEvent("refreshEpidemixInformations",new EpidemixInformationsEvent( this.guerisonFactor, this.contagionFactor, this.nbInfectes, this.nbDead, this.getCurrentTime() ) );
}

Epidemix.prototype.setNbInfectes = function(_nbInfectes){
	this.nbInfectes = _nbInfectes;
	this.fireEvent("refreshEpidemixInformations",new EpidemixInformationsEvent( this.guerisonFactor, this.contagionFactor, this.nbInfectes, this.nbDead, this.getCurrentTime() ) );
}

Epidemix.prototype.setNbDead = function(_nbDead){
	this.nbDead = _nbDead;
	this.fireEvent("refreshEpidemixInformations",new EpidemixInformationsEvent( this.guerisonFactor, this.contagionFactor, this.nbInfectes, this.nbDead, this.getCurrentTime() ) );
}

Epidemix.prototype.fireTimeChangedEvent = function(){
	this.fireEvent("refreshTime",new EpidemixInformationsTimeEvent( this,this.getCurrentTime() ));
}

Epidemix.prototype.setCurrentCountry = function(_currentCountry){
	this.currentCountry = _currentCountry;
	this.fireEvent("refreshCurrentCountry", new CurrentCountryChangedEvent(this) );
}

Epidemix.prototype.getCurrentTime = function(){
	var currentDate = new Date(),
		months,
		years,
		days = (currentDate.getTime() - this.startTime.getTime())/(this.daysFactor*1000);

	years = Math.floor(days/365);
	days -= years*365;

	months = Math.floor(days/30);
	days -= months*30;

	return new MyDate(Math.floor(days),months,years);
}


