function Country(_mapId, _countryName, _startPopulation,_countryGroupId){
	this.mapId = _mapId;
	this.countryName = _countryName;

	if(_startPopulation == undefined){
		this.startPopulation = 100000000;
	}else{
		this.startPopulation = _startPopulation;
	}
	

	this.nbDead = 0;
	this.nbSurvive =0;
	this.nbInfectes = 100;
	this.nbHealthy = this.startPopulation;
	this.countryGroupId = _countryGroupId;

	

	this.threshold = 1.5*this.startPopulation;


	/**
	** Résultats obtenus
	*/

	this.nbDeadResult = new Array();
	this.nbHealthyResult = new Array();
	this.nbInfectesResult = new Array();
	this.nbSurviveResult = new Array();
}


/*
** Setteurs
*/

Country.prototype.setNbInfectes = function(_nbInfectes){
	this.nbInfectes = _nbInfectes;
}

/*
** Calcul 
*/

Country.prototype.getColor = function(){
	var percent = Math.floor( (this.nbInfectes / (this.nbInfectes+this.nbHealthy+this.nbSurvive) )*50 );
	if(percent >= 100){
		percent = 100;
	}
	return MapColors[""+percent+""];
}

Country.prototype.addImInf = function(ImInf){
	this.nbInfectes += ImInf;
}

Country.prototype.addImSai = function(ImSai){
	this.nbHealthy += ImSai;
}

Country.prototype.nextStep=function(){

	this.nbDead += this.getDerivativeM();
	this.nbSurvive += this.getDerivativeG();
	this.nbInfectes += this.getDerivativeI()*CalculParameter.deltaT;
	this.nbHealthy += this.getDerivativeS()*CalculParameter.deltaT;

	var currentTime = epidemix.getCurrentTime();
	var days = currentTime.getYears()*365+currentTime.getMonths()*30+currentTime.getDays();

	if(this.nbDead < 0){
		this.nbDead =0;
	}

	if(this.nbSurvive<0){
		this.nbSurvive =0;
	}

	if(this.nbInfectes <0){
		this.nbInfectes=0;
	}

	if(this.nbHealthy<0){
		this.nbHealthy=0;
	}

	this.nbDeadResult.push([days,this.nbDead]);
	this.nbHealthyResult.push([days,this.nbHealthy]);
	this.nbInfectesResult.push([days,this.nbInfectes]);
	this.nbSurviveResult.push([days,this.nbSurvive]);

	if(this.nbHealthy < 0){
		this.nbHealthy = 0;
	}
	
	var color = this.getColor();
	
	$('#jqvmap1_'+this.mapId.toLowerCase()+'').css("fill",color);

}

Country.prototype.getDerivativeS = function(){
	return (-1*Univers[this.countryGroupId].contagionFactor*this.nbInfectes*this.nbHealthy) + Univers[this.countryGroupId].birthFactor*this.nbHealthy*(1-(this.nbHealthy/this.threshold)) ;
}

Country.prototype.getDerivativeI = function(){
	return (Univers[this.countryGroupId].contagionFactor*this.nbInfectes*this.nbHealthy) - this.getDerivativeM() - this.getDerivativeG();
}

Country.prototype.getDerivativeM = function(){
	return (Univers[this.countryGroupId].deathFactor*this.nbInfectes);
}

Country.prototype.getDerivativeG = function(){
	return Univers[this.countryGroupId].guerisonFactor*this.nbInfectes;
}


/*
** Fonctions relatives à la vue
*/