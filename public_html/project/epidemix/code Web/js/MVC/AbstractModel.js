function AbstractModel(){
	this.views=new Array();
	this.connectView=true;
}


AbstractModel.prototype.addView = function(view){
  this.views.push(view);
  if(view.viewAdded!=undefined){
    view.viewAdded();
  }
}

AbstractModel.prototype.removeView=function(id){
  this.views[id].clearView();
  this.views.splice(id,1);
}

AbstractModel.prototype.getNumberOfView=function(){
  return this.views.length;
}

/** Fonction permettant de notifier l'ensemble des vues du modèle **/

AbstractModel.prototype.fireEvent=function(functionName,ev){ // Permet d'appeler le rafraichissement sur chacune des vues
  if(this.connectView){
    var i,m;
    for(i=0;i<this.getNumberOfView();i++){
      m=this.views[i][functionName];
      if(m!==undefined){
        this.views[i][functionName](ev);
      }
    }
  }
}

AbstractModel.prototype.disconnectViews=function(){
  this.connectView=false;
}

AbstractModel.prototype.connectViews=function(){
  this.connectView=true;
}