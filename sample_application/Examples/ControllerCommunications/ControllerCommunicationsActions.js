var ControllerCommunicationsActions = function(ControllerCommunication){
	return {
		changeSharedData: function(){
			var randomNumber = Math.floor( Math.random()*1000 );
			ControllerCommunication.set('ControllerCommunicationExampleChannel', randomNumber );	
		}
	};
}