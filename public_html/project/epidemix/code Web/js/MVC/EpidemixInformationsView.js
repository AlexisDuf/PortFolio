function EpidemixInformationsView(){

}

EpidemixInformationsView.prototype = new AbstractView();

EpidemixInformationsView.prototype.refreshEpidemixInformations = function(ev){
	$('#general-informations-time').text("Temps : Y "+ev.currentTime.getYears()+" M "+ev.currentTime.getMonths()+" D "+ev.currentTime.getDays());
	$("#general-informations-contagion").text("contagion : "+ev.contagionFactor+"");
	$('#general-informations-guerison').text("Guérison : "+ev.guerisonFactor+"");
	$('#general-informations-infectes').text("Infectés : "+ev.nbInfectes+"");
	$('#general-informations-dead').text("Décés : "+ev.nbDead+"");
}

EpidemixInformationsView.prototype.refreshTime = function(ev){
	$('#general-informations-time').text("Time : Y "+ev.currentTime.getYears()+" M "+ev.currentTime.getMonths()+" D "+ev.currentTime.getDays());
}