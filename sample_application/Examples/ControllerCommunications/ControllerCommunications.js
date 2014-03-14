var ControllerCommunications = function(Context, ControllerCommunication){
	Context.model = {};
	
	Context.actions = {
		changeSharedData: function(){
			var randomNumber = Math.floor( Math.random()*1000 );
			ControllerCommunication.set('ControllerCommunicationExampleChannel', randomNumber );	
		}
	};
};