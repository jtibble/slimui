// A Controller needs to receive the following parameters:
//   Context (which is exposed to the template), 
//   Actions (functions that can be called by actions in the template)
//   Modelbuilder (which is invoked to get a model to display)

var SimpleController = function( Context, Modelbuilder, Actions ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
};