var PromisesActions = function( Promise ){
	return {        
        resolveDeferred: function(){
            Promise.resolveDeferred( 'Example', 'Promise Resolved');
        }
    };
};