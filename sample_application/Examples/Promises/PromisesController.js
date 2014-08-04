var PromisesController = function( Context, Modelbuilder, Actions, $q ){
    
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
    
    var deferred = $q.defer();    
    var promise = deferred.promise;
    
    Context.Actions.storeDeferred(deferred);
    
    promise.then( function(){
        Modelbuilder({promiseResolved: true}); 
    });
};