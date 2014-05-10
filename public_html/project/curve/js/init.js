(function(){
	var click=false;
	var indexClick;
	var startPoint =new Point(500, 400,"red");
	var endPoint = new Point(250,200,"red");
	startPoint.setBezierIndex(0);
	endPoint.setBezierIndex(1);
	var controlPoints = [startPoint, endPoint];
	var courbe = new Bezier(100, controlPoints, 0);
	Utils.setSvg("svgContainer1", courbe.generateSvg());

	$("#init_ex1").click(function(){
		courbe = new Bezier(100,controlPoints,courbe.mode, courbe.tolerance, courbe.deltaDist, courbe.railsOfTrain, courbe.showLignes, courbe.showControlPoints);
		Utils.setSvg("svgContainer1",courbe.generateSvg());
	});

	$('#svgContainer1').mousemove(function(ev){
		if(click){
			courbe.controlPoints[indexClick].setX(ev.clientX-$("#svgContainer1").position().left);
			courbe.controlPoints[indexClick].setY(ev.clientY-$("#svgContainer1").position().top);
			Utils.setSvg("svgContainer1",courbe.generateSvg());
		}
	})

	$('#svgContainer1').mousedown(function(ev){
		var pointId = $(ev.target).attr("data");
		if(pointId){
			coordX = ev.clientX-$("#svgContainer1").position().left;
			coordY = ev.clientY-$("#svgContainer1").position().top;
			console.log("test");
			click=true;
			indexClick=pointId;
		}
		
	})

	$('#svgContainer1').click(function(ev){
		var coordX, coordY;
		coordX = ev.clientX-$("#svgContainer1").position().left;
		coordY = ev.clientY-$("#svgContainer1").position().top;

		var pointId = $(ev.target).attr("data");

		if(!pointId){ // C'est un point qui est cliqué
			var point = new Point(coordX,coordY,"blue");
			courbe.setControlControlPoint(point);
			Utils.setSvg("svgContainer1",courbe.generateSvg());
		}
	});

	$('.ex1_btn').click(function(ev){
		courbe.setMode(0);
		Utils.setSvg("svgContainer1", courbe.generateSvg());
		$('.coefBinomMenuElement').css('display','block');
		$('.CasteljauMenuElement').css('display','none');
		$('.railsMenuElement').css('display','none');
		$('#currentMethode').text("Méthode du Coefficient binomial");
	});

	$('.ex2_btn').click(function(ev){
		courbe.setMode(1);
		Utils.setSvg("svgContainer1", courbe.generateSvg());
		$('.coefBinomMenuElement').css('display','none');
		$('.CasteljauMenuElement').css('display','block');
		$('.railsMenuElement').css('display','block');
		$('#currentMethode').text("Méthode de De Casteljau");
	});


	$('#svgContainer1').mouseup(function(){
		click=false;
	})




	/*
	***   Commandes
	*/

	/*
	** Modification du nombre de points pour la méthode du coefficient binomial
	*/

	$('#numberOfPointsRange').change(function(){
		numberOfPoints=$('#numberOfPointsRange').val()
		$('#numberOfPoints').text(numberOfPoints);
		courbe.setNumberOfPoints(numberOfPoints);
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	/*
	** Modification de la tolérance pour la méthode de De Casteljau
	*/

	$('#toleranceRange').change(function(){
		tolerance = $('#toleranceRange').val();
		courbe.setTolerance(tolerance);
		$('#tolerance').text(tolerance);
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	$('#deltaDistRange').change(function(){
		deltaDist = $('#deltaDistRange').val();
		courbe.setDeltaDist(deltaDist);
		$('#deltaDist').text(deltaDist);
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	/*
	** Affichage ou non des lignes entre les points de controle
	*/

	$('#showLignes').change(function(){
		if(courbe.showLignes){
			courbe.showLignes=false;
		}else{
			courbe.showLignes=true;
		}
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	$('#showControlPoints').attr('checked', true);

	/*
	** Affichage ou non des points de controles
	*/

	$('#showControlPoints').change(function(){
		if(courbe.showControlPoints){
			courbe.showControlPoints = false;
		}
		else{
			courbe.showControlPoints = true;
		}
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	$('#showRails').change(function(){
		if(courbe.railsOfTrain){
			courbe.railsOfTrain = false;	
		}
		else{
			courbe.railsOfTrain = true;;
		}
		Utils.setSvg("svgContainer1", courbe.generateSvg());
	});

	
})();