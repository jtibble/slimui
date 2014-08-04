var PromisesActions = function(){
	return {
        
        storeDeferred: function(deferred){
            this.deferred = deferred;
        },
        
        resolveDeferred: function(){
            this.deferred.resolve();
        }
    };
};