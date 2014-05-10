/*
*** Si mode = 0 première méthode si mode = 1 de casteljau
*/
function Bezier(_numberOfPoints, _controlPoints, _mode, _tolerance, _deltaDist, _railsOfTrain, _showLignes, _showControlPoints){
	this.numberOfPoints= _numberOfPoints; // Nombre de points que l'on veut calculer pour la méthode du coefficient binomial
	this.controlPoints = _controlPoints; // Tableau stockant les points de controles

	if(_mode){
		this.mode = _mode; // Le mode correspond à l'exercice que l'on doit afficher à l'écran
	}else{
		this.mode = 0; // Le mode par défaut est celui du coefficient binomial
	}
	
	if(_tolerance){
		this.tolerance = _tolerance; // La tolérance est celle appliqué dans la récursion de De Casteljau
	}else{
		this.tolerance = 1; // Par défaut la tolérance est de 1
	}

	if(_deltaDist){
		this.deltaDist = _deltaDist; // Le deltaDist correspond à l'écart que l'on veut entre la courbe de Bézier et les rails.
	}else{
		this.deltaDist = 30; // Par défaut la distance entre la courbe et les rails est de 10
	}

	if(_railsOfTrain){
		this.railsOfTrain = _railsOfTrain; // Boolean permettant de savoir si l'on affiche ou non les rails
	}else{
		this.railsOfTrain = false; // Par défaut on n'affiche pas les rails
	}

	if(_showLignes){
		this.showLignes = _showLignes;
	}else{
		this.showLignes = false;
	}

	if(_showControlPoints){
		this.showControlPoints = _showControlPoints;
	}else{
		this.showControlPoints = true;
	}
}

Bezier.prototype.getNumberOfPoints = function(){
	return this.numberOfPoints;
}

Bezier.prototype.getControlPoints = function(){
	return this.controlPoints;
}

/*
** Fonction permettant de générer le code Svg afin de l'afficher à l'écran
*/

Bezier.prototype.generateSvg = function(){
	if(this.mode ==0){
		var svg="",
		prevPoint,
		nextPoint,
		currentSegment;

		prevPoint = this.controlPoints[0];

		for(var i = 0; i <= this.numberOfPoints; i++){
			nextPoint = Utils.getPoint(this.controlPoints, this.numberOfPoints, i);
			currentSegment = new Segment(prevPoint, nextPoint);
			svg += currentSegment.generateSvg("bezier");
			prevPoint=nextPoint;
		}

		if(this.showLignes){
			for(var i=0; i<this.controlPoints.length-1;i++){
				currentSegment = new Segment(this.controlPoints[i],this.controlPoints[i+1]);
				svg+= currentSegment.generateSvg("controlPointsSegment");
			}
		}
		
	}
	else{

		/*
		** Focntion permettant de créer une matrice de taille n*n à partir du tableau des points de controles
		** afin de pouvoir stocker les points milieu.
		*/

		var createMatrix = function(listOfPoints){
			var size = listOfPoints.length;
			var matrix = new Array(size);

			for(var i = 0; i< matrix.length; i++){
				matrix[i] = new Array(size);
			}
			for(var j=0 ; j<matrix.length; j++){
				matrix[0][j] = listOfPoints[j];
			}
			return matrix;
		};

		/*
		** Fonction qui permet de récupérer les 2 tableaux sur lesquels il faut relancer la récurssion
		*/

		var createLists = function(matrix){

			/*
			** Fonction permettant de récupérer le premier tableau
			*/

			var getFirstList = function(matrixx){
				var list = new Array(matrixx[0].length);
				for(var i = 0; i <matrixx[0].length; i++){
					list[i] = matrixx[i][0];
				}
				return list;
			};

			/*
			** Fonction permettant de récupérer le deuxième tableau
			*/

			var getSecondList = function(matrixx){
				var list = new Array(matrixx[0].length);
				for(var i = 0; i < matrixx.length ; i++){
					list[matrixx.length-i-1] = matrixx[i][matrixx.length-i-1];
				}
				return list;
			};

			var result = new Array(2);
			result[0] =  getFirstList(matrix);
			result[1] = getSecondList(matrix);
			return result;			
		};


		/*
		** Fonction de récursion de l'algorithme de De Casteljau
		*/


		var rec = function(listOfPoints, tolerance){
			if(Utils.getDist(listOfPoints[0],listOfPoints[1]) <= tolerance){
				return listOfPoints;
			}
			else{
				var matrix = createMatrix(listOfPoints);
				for(var i = 0; i<matrix[0].length-1; i ++){
					for(var j =0; j<matrix[0].length-i-1; j++){
						matrix[i+1][j] = Utils.getMidle(matrix[i][j], matrix[i][j+1]);
					}
				}
				var a = createLists(matrix);
				var result1 = rec(a[0],tolerance);
				var result2 = rec(a[1],tolerance);
				return result1.concat(result2);
			}
		};


		var result = rec(this.controlPoints,this.tolerance); // On lance la récursion et on récupère l'ensemble des points de la courbe à afficher
		var currentSegment;
		var currentSegment2;

		if(this.railsOfTrain){
			var railsTrain = this.getSvgRailsOfTrain(result);
			console.log(railsTrain[0].length);
			for(var i = 0; i<railsTrain[0].length-1; i++){

				if(!isNaN(railsTrain[0][i].getX()) && !isNaN(railsTrain[0][i+1].getX()) && !isNaN(railsTrain[0][i].getY()) && !isNaN(railsTrain[0][i+1].getY())){
					currentSegment = new Segment(railsTrain[0][i], railsTrain[0][i+1]);				
					svg += currentSegment.generateSvg();
				}
	
				if(!isNaN(railsTrain[1][i].getX()) && !isNaN(railsTrain[1][i+1].getX()) && !isNaN(railsTrain[1][i].getY()) && !isNaN(railsTrain[1][i+1].getY()) ){
					currentSegment2 = new Segment(railsTrain[1][i], railsTrain[1][i+1]);
					svg += currentSegment2.generateSvg();
				}
				
			}
		}

		for(var i =0 ; i<result.length-1;i++){ 						// On construit les segments entre les points que l'on a récupéré
			currentSegment = new Segment(result[i],result[i+1]);
			svg += currentSegment.generateSvg("bezier");
		}

	}

	/*
	***  Affichage des points de controle
	*/

	if(this.showControlPoints){
		for(var j =0 ; j < this.controlPoints.length ; j++){
			svg += this.controlPoints[j].generateSvg();
		}
	}
	

	return svg; // On retourne le code svg généré 
	
}

