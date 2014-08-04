var PromisesModelbuilder = function(Model){
	return function(options){
        if( options && options.promiseResolved ){   
            Model.text = 'Promise Resolved!';
        }
		return Model;
	};
};