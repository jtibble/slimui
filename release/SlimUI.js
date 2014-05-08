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
							console.log('Could not initialize application, configuration could not be loaded.');
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
											 'ngSanitize',
									   		'Framework.Services']);

/**
* Validate config file integrity
*/
var validateConfigFileStructure = function( config ){
	
	var directiveIsValidHelper = function( name, directive ){
		var printError = function( error ){ 
			console.log('Config.json Validation Error: View/Component \'' + name + '\' ' + error); 
		};
		
		// view must exist
		if( !directive ){
			printError('can\'t be validated');
			return false;	
		}
		
		// Check directive for validity
		// Valid properties combinations: (template included by default, does not need to be specified)
		//  [nothing]
		//	controller
		//	controller + actions
		//	controller + modelbuilder + model
		//  controller + actions + modelbuilder + model
		
		if( directive.model && !directive.modelbuilder ){
			printError( ' is invalid: if includes model, must also include modelbuilder');
			return false;
		}
		if( directive.modelbuilder && !directive.model ){
			printError( ' is invalid: if includes modelbuilder, must also include model');
			return false;
		}
		if( directive.actions && !directive.controller ){
			printError( ' is invalid: if includes actions, must also include controller');
			return false;
		}
		if( directive.modelbuilder && !directive.controller ){
			printError( ' is invalid: if includes modelbuilder, must also include controller');
			return false;
		}
		
		// Every directive must have a path so the framework can load its files
		if( !directive.path ){
			printError( ' is invalid: missing \'path\'');
			return false;
		}
		
		return true;
	};
	
	var configIsValid = true;
	
	// Error-check the configuration file
	// Check default view
	if( config.defaultView && config.views[ config.defaultView ] ){
		if( !directiveIsValidHelper( config.defaultView, config.views[ config.defaultView ] ) ){
			console.log('Config defaultView exists, but points to an invalid view');
			configIsValid = false;
		}
	}

	// Check views
	if( config.views ){
		for( var i in config.views ){
			var view = config.views[i];
			if( !directiveIsValidHelper( i, view )){
				console.log('\tView \'' + i + '\' is invalid with broken template or controller');
				configIsValid = false;
			}
			if( view.regions ){
				if( !view.url ){
					console.log('View \'' + i + '\' is invalid: cannot specify regions without \'url\' property');	
					configIsValid = false;
				}
			}
		}
	}

	// Check components
	if( config.components ){
		for( var j in config.components ){
			if( !directiveIsValidHelper( j, config.components[j] )){
				configIsValid = false;
				console.log('\tComponent \'' + j + '\' is invalid with broken template or controller');
			}
		}
	}
	
	// Check services				
	for( var k in this.applicationConfig.services ){
		var servicePath = this.applicationConfig.services[k].path;
		if( !this.applicationConfig.properties || 
		    !this.applicationConfig.properties.paths || 
		    !this.applicationConfig.properties.paths[ servicePath ] ){
			configIsValid = false;
			console.log('Service \'' + k + '\' is invalid: missing path \'' + servicePath + '\'');
		}
	}
	
	return configIsValid;	
};


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
	

	if( !validateConfigFileStructure( applicationConfig )){
		console.log('SlimUI ERROR: config.json file is invalid');	
	}
	
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
				console.log('Error: Can\'t create router state from view name and/or parent view name');
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
		if( view.url !== 'undefined' ){
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
		console.log('Invalid location \'' + $location.$$url + '\', going to default route \'' + defaultURL + '\'');
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
		
		framework.directive( directiveName, ['$http', 
											 '$controller', 
											 '$compile', 
											 '$templateCache', 
											 '$injector', 
											 '$stateParams', function($http, $controller, $compile, $templateCache, $injector, $stateParams){
			function link( $scope, element, attributes ){
				
				// Create new scope for view
				var templateScope = $scope.$new();
				
				var templateName = componentName + 'Template';
				var modelName = componentName + 'Model';
				var modelbuilderName = componentName + 'Modelbuilder';
				var actionsName = componentName + 'Actions';
				var controllerName = componentName + 'Controller';
				var jsLoadingError = false;
				
				// Check that the files loaded correctly
				if( (paths.template && !window[templateName])){
					console.log('Couldn\'t correctly load template named \'' + templateName + '\'.');
					jsLoadingError = true;
				}
				if( (paths.model && !window[modelName])){
					console.log('Couldn\'t correctly load model named \'' + modelName + '\'.');
					jsLoadingError = true;
				}
				if( (paths.model && !window[modelName])){
					console.log('Couldn\'t correctly load modelbuilder named \'' + modelbuilderName + '\'.');
					jsLoadingError = true;	
				}
				if( (paths.model && !window[modelName])){
					console.log('Couldn\'t correctly load actions named \'' + actionsName + '\'.');
					jsLoadingError = true;	
				}
				if( (paths.model && !window[modelName])){
					console.log('Couldn\'t correctly load controller named \'' + controllerName + '\'.');
					jsLoadingError = true;
				}
				
				if( jsLoadingError ){
					console.log('Check spelling in file and config.json. Aborting creation of \'' + componentName + '\'');
					return;
				}
				
				// Helper to validate that all dependencies are ready for injection
				var checkInjections = function( globalFunctionName ){
					var injectionsList;
					try{
						injectionsList = $injector.annotate( window[globalFunctionName]);
					} catch(e){
						console.log('Error: Failed to find dependency injection information for \''+globalFunctionName+'\'.\n\tPlease check in the file that the function name is spelled correctly.');
					}
					var neededInjections = [];
					
					for( var i in injectionsList ){
						var injectionName = injectionsList[i];
						
						// Injections provided by this framework should not be counted
						if( injectionName == 'Context' ||
							injectionName == 'Actions' ||
							injectionName == 'Model' ||
							injectionName == 'Modelbuilder' ||
							injectionName == 'StateParameters' ||
							injectionName == 'SlimUIAttribute' ){
							continue;   
					   }
						
						try{
							$injector.get( injectionName );
						}catch(exception){
							neededInjections.push( injectionName );
						}
					}
					
					if( neededInjections.length ){
						console.log('Error: Not all of ' + globalFunctionName + '\'s dependencies have been loaded correctly.\n\tMissing dependencies: ' + neededInjections.toString() + '\nIf these are newly-added dependency injections, have they been added to config.json and named correctly? Additionally, check that the spelling in ' + globalFunctionName + ' matches the function name in the dependency\'s JavaScript file.');
					}
				};

				// Check all injections to make sure they're ready
				if( paths.modelbuilder ){ checkInjections( modelbuilderName ); }
				if( paths.actions ){ checkInjections( actionsName ); }
				if( paths.controller ){ checkInjections( controllerName ); }
				
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
						console.log('Error: Could not inject model into modelbuilder. Exception: \n\t' + e.message);
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
						console.log('Error: Could not inject context or modelbuilder into actions. Exception: \n\t' + e.message);
					}
				}
				
				// Inject context, state parameters, modelbuilder, and actions into controller
				try{
					
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
					
					// Inject directive's attribute if provided
					if( element[0].attributes && element[0].attributes['slimui-attribute'] ){
						controllerInjections.SlimUIAttribute = element[0].attributes['slimui-attribute'].value;
					}
					
					injectedController = $controller( window[controllerName], controllerInjections );
					
				} catch(e){
					console.log('Error: Could not inject dependencies into controller. Exception: \n\t' + e.message);	
				}
				
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
	
	// Helper to retrieve properly-formatted paths from the config.json file
	var ConfigPropertyPathFinder = function( configFileItem ){
		if( !configFileItem ){
			console.log('Could not fetch path for undefined config file item');
			return;
		}
		if( !configFileItem.path ){
			console.log('Could not fetch path for config file item with missing \'path\' property');
			return;
		}
		
		var rootPathName = configFileItem.rootPath ? configFileItem.rootPath : 'default';
		var rootPath = applicationConfig.properties.rootPaths[ rootPathName ];
		
		var pathName = configFileItem.path;
		var path = applicationConfig.properties.paths[ pathName ];
		
		return rootPath + path;
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
	if( this.applicationConfig.services ){
		
		var serviceWrapperFunction = function(serviceName){
			return {
				$get: window[serviceName]
			};
		};
		
		for( var serviceName in this.applicationConfig.services ){
			if( !window[serviceName] ){
				console.log('Error: \'' + serviceName + '\' service was specified in config.json but has not been loaded. Check that it exists in your compiled application.');
				continue;
			}
			
			window.servicesToInject[ serviceName ] = serviceWrapperFunction(serviceName);
		
			this.postConfigProvider.provider( serviceName, window.servicesToInject[serviceName] );		
		}
		
	} else {
		console.log('SlimUI: no services specified in config.json');	
	}
	
}]);

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
		$get: ['$state', function( $state ){
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
		}]		
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
						console.log('Error making AJAX request: missing method, url, or data.');
						return;
					}
					
					$http( request ).success( successCallback ).error( errorCallback );
				}
			};
		}]		
	};
});