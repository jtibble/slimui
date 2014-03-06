
var framework = angular.module('Framework.Services', []);


/**
 * @name LSApplication.LSRouter
 * @requires $state
 * @description 
 * LSRouter is a LeasingSource-branded wrapper around the Angular-UI-Router from https://github.com/angular-ui/ui-router.
 * It provides a configurable message and one method, 'go' which writes a message to the log before activating a new route.
 *
 * Inject it into your controller as 'LSRouter', and call it with LSRouter.go( [route] ); Be sure to pass the route with a 
 * preceding slash like '/DMC'.
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
				}, 
				goToLogOff: function(){
					window.location.href = window.location.href.replace('app','login').replace(/#.*/, '')
				},
				storeStateParameters: function( params ){
					stateParameters = params;	
				},
				getStateParameters: function(){
					return stateParameters;	
				}
			};
		},
		setHomeAndLogoutRoutes: function( newHomeRoute ){
			homeRoute = newHomeRoute;
		}
	};
	
});


/**
 * @name LSApplication.ControllerCommunication
 * @description 
 * Provides communication mechanism between two or more controllers listening to a channel. 
 * Inject into controller, and then register callback.
 * Get and Set the model, and your changes will go out to all other controllers listening on that channel.
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
				set: function(channel, newModel){
					models[channel] = newModel;
					this.notifyObservers(channel);
				}
			};
		}		
	};
});


/**
 * @name LSApplication.PostRequest
 * @description 
 * Provides HTTP POST communication mechanism for developer-written controllers.
 */
framework.provider('FrameworkPOST', function(){
	return {
		$get: function( $http ){
			return {
				sendRequest: function(url, data, successCallback, errorCallback){
					var config = {
						method: 'POST',
						url: url,
						data: data
					};
					$http( config ).success( successCallback ).error( errorCallback );
				}
			};
		}		
	};
});


/**
* @name Framework.Session
* @description
* Will provide mechanism for getting information about what user is signed in.
*/
framework.provider('Session', function(){
	return {
		$get: function( Router ){
			return {
				logOff: function(){
					console.log('Session Ended');
					Router.goToLogOff();
				}
			};
		}		
	};
});
