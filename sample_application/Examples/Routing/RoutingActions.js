var RoutingActions = function(Modelbuilder, Router){
	return {
		goToExamples: function(){
			Router.goTo('Examples');	
		},
		goToParameterPassing: function(){
			Router.goTo('ParameterPassing');
		},
		goToParameterPassingSubroute: function(){
			Router.goTo('ParameterPassing.ParameterPassingSubroute');
		},
		goToHome: function(){
			Router.goToHome();
		},
        getStateParameters: function(){
            Modelbuilder({parameters: Router.getStateParameters()});
        }
	}
};