var PromisesController = function( Context, Modelbuilder, Actions, Promise ){
    
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
    
    var promise;
    if( Promise.createDeferred('Example') ){
        promise = Promise.getPromise( 'Example' );   
    }
    
    promise.then( function(){
        Modelbuilder({promiseResolved: true}); 
    });
};