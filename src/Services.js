var framework = angular.module('Framework.Services', []);


/**
 * @name Router
 */
framework.provider('Router', function(){
	var strings = {
		notRouting: 'Router is not navigating to the same route',
		routingHome: 'Router is going to default screen '
	};
	
	var stateParameters = {};
	
	var logoutRoute, homeRoute;
	
	return {
		$get: ['$state', function( $state ){
			return {
				goTo: function(state, parameters){
					
					if( $state.current.name !== state || parameters){
						$state.go( state, parameters );
					} else {
						console.log( strings.notRouting );
					}
					
				},
				goToHome: function(){
					console.log( strings.routingHome + homeRoute);
					$state.go( homeRoute );
				},
                getStateParameters: function(){
                    return $state.params;   
                }
			};
		}],
		setHomeRoute: function( newHomeRoute ){
			homeRoute = newHomeRoute;
		}
	};
	
});


/**
 * @name ControllerCommunication
 */
framework.provider('ControllerCommunication', function(){
	
	var models = {};
	
	var observerCallbacks = {};
	
	return {
		$get: function(){
			return {
				registerCallback: function(channel, callback){
					if( !observerCallbacks[channel] ){
						observerCallbacks[channel] = [];
					}
					observerCallbacks[channel].push(callback);	
				},
				notifyObservers: function(channel){
					if( observerCallbacks[channel] && observerCallbacks[channel].length ){
						angular.forEach( observerCallbacks[channel], function(callback){
							callback();
						});
					}
				},
				get: function(channel){
					if( models[channel]!="undefined" ){
						return models[channel];	
					}
					
					console.log('ControllerCommunication Error: no channel \'' + channel + '\' existing to return data');
					return false;
				},
				set: function(channel, data){
					models[channel] = data;
					this.notifyObservers(channel);
				}
			};
		}		
	};
});


/**
 * @name FrameworkAJAX
 * @description 
 * Provides HTTP AJAX communication mechanism for developer-written controllers.
 * Expects 'request' to contain properties 'method': GET/POST/PUT, 'url', and 'data'
 * As of SlimUI v0.0.21, sendRequest() returns the $http promise to the caller
 */
framework.provider('FrameworkAJAX', function(){
	return {
		$get: ['$http', function( $http ){
			return {
				sendRequest: function(request, successCallback, errorCallback){
					
					if( !request.method || !request.url || !request.data ){
                        
						console.log('Error making AJAX request: missing method, url, or data.');
						return;
					}
					
					return $http( request ).success( successCallback ).error( errorCallback );
				}
			};
		}]		
	};
});


framework.provider('Promise', function(){
    return {
        $get: ['$q', function($q){
            return {
                promisesStorage: {},
                createDeferred: function(name){
                    this.promisesStorage[ name ] = $q.defer();
                    return true;
                },
                getPromise: function(name){
                    if( this.promisesStorage[ name ] ){
                        return this.promisesStorage[name].promise;
                    } else {
                        console.log('Can\'t return promise: deferred not created correctly');
                        return false;
                    }
                },
                resolveDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].resolve ){
                        this.promisesStorage[name].resolve( value );
                        return true;
                    } else {
                        console.log('Can\'t resolve: deferred not created correctly');
                        return false;
                    }
                },
                rejectDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].reject ){
                        this.promisesStorage[name].reject( value );
                        return true;
                    } else {
                        console.log('Can\'t reject: deferred not created correctly');
                        return false;
                    }
                }
            };
        }]
    };
});
