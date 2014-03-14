var Examples = function(Context, Router){
	
	Context.model = {
		examplesList: [
			{
				text: 'Routing',
				url: 'Examples.Routing'
			},
			{
				text: 'Controller Communications',
				url: 'Examples.ControllerCommunications'
			},
			{
				text: 'Sending AJAX Requests',
				url: 'Examples.AJAX'
			},
			{
				text: 'Parameter Passing',
				url: 'Examples.ParameterPassing'
			},
			{
				text: 'Static/Dynamic Data Services',
				url: 'Examples.Services'
			}
		]
	};
	
	Context.actions = {
		goTo: function(route){
			Router.goTo( route );
		}
	};
	
};

