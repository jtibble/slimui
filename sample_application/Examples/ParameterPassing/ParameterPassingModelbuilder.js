var ParameterPassingModelbuilder = function(Model){
	return function( parameters ){
		Model.parameters = parameters;
		return Model;
	};
};