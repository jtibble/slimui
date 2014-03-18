var ExamplesActions = function(Modelbuilder){
	return {
		getOtherModel: function(){
			return Modelbuilder.otherModel;
		},
		changeModel: function(){
			Modelbuilder.otherModel = {firstName: 'Second, Changed', lastName: 'Model'};	
		}
	};
};