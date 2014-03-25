var ServicesModelbuilder = function(Model, ExampleService, USAStates){
	return function( settings ){
		if( settings && settings.fibonacciNumber ){
			Model.fibonacciNumber = settings.fibonacciNumber;
		}
		
		Model.data = ExampleService.getExampleData();
		Model.states = USAStates.states;
		return Model;
	};
};