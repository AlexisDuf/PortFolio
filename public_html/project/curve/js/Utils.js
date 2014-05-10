/*
** Objet global Utils permettant d'externaliser certaines fonctions utilitaires
*/

var Utils = (function(){

	var fact=function(number){
		if(number == 0 || number==1){
			return 1;
		}else{
			return number*fact(number-1);
		}
	}

	var coefBinom = function(n,m){
		return fact(n) / (fact(m)*fact(n-m));
	}


	return{
		getPoint : function(controlPoints, numberBezierPoints, index){
			var numberControlPoints = controlPoints.length;
			var coordX=0,
				coordY=0;

			var t = index/numberBezierPoints;

			for(var i = 0 ; i < numberControlPoints ; i++){
				coordX += coefBinom(numberControlPoints-1,i) * Math.pow(t,i) * Math.pow(1-t,numberControlPoints-1-i) * controlPoints[i].getX();
				coordY += coefBinom(numberControlPoints-1,i) * Math.pow(t,i) * Math.pow(1-t,numberControlPoints-1-i) * controlPoints[i].getY();
			}

			return new Point(coordX,coordY);
		},

		setSvg : function(divName, svgCode){		
			var a = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="ex1Svg">';
			$('#'+divName).empty().append(a+svgCode+"</svg>");
		},

		getMidle : function(point1, point2){
			var x,y;
			x = ( point1.getX() + point2.getX() ) / 2 ;
			y = ( point1.getY() + point2.getY() ) / 2 ;
			return new Point(x,y);

		},

		getDist : function(point1, point2){
			return Math.sqrt( Math.pow( point1.getX()-point2.getX() , 2) + Math.pow( point1.getY()-point2.getY() , 2) );
		},


	}

})();