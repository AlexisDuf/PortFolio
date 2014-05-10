var currentCountry;

jQuery('#vmap').vectorMap({
		    map: 'world_en',
		    backgroundColor: null,
		    color: '#ffffff',
		    hoverOpacity: 0.7,
		    selectedColor: '#666666',
		    enableZoom: true,
		    showTooltip: true,
		    values: sample_data,
		    scaleColors: ['#C8EEFF', '#006491'],
		    normalizeFunction: 'polynomial',
		    selectedColor: '#c9dfaf',
		    onRegionClick: function(element, code, region){

		    	currentCountry = countries[code.toUpperCase()];
		    	$('#current-country-name').text(""+currentCountry.countryName+"");
				$('#current-country-startPopulation').text(""+currentCountry.startPopulation+"");
				$('#current-country-totalPopulation').text(""+parseInt(currentCountry.nbInfectes+currentCountry.nbHealthy)+"");
				$('#current-country-infectes').text(""+parseInt(currentCountry.nbInfectes)+"");
				$('#current-country-dead').text(""+parseInt(currentCountry.nbDead)+"");

				$('#current-country-deathFactor').text(Univers[currentCountry.countryGroupId].deathFactor);
				$('#current-country-birthFactor').text(Univers[currentCountry.countryGroupId].birthFactor);
				$('#current-country-emigrationFactor').text(currentCountry.emigration);
				$('#current-country-thereshold').text(parseInt(currentCountry.threshold));

				$('#general-informations-guerison').text("Guerison : "+Univers[currentCountry.countryGroupId].guerisonFactor+"");
				$('#general-informations-contagion').text("Contagion : "+Univers[currentCountry.countryGroupId].contagionFactor+"");
    		}
});


$('.graphs-country').click(function(){
	var myChart = new JSChart('chartcontainer', 'line');
	myChart.setLineSpeed(500);
	myChart.setTitle("Evolution des populations au cours du temps");

	myChart.setDataArray(currentCountry.nbDeadResult, "Morts");
	myChart.setDataArray(currentCountry.nbHealthyResult, "Sains");
	myChart.setDataArray(currentCountry.nbInfectesResult, "Infectés");
	myChart.setDataArray(currentCountry.nbSurviveResult, "Guéris");

	myChart.setLineColor("#DF0000", "Morts");
	myChart.setLineColor("#0081CB", "Sains");
	myChart.setLineColor("#DF6507", "Infectés");
	myChart.setLineColor("#00DC1D","Guéris")

	myChart.setLegendForLine("Morts", "Morts");
	myChart.setLegendForLine("Sains", "Sains");
	myChart.setLegendForLine("Infectés", "Infectés");
	myChart.setLegendForLine("Guéris", "Guéris");

	myChart.draw();
});