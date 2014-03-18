var ControllerCommunicationListenerActions = function(ControllerCommunication, Modelbuilder){
	return {
		notifyNumberChanged: function(){
			var newNumber = ControllerCommunication.get( 'ControllerCommunicationExampleChannel' );
			Modelbuilder( newNumber );
		}
	}
};