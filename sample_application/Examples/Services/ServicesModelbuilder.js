var ServicesModelbuilder = function(Model, ExampleService, USAStates){
	return function( options ){
		if( options && options.fibonacciNumber ){
			Model.fibonacciNumber = options.fibonacciNumber;
		}
		
		if( options && options.jsonData ){
			Model.jsonData = options.jsonData;	
		}
		
		Model.data = ExampleService.getExampleData();
		Model.states = USAStates.states;
		return Model;
	};
};