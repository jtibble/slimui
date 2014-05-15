var ServicesController = function( Context, Modelbuilder, Actions, FetchJSONService ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
	
	FetchJSONService.listenForData( Context.Actions.FetchJSONServiceDataAvailable );
	
	// By calling fetchData() here, the service will retrieve the JSON data as soon as this controller is loaded
	// Alternatively, the call to fetchData() can be tied to an event, or an Action function
	FetchJSONService.fetchData();
};