// Bootstrapping of application with config file comes from 'philippd' courtesy of 
// http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data

// define the module of the bootstrap app
var bootstrapModule = angular.module('bootstrapModule', []);

// the bootstrapper service loads the config and bootstraps the specified app
bootstrapModule.provider('bootstrapper', function () {
	return {
		$get: ['$http', '$q', function($http, $q){
			return {
				bootstrap: function (appName) {
					var deferred = $q.defer();
					
					$http.get('config.json')
						.success(function (config) {
							// set all returned values as constants on the app...
							var myApp = angular.module(appName);
							angular.forEach(config, function(value, key){
								myApp.constant(key, value);
							});
							
							// ...and bootstrap the actual app.
							angular.bootstrap(document, [appName]);
							deferred.resolve();
						})
						.error(function () {
							deferred.reject();
						});
					
					return deferred.promise;
				}
			};
		}]
	};
});

// create a div which is used as the root of the bootstrap app
var appContainer = document.createElement('div');

// in run() function you can now use the bootstrapper service and shutdown the bootstrapping app after initialization of your actual app.
// 'bootstrapper' is dependency-injection by-name here to avoid problems when compiling/minifying/uglifying as part of a build process
bootstrapModule.run(['bootstrapper', function (bootstrapper) {

	bootstrapper.bootstrap('Framework').then(function () {
		// removing the container will destroy the bootstrap app
		appContainer.remove();
	});

}]);

// make sure the DOM is fully loaded before bootstrapping.
angular.element(document).ready(function() {
	angular.bootstrap(appContainer, ['bootstrapModule']);
});

var framework = angular.module('Framework', ['ui.router',
											 'ui.bootstrap',
                                             'ngTouch',
									   		'Framework.Services']);

/**
* Validate config file integrity
*/

/** 
 * Configure the framework
 */
framework.config( ['$stateProvider', 
				   '$urlRouterProvider', 
				   'applicationConfig', 
				   '$compileProvider', 
				   '$provide', 
				   'RouterProvider', function($stateProvider, $urlRouterProvider, applicationConfig, $compileProvider, $provide, RouterProvider) {
	this.applicationConfig = applicationConfig;
	
	// Storing $provide allows us to create providers programatically in framework.run()
	this.postConfigProvider = $provide;
	
	// Writing-over directive with $compileProvider.directive allows us to programatically create directives in framework.run()
	framework._directive = framework.directive;
	framework.directive = function( name, factory ){
		$compileProvider.directive( name, factory );
		return this;
	};
	
	
	// Given a view, its name, and (optional) parent, create all the routes for it
	var makeStateFromView = function(name, view, parentName){
		
		// Helper function to create the URL template for a view and (optional) parameters
		var makeURL = function(viewURL, viewParameters){
			
			var parametersString = '';
			for( var p in viewParameters ){
				var parameterName = viewParameters[p];
				parametersString += '/{' + parameterName + '}';
			}
			
			// Allow a default route of '/' to work correctly
			if( viewURL == '/' ){
				viewURL = '';
			}
			
			return '/' + viewURL + parametersString;
		};
		
		// Helper function to create a router state from a view name and (optional) parent view name
		var makeRouterState = function(viewName, parentViewName){
			if( viewName && parentViewName ){
				return parentViewName + '.' + viewName;
			} else if( viewName ){
				return viewName;	
			} else {
				return;
			}
		};
		
		var url;
		if( view.url ){
			url = makeURL(view.url, view.parameters);
		} else {
			url = makeURL(name, view.parameters);
		}
		
		var state = makeRouterState(name, parentName);
		var routerParameters = {
			url: url, 
			template: '<div ' + name + '></div>'
		};
		
		$stateProvider.state( state, routerParameters);
		
		// Loop through all child-views and recurse
		for( var r in view.subroutes ){
			var subrouteName = view.subroutes[r];
			var subrouteView = applicationConfig.views[ subrouteName ];
			
			makeStateFromView(subrouteName, subrouteView, parentName ? (parentName + '.' + name) : name);
		}
	};
	
	// Loop through all views to discover application states, sub-states, and parameters
	for( var i in applicationConfig.views ){
		var view = applicationConfig.views[i];
		
		// If the view provides a url (meaning it's a root-level view, not a child-view, create a state for it
		if( view.url !== undefined ){
			makeStateFromView(i, view);
		}
	}
	
	var defaultView = applicationConfig.views[ applicationConfig.defaultView ];
	var defaultURL = defaultView.url;
	
	//Add parameters to the defaultURL if the defaultView requires parameters
	if( defaultView.parameters ){
		for( var j=0; j<defaultView.parameters.length; j++){
			defaultURL+='/';
		}
	}
	
	RouterProvider.setHomeRoute( defaultURL );
	
	$urlRouterProvider.otherwise( function($injector, $location){
		return defaultURL;
	});
	
}]);



/** 
 * Run the framework
 */
framework.run( ['$q', function($q){
	
	// Create application-level directives from a set of files including the following:
	// template (always required, no exceptions)
	// controller
	// modelbuilder (requires model to be injected and controller to be injected-into. optionally injected into actions)
	// model (requires modelbuilder to be injected-into)
	// actions (requires controller to be injected-into)	
	var DirectiveFactory = function( componentName, paths ){
		var directiveName = componentName.toLowerCase();
		
		framework.directive( directiveName, ['$http', '$controller', '$compile', '$templateCache', '$injector', '$q', '$stateParams', function($http, $controller, $compile, $templateCache, $injector, $q, $stateParams){
            
			function link( $scope, element, attributes ){
				
				// Create new scope for view
				var templateScope = $scope.$new();
				
				var templateName = componentName + 'Template';
				var modelName = componentName + 'Model';
				var modelbuilderName = componentName + 'Modelbuilder';
				var actionsName = componentName + 'Actions';
				var controllerName = componentName + 'Controller';

				
				var injectedModelbuilder;
				var injectedActions;
				var injectedController;
				
				// Inject model into modelbuilder (if provided)
				if( window[modelName] ){
					try{
						var additionalModelbuilderInjections = {
							Model: window[modelName]()
						};
						injectedModelbuilder = $controller( window[modelbuilderName], additionalModelbuilderInjections );
					} catch(e){
                        
					}
				}
				
				// Inject context and modelbuilder into actions (if provided)
				if( window[actionsName]){
					try{
						var actionsInjections = {
							Context: templateScope
						};
						
						//Inject modelbinder if provided
						if( injectedModelbuilder ){
							actionsInjections.Modelbuilder = injectedModelbuilder;
						}
						
						injectedActions = $controller( window[actionsName] , actionsInjections);	
					} catch(e){
					}
				}
				
				// Inject context, state parameters, modelbuilder, and actions into controller
					
					var controllerInjections = {
						Context: templateScope,
						StateParameters: $stateParams
					};
					
					// Inject modelbinder if provided
					if( injectedModelbuilder ){
						controllerInjections.Modelbuilder = injectedModelbuilder;
					}
					
					// Inject actions if provided
					if( injectedActions ){
						controllerInjections.Actions = injectedActions;	
					}
					
					injectedController = $controller( window[controllerName], controllerInjections );
					
				
				// Render template, and bind/compile controller to it
				element.html( window[templateName] );
				element.children().data('$ngControllerController', injectedController);
				$compile( element.contents() )( templateScope );

			}
			
			return { 
				link: link,	
				scope: {
					attributeParameter: '@'
				}
			};
		}]);
	};
	
	// Helper to return a simple directive that only consists of an HTML template
	var TemplateDirectiveFactory = function( templateText ){
		return function(){
			return {
				template: templateText	
			};
		};
	};
	
	// Helper to create directives from an entry in the config.json file
	var MakeDirectivesHelper = function( directiveName, directiveObject ){
		
		if( directiveObject.model || directiveObject.modelbuilder || directiveObject.actions || directiveObject.controller ){
			// generate a complex directive
			DirectiveFactory( directiveName, directiveObject );
		} else {
			// generate simple directive (just template)
			templateName = directiveName + 'Template';
			directiveName = directiveName.toLowerCase();
			framework.directive( directiveName, TemplateDirectiveFactory( window[templateName] ) );
		}
		
	};
	
	// Generate directives for all components
	for( var i in this.applicationConfig.components ){
		var component = applicationConfig.components[i];
		MakeDirectivesHelper( i, component );
	}
	
	// Generate directives for all views
	for( var j in this.applicationConfig.views ){
		var screen = applicationConfig.views[j];
		MakeDirectivesHelper( j, screen );
	}
	
	
	// Create services to inject during component-initialization
	window.servicesToInject = {};
	
	// Create application-defined services from existing files
    var serviceWrapperFunction = function(serviceName){
        return {
            $get: window[serviceName]
        };
    };

    for( var serviceName in this.applicationConfig.services ){

        if( !window[serviceName] ){
            continue;
        }

        window.servicesToInject[ serviceName ] = serviceWrapperFunction(serviceName);

        this.postConfigProvider.provider( serviceName, window.servicesToInject[serviceName] );		
    }
	
	
}]);

var framework = angular.module('Framework.Services', []);


/**
 * @name Router
 */
framework.provider('Router', function(){
	
	var stateParameters = {};
	
	var logoutRoute, homeRoute;
	
	return {
		$get: ['$state', function( $state ){
			return {
				goTo: function(state, parameters){
					
					if( $state.current.name !== state || parameters){
						$state.go( state, parameters );
					} else {
					}
					
				},
				goToHome: function(){
					$state.go( homeRoute );
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
		$get: ['$http', function( $http ){
			return {
				sendRequest: function(request, successCallback, errorCallback){
					
					if( !request.method || !request.url || !request.data ){
                        
						return;
					}
					
					$http( request ).success( successCallback ).error( errorCallback );
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
                        return false;
                    }
                },
                resolveDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].resolve ){
                        this.promisesStorage[name].resolve( value );
                        return true;
                    } else {
                        return false;
                    }
                },
                rejectDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].reject ){
                        this.promisesStorage[name].reject( value );
                        return true;
                    } else {
                        return false;
                    }
                }
            };
        }]
    };
});