/*
** Fonction qui retourne le code svg nécessaire pour afficher les rails du train
*/


Bezier.prototype.getSvgRailsOfTrain=function(listOfPoints){
	var listOfPoints1 = new Array();
	var listOfPoints2 = new Array();
	var tVect = new Point();
	var nVect = new Point();

	var computeNVect = function(vect){
		return new Point((-1)*vect.getY(),vect.getX(),vect.pColor);

	} ;



	for(var i = 0 ; i < listOfPoints.length-1 ; i++){
		tVect = tVect.computeTVect(listOfPoints[i],listOfPoints[i+1]);
		tVect.scalarMultiplication(1/tVect.getNorme());
		
		nVect = computeNVect(tVect);
		

		

		//if(i%2 == 0){
			nVect.scalarMultiplication(this.deltaDist);

			listOfPoints1.push(listOfPoints[i].vectorialSum(nVect));

			nVect.scalarMultiplication((-1));
			listOfPoints2.push(listOfPoints[i].vectorialSum(nVect));
		//}

	}
	var result = new Array(2);
		result[0]=listOfPoints1;
		result[1]=listOfPoints2;


		return result;
}

/*
** Fonction permettant de rajouter un point de contrôle
*/ 

Bezier.prototype.setControlControlPoint=function(_controlPoint){
	_controlPoint.setBezierIndex(this.controlPoints.length-1);
	var newControlPoints = new Array(this.controlPoints.length+1);
	for(var i = 0 ; i < this.controlPoints.length-1; i++){
		newControlPoints[i]=this.controlPoints[i];
	}
	this.controlPoints[this.controlPoints.length-1].setBezierIndex(this.controlPoints.length);
	newControlPoints[this.controlPoints.length-1]=_controlPoint;
	newControlPoints[this.controlPoints.length]=this.controlPoints[this.controlPoints.length-1];
	this.controlPoints=newControlPoints;
}

/*
** Changement de la variable numberOfPoints (nombre de points pour la méthode du coefficient binomial)
*/

Bezier.prototype.setNumberOfPoints = function(_numberOfPoints){
	this.numberOfPoints = _numberOfPoints
}

/*
** Changement de mode 
** Pour rappel : 
** Mode 0 : Coefficient Binomial
** Mode 1 : De Casteljau
*/

Bezier.prototype.setMode = function(_mode){
	this.mode = _mode;
}

/*
** Changement de la tolérance (arrêt de la récursion de De Casteljau)
**/

Bezier.prototype.setTolerance = function(_tolerance){
	this.tolerance = _tolerance;
}

/*
** Fonction permettant de passer à vrai ou faux le boolean qui permet de savoir si on affiche les rails ou pas
*/

Bezier.prototype.setRailsOfTrain = function(_railsOfTrain){
	this.railsOfTrain = _railsOfTrain;
}

Bezier.prototype.setDeltaDist = function(_deltaDist){
	this.deltaDist = _deltaDist;
}
