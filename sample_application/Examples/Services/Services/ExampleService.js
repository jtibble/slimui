var ExampleService = function(){

	var service = {
		exampleData: {
			firstName: 'Sample',
			lastName: 'Data'
		},
		
		getExampleData: function(){
			return this.exampleData;
		}
	};
	
	return service;
};