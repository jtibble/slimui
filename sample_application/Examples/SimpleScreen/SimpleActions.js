// Actions are functions that can be invoked by interacting with the template

var SimpleActions = function(Modelbuilder){
	return {
		changeModel: function(){
			Modelbuilder( {firstName: 'Second, Changed', lastName: 'Model'} );	
		}
	};
};