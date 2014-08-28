var PromisesModelbuilder = function(Model){
	return function(options){
        if( options && options.promiseResolved ){   
            Model.text = 'Promise Resolved!';
        }
        if( options && options.timeout ){
            Model.text = 'Promise resolving in ' + (options.timeout/1000).toFixed(2) + ' seconds';
        }
		return Model;
	};
};