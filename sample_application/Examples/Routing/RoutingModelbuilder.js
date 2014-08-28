var RoutingModelbuilder = function(Model){
    return function(options){
        if( options && options.parameters ){
            Model.parametersString = JSON.stringify( options.parameters );
        }
        return Model;
    }
};