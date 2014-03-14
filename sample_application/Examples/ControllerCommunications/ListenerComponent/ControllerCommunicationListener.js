var ControllerCommunicationListener = function(Context, ControllerCommunication){
	Context.model = {
		number: 'Number Not Set!'	
	};
	
	Context.actions = {
		notifyNumberChanged: function(){
			Context.model.number = ControllerCommunication.get( 'ControllerCommunicationExampleChannel' );
		}
	};
	
	ControllerCommunication.registerCallback( 'ControllerCommunicationExampleChannel', Context.actions.notifyNumberChanged );
};