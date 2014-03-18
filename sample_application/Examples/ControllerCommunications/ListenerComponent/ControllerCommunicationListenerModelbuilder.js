var ControllerCommunicationListenerModelbuilder = function(Model){
	return function(newNumber){
		if( newNumber ){
			Model.number = newNumber;	
		}
		
		return Model;
	};
};