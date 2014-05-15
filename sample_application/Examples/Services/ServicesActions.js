var ServicesActions = function(Modelbuilder, FibonacciService, FetchJSONService){
	return {
		getNextFibonacciNumberFromService: function(){
			Modelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );
		},
		
		// This function is called when the service retrieves the JSON data from REST service or file
		FetchJSONServiceDataAvailable: function(){
			
			// Retrieve most-recent data from service
			var data = FetchJSONService.getData();
			
			// Add the data to our Model, which is then exposed to the template and rendered
			Modelbuilder( {jsonData: data} );
		}
	};
};