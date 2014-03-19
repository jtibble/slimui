var ParameterPassingController = function( Context, Modelbuilder, Actions, StateParameters ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder( StateParameters );
};