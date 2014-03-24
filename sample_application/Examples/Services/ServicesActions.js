var ServicesActions = function(Modelbuilder, FibonacciService){
	return {
		getNextFibonacciNumberFromService: function(){
			Modelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );
		}
	};
};