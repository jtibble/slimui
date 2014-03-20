/**
 *	@name LSApplication
 *	@class
 *	@global
 *	@desc LSApplication is responsible for initializing the framework
 */
var framework = angular.module('Framework', ['ui.router',
											 'ui.bootstrap',
									   		'Framework.Services']);



/**
* Validate config file integrity
*/
var validateConfigFileStructure = function( config ){
	
	var jsPathPropertyExistsHelper = function( propertyName ){
		if( config.properties.jsPaths[propertyName] ){
			return true;
		} else {
			return false;
		}
	};
	var templatePathPropertyExistsHelper = function( propertyName ){
		if( config.properties.templatePaths[propertyName] ){
			return true;
		} else {
			return false;
		}
	};
	var directiveIsValidHelper = function( name, directive ){
		var printError = function( error ){ console.log('Config.json Validation Error: View/Component \'' + name + '\' ' + error); };
		
		// view must exist
		if( !directive ){
			printError('can\'t be validated');
			return false;	
		}
		
		// directive must have template
		if( !directive.template ){
			printError('is missing its templatePath');
			return false;
		}
		
		// directive's template must be valid
		if( !templatePathPropertyExistsHelper( directive.template )){
			printError('template \'' + directive.template + '\' is invalid');
		}
		
		var additionalDirectivePropertiesList = [
			'model',
			'modelbuilder',
			'actions',
			'controller'
		];
		
		// Check every directive property for validity
		for( var i=0; i<additionalDirectivePropertiesList.length; i++){
			var directiveProperty = additionalDirectivePropertiesList[i];
			if( directive[ directiveProperty ] ){
				if( !jsPathPropertyExistsHelper( directive[directiveProperty] )){
					printError( directiveProperty + ' \'' + directive[directiveProperty] + '\' is invalid');
				}
			}
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
		for( var i in config.components ){
			if( !directiveIsValidHelper( i, config.components[i] )){
				configIsValid = false;
				console.log('\tComponent \'' + i + '\' is invalid with broken template or controller');
			}
		}
	}
	
	// Check services
	if( applicationConfig.services ){
		if( !(applicationConfig.services.existing && applicationConfig.services.generating) ){
				configIsValid = false;
				console.log('Config is missing either its existing or generating services');
		}
	}
	
	return configIsValid;	
};


/** 
 * Configure the framework
 */
framework.config( function($stateProvider, $urlRouterProvider, applicationConfig, $compileProvider, $provide, RouterProvider) {
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
		console.log('config file is invalid');	
	}
	
	
	var makeStateFromView = function(name, view, parentName){
		
		var makeURL = function(viewURL, viewParameters){
			
			var parametersString = '';
			for( var p in viewParameters ){
				var parameterName = viewParameters[p];
				//var parameterRequired = viewParameters[p].required;
				parametersString += '/{' + parameterName + '}';
			}
			
			// Allow a default route of '/' to work correctly
			if( viewURL == '/' ){
				viewURL = '';
			}
			
			return '/' + viewURL + parametersString;
		};
		
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
		}
		
		$stateProvider.state( state, routerParameters);
			
	};
	
	// Loop through all views to discover application states, sub-states, and parameters
	for( var i in applicationConfig.views ){
		var view = applicationConfig.views[i];
		
		if( view.url != undefined ){
			makeStateFromView(i, view);
		}
		
		for( var r in view.subroutes ){
			var subrouteName = view.subroutes[r];
			var subrouteView = applicationConfig.views[ subrouteName ];
			makeStateFromView(subrouteName, subrouteView, i);
		}
	}
	
	var defaultView = applicationConfig.views[ applicationConfig.defaultView ];
	
	var defaultURL = defaultView.url;
	
	RouterProvider.setHomeRoute( defaultURL );
	
	$urlRouterProvider.otherwise( function($injector, $location){
		console.log('Invalid location \'' + $location.$$url + '\', going to default route \'' + defaultURL + '\'');
		return defaultURL;
	});
	
});



/** 
 * Run the framework
 */
framework.run( function($q){
	
	// Create application-level directives
	var DirectiveFactory = function( componentName, paths ){
		var directiveName = componentName.toLowerCase();
		
		framework.directive( directiveName, function($http, $controller, $compile, $templateCache, $injector, $stateParams){
			function link( $scope, element, attributes ){
				
				var templateText, templateScope;
				
				var templatePromise = $q.defer();
				
				var modelPromise = $q.defer();
				var modelbuilderPromise = $q.defer();
				var actionsPromise = $q.defer();
				var controllerPromise = $q.defer();
				
				// Attempt to load the (required) template
				require( ['text!' + paths.template], function( template ){
					templateText = template;
					templatePromise.resolve();
				});
				
				if( paths.model ){
					require( [paths.model], function(){
						modelPromise.resolve();
					});
				} else {
					modelPromise.resolve();
				}
				
				if( paths.modelbuilder ){ 
					require( [paths.modelbuilder], function(){
						modelbuilderPromise.resolve();
					});
				} else { 
					modelbuilderPromise.resolve(); 
				}
				
				if( paths.actions ){ 
					require( [paths.actions], function(){
						actionsPromise.resolve();
					});
				} else {
					actionsPromise.resolve();
				}
				
				if( paths.controller ){ 
					require( [paths.controller], function(){
						controllerPromise.resolve();
					});
				} else {
					controllerPromise.resolve();
				}
				
				// Wait for all files to be loaded into global window scope
				$q.all([ templatePromise.promise,
						 modelbuilderPromise.promise,
						 modelPromise.promise,
						 actionsPromise.promise,
						 controllerPromise.promise ]).then( function() {
					
					// Create new scope for view
					templateScope = $scope.$new();
					
					var modelName = componentName + 'Model';
					var modelbuilderName = componentName + 'Modelbuilder';
					var actionsName = componentName + 'Actions';
					var controllerName = componentName + 'Controller';
					var jsLoadingError = false;
					
					// Check that the files loaded correctly
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
							    injectionName == 'StateParameters' ){
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
						
						var injectedController = $controller( window[controllerName], controllerInjections );
						
					} catch(e){
						console.log('Error: Could not inject dependencies into controller. Exception: \n\t' + e.message);	
					}
					
					// Render template, and bind/compile controller to it
					element.html( templateText );
					element.children().data('$ngControllerController', injectedController);
					$compile( element.contents() )( templateScope );
				});
			};
			
			return { link: link	};
		});
	};
	
	var TemplateDirectiveFactory = function( templatePath ){
		return function(){
			return {
				templateUrl: templatePath	
			};
		}
	};
	
	var MakeDirectivesHelper = function( directiveName, directiveObject ){
		var paths = {
			template: applicationConfig.properties.templatePaths[ directiveObject.template ],
			model: applicationConfig.properties.jsPaths[ directiveObject.model ],
			modelbuilder: applicationConfig.properties.jsPaths[ directiveObject.modelbuilder ],
			actions: applicationConfig.properties.jsPaths[ directiveObject.actions ],
			controller: applicationConfig.properties.jsPaths[ directiveObject.controller ]
		};
		
		if( !paths.template ){
			console.log('Component/View \'' + directiveName + '\' is malformed:\n\tThe (required) template is missing or misconfigured in config.json. (Aborting)');
			return;
		}
		
		if( paths.model || paths.modelbuilder || paths.actions || paths.controller ){
			// generate a complex directive
			DirectiveFactory( directiveName, paths );
		} else {
			// generate simple directive (just template)
			directiveName = directiveName.toLowerCase();
			framework.directive( directiveName, TemplateDirectiveFactory( paths.template ) );
		}
		
	};
	
	// Generate directives for all components
	for( var i in this.applicationConfig.components ){
		var component = applicationConfig.components[i];
		MakeDirectivesHelper( i, component );
	}
	
	// Generate directives for all views
	for( var i in this.applicationConfig.views ){
		var screen = applicationConfig.views[i];
		MakeDirectivesHelper( i, screen );
	}
	
	
	// Create services to inject during component-initialization
	window['servicesToInject'] = {};
	
	// Create application-defined services from existing files
	if( this.applicationConfig.services && this.applicationConfig.services.existing ){
		
		// Create JavaScript closure and factory
		function ServiceFromFileFactory( serviceName, servicePath ){
			require( [servicePath], function( newFunction ){
				window.servicesToInject[ serviceName ] = function(){
					return {
						$get: window[serviceName]
					};
				};
					
				this.postConfigProvider.provider( serviceName, window.servicesToInject[serviceName] );
			});
		};
				
		var servicesList = _.keys( this.applicationConfig.services.existing );
		
		for( var i in servicesList ){
			var serviceName = servicesList[i];
			
			//var servicePathProperty = applicationConfig.services.existing[ serviceName ]
			//var servicePath = applicationConfig.properties.servicesPaths[ servicePathProperty ];

			var servicePath = applicationConfig.services.existing[ serviceName ];
			
			
			ServiceFromFileFactory( serviceName, servicePath );
		}
		
	} else {
		console.log('Framework: No services to generate from existing files');	
	}
	
	// Create application-defined services from config file	
	if( this.applicationConfig.services && this.applicationConfig.services.generating ){
		
		// Create JavaScript closure and factory
		function ServiceFromConfigFactory( data ){
			return	function(){
				return {
					$get: function(){
						return data;
					}
				};
			};
		};
		
		var servicesList = _.keys( this.applicationConfig.services.generating );
		
		for( var i in servicesList ){
			var serviceName = servicesList[i];
			var serviceData = applicationConfig.services.generating[ serviceName ];
			
			window.servicesToInject[ serviceName ] = ServiceFromConfigFactory(serviceData);
			
			this.postConfigProvider.provider( serviceName, window.servicesToInject[serviceName] );
		}
		
	} else {
		console.log('Framework: No services to generate from config file');	
	}
	
});
