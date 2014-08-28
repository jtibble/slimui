var PromisesActions = function( Modelbuilder, Promise ){
	return { 
        createPromise: function(){
            var promise;
            if( Promise.createDeferred('Example') ){
                promise = Promise.getPromise( 'Example' );   
            }

            promise.then( function(){
                Modelbuilder({promiseResolved: true}); 
            });
            
            var randomTimeout = Math.random()*2000 + 4000;
            Modelbuilder({timeout: randomTimeout});
            
            setTimeout( function(){
                Promise.resolveDeferred( 'Example' );
            }, randomTimeout );
        }
    };
};