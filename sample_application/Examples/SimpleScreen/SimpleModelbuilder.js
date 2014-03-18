// Modelbuilders always accept a Model

var SimpleModelbuilder = function(Model){
	
	// Modelbuilders must return a function that can be called.
	//    This function returns the built model
	return function( config ){
		
		// Modelbuilders can be configured to add/remove/change Model properties
		//     See http://en.wikipedia.org/wiki/Builder_pattern
		if( config && config.firstName && config.lastName ){
			Model.firstName = config.firstName;
			Model.lastName = config.lastName;
		}
		
		return Model;
	};
};