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
		var printError = function( error ){ console.log('View/Component \'' + name + '\' ' + error); };
		
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
		
		// If directive includes controller, check it
		if( directive.controller ){
			if( !jsPathPropertyExistsHelper( directive.controller )){
				printError('controller \'' + directive.controller + '\' is invalid');
				return false;
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
	
	
	
	// Function used to create the settings for each route, including lazy-load of controllers
	var createRouteSettings = function( route, screenComponentName ){
		//var componentNameAttribute = screenComponentName.split(/(?=[A-Z])/).join('-');
		//var parameterString = '{parameterOne}/{parameter2}';
		
		if( route == '/' ){
			return {
				url: '/',
				template: '<div ' + screenComponentName + '></div>'
			}
		}
		
		return {
			url: '/' + route,
			template: '<div ' + screenComponentName + '></div>'
		};
	};
	
	// Loop through all views to discover application states and sub-states
	for( var i in applicationConfig.views ){
		var view = applicationConfig.views[i];
		
		if( view.url != undefined ){
			var routeSettings = createRouteSettings(view.url, i);
			$stateProvider.state( view.url, routeSettings );
		}
		
		if( view.regions ){
			for( var r in view.regions ){
				var regionName = view.regions[r];
				var regionView = applicationConfig.views[ regionName ];
				var route = view.url + '.' + regionName;
				
				$stateProvider.state( route, {
					url: '/' + regionName + (regionView.parameters ? '/{parameters}' : ''),
					template: '<div ' + regionName + '></div>'
				});
			}
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
	
	// Create application-level components (directives)
	var DirectiveFactory = function( componentName, templatePath, controllerPath ) {
		var directiveName = componentName.toLowerCase();
		
		framework.directive( directiveName, function($http, $controller, $compile, $templateCache, $injector, $stateParams){
			function link( $scope, element, attributes ){
				var templateText, controllerText, templateScope, controllerTemplate;
				var templatePromise = $q.defer();
				var controllerPromise = $q.defer();
				
				require( ['text!' + templatePath], function( template ){
					templateText = template;
					templatePromise.resolve();
				});
				
				require( [controllerPath], function(){
					controllerPromise.resolve();
				});
				
				$q.all([ templatePromise.promise, 
						 controllerPromise.promise ]).then( function() {
					templateScope = $scope.$new();
					
					if( !window[componentName] ){
						var error = 'Can\'t create directive \'' + componentName + '\':\n\tCheck that the expected controller name matches the name in the provided file';
						console.log(error);
						return;
					}

					var injectionsList = $injector.annotate( window[componentName]);
					var neededInjections = [];
					
					for( var i in injectionsList ){
						var injectionName = injectionsList[i];
						try{
							$injector.get( injectionName );
						}catch(exception){
							// 'Context' is injected manually, below, so disregard injector complaint
							if( injectionName != 'Context' ){
								neededInjections.push( injectionName );
							}
						}
					}
					
					if( neededInjections.length > 1){
						console.log('Warning: Not all injections have been provided.\n\tHave all new services been declared in config.json?');
						console.log('Missing injections:\n\t' + neededInjections.toString());
					}
					
					try{
						controllerTemplate = $controller( window[componentName] , { Context: templateScope, StateParameters: $stateParams.parameters } );
					} catch(e){
						console.log('Error injecting dependencies into controller:\n\tPlease check the controller\'s dependencies for typos');	
					}
					element.html( templateText );
					element.children().data('$ngControllerController', controllerTemplate);
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
		var directiveJSPath = applicationConfig.properties.jsPaths[ directiveObject.controller ];
		var directiveTemplatePath = applicationConfig.properties.templatePaths[ directiveObject.template ];
				
		if( directiveJSPath && directiveTemplatePath ){		
			DirectiveFactory(directiveName, directiveTemplatePath, directiveJSPath);	
		} else if( directiveTemplatePath ){	
			directiveName = directiveName.toLowerCase();
			framework.directive( directiveName, TemplateDirectiveFactory( directiveTemplatePath ) );
		} else {
			console.log('Component/View \'' + directiveName + '\' is malformed:\n\t The template \'' + directiveObject.template + '\' is misconfigured in config.json');
		}
	};
	
	
	
	for( var i in this.applicationConfig.components ){
		var component = applicationConfig.components[i];
		MakeDirectivesHelper( i, component );
	}
	
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
