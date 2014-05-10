var epidemix = new Epidemix();

epidemix.addView(new EpidemixInformationsView());


(function(){
	setInterval(function(){

		var fct = function(){
			var color,_mapId;
			for(var i in countries){
				countries[i].nextStep();
			}
		};

		epidemix.fireTimeChangedEvent();
		fct();
		nextUniversStep();

	},epidemix.daysFactor*1000);
})();