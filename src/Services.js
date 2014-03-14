var framework = angular.module('Framework.Services', []);


/**
 * @name Router
 */
framework.provider('Router', function(){
	
	var strings = {
		routingFrom: 'Navigating from ',
		routingTo: ' to ',
		notRouting: 'Router is not navigating to the same route',
		routingHome: 'Router is going to default screen '
	};
	
	var stateParameters = {};
	
	var logoutRoute, homeRoute;
	
	return {
		$get: function( $state ){
			return {
				goTo: function(state, parameters){
					
					if( $state.current.name !== state ){
						//console.log( strings.routingFrom + $state.current.name + strings.routingTo + state);
						$state.go( state, { parameters: parameters} );
					} else {
						console.log( strings.notRouting );	
					}
					
				},
				goToHome: function(){
					console.log( strings.routingHome + homeRoute);
					$state.go( homeRoute );
				}
			};
		},
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
		$get: function( $state ){
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
					if( models[channel] ){
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
 */
framework.provider('FrameworkAJAX', function(){
	return {
		$get: function( $http ){
			return {
				sendRequest: function(request, successCallback, errorCallback){
					
					if( !request.method || !request.url || !request.data ){
						console.log('Error making AJAX request: missing method, url, or data.');
						return;
					}
					
					$http( request ).success( successCallback ).error( errorCallback );
				}
			};
		}		
	};
});
