var ControllerCommunicationListenerController = function(Context, Modelbuilder, Actions, ControllerCommunication){
	Context.Model = Modelbuilder();
	Context.Actions = Actions;
	
	ControllerCommunication.registerCallback( 'ControllerCommunicationExampleChannel', Actions.notifyNumberChanged );
};