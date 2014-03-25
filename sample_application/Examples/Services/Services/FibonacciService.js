var FibonacciService = function( ){
	return {
		a: 1,
		b: 1,
		getNextFibonacciNumber: function(){
			var value = this.a + this.b;
			this.a = this.b; 
			this.b = value;
			return value;	
		}
	};
};
