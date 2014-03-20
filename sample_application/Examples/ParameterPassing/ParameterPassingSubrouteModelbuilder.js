var ParameterPassingSubrouteModelbuilder = function(Model){
	return function( parameters ){
		
		if( parameters ){
			Model.parameters = parameters;
		}
		
		return Model;
	};
};