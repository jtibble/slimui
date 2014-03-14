var Routing = function(Context, Router){
	Context.model = {};
	
	Context.actions = {
		goToExamples: function(){
			Router.goTo('Examples');	
		},
		goToChildViews: function(){
			Router.goTo('Examples.ChildViews');
		},
		goToParameterPassingDestination: function(){
			var parameters = {
				originatingView: 'Examples/Routing'	
			}
			Router.goTo('Examples.ParameterPassingDestination', parameters);
		},
		goToHome: function(){
			Router.goToHome();
		}
	};
};