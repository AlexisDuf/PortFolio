function CountryGroup (_countryGroupId,  _countries, _deathFactor, _contagionFactor, _guerisonFactor, _birthFactor, _percentEmigration){
	this.deathFactor = _deathFactor; // Facteur décès de la maladie dans le pays
	this.contagionFactor = _contagionFactor; // Facteur de contagion
	this.guerisonFactor = _guerisonFactor; // Facteur de guérison
	this.birthFactor = _birthFactor; // Facteur de naissance 
	this.percentEmigration = _percentEmigration; // Pourcentage d'émigration du continent
	this.countries = _countries; // Pays contenus dans le groupe de pays

	if(_percentEmigration == undefined){
		this.percentEmigration = 5000;
	}else{
		this.percentEmigration = _percentEmigration;
	}
}

/*
** Fonction permettant les échanges entre les différents univers
*/

/*CountryGroup.prototype.nextStep = function(){
	for(var i =0 ; i<this.countries.length; i++){
		this.countries[i];
	}
}*/

