var ExamplesModelbuilder = function(Model){
	
	var newModel = {
		firstName: Model.firstName,
		lastName: Model.lastName,
		otherModel: {
			firstName: 'Other',
			lastName: 'Model'
		}
	};
	
	return newModel;
};