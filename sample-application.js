var DocumentationController = function(Context, Modelbuilder){
	Context.Model = Modelbuilder();
};
var DocumentationModel = function(){
	
	// EscapedJS generated with JSONLint.com and freeformatter.com/javascript-escape.html
	
	var escapedJS = {
		emptyConfigJSON: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"\",\r\n        \"properties\": {\r\n            \"rootPaths\": {\r\n                \"default\": \"\"\r\n            },\r\n            \"paths\": {\r\n            }\r\n        },\r\n        \"components\": {\r\n        },\r\n        \"views\": {\r\n        },\r\n        \"services\": {\r\n        }\r\n    }\r\n}',
		configDefaultViewExample: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"LandingPage\",\r\n        \"views\": {\r\n            \"LandingPage\": {\r\n                \"url\": \"\/\",\r\n                \"path\": \"LandingPage\"\r\n            }\r\n        }\r\n    }\r\n}',
		configPropertiesExample: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"rootPaths\": {\r\n                \"default\": \"sample_application\/\"\r\n            },\r\n            \"paths\": {\r\n                \"ReleaseNotes\": \"ReleaseNotes\/\",\r\n            }\r\n        }\r\n    }\r\n}',
		configComponentsExample: '{\r\n    \"applicationConfig\": {\r\n        \"components\": {\r\n            \"Header\": {\r\n                \"path\": \"Header\"\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsSimpleExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"Documentation\": {\r\n                \"url\": \"Documentation\",\r\n                \"path\": \"Documentation\",\r\n                \"controller\": true,\r\n                \"model\": true,\r\n                \"modelbuilder\": true\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsNestedExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"ParameterPassing\": {\r\n                \"url\": \"ParameterPassing\",\r\n                \"path\": \"ParameterPassing\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"parameterExampleId\",\r\n                    \"parameterExampleId2\"\r\n                ],\r\n                \"subroutes\": [\r\n                    \"ParameterPassingSubroute\"\r\n                ]\r\n            },\r\n            \"ParameterPassingSubroute\": {\r\n                \"path\": \"ParameterPassingSubroute\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"subrouteParameterExampleId\",\r\n                    \"subrouteParameterExampleId2\"\r\n                ]\r\n            }\r\n        }\r\n    }\r\n}',
		configServicesExample: '{\r\n    \"applicationConfig\": {\r\n        \"services\": {\r\n            \"existing\": {\r\n                \"ExampleService\": \"path\/to\/ExistingService.js\"\r\n            },\r\n            \"generating\": {\r\n                \"ApplicationMessages\": {\r\n                    \"Header\": {\r\n                        \"primaryText\": \"Header Primary Text\",\r\n                        \"secondaryText\": \"header secondary text\"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}',
		appContentStaticExample: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"LandingPage\",\r\n        \"properties\": {\r\n            \"path\": \"sample_application\/\",\r\n            \"paths\": {\r\n                \"LandingPage\": \"LandingPage\/\"\r\n            }\r\n        },\r\n        \"views\": {\r\n            \"LandingPage\": {\r\n                \"url\": \"\/\",\r\n                \"path\": \"LandingPage\"\r\n            },\r\n        }\r\n    }\r\n}',
		appContentDynamicExampleFull: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"path\": \"sample_application\/\",\r\n            \"paths\": {\r\n                \"ParameterPassing\": \"Examples\/ParameterPassing\/\",\r\n                \"ParameterPassingSubroute\": \"Examples\/ParameterPassing\/\"\r\n            }\r\n        },\r\n        \"views\": {\r\n            \"ParameterPassing\": {\r\n                \"url\": \"ParameterPassing\",\r\n                \"path\": \"ParameterPassing\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"parameterExampleId\",\r\n                    \"parameterExampleId2\"\r\n                ],\r\n                \"subroutes\": [\r\n                    \"ParameterPassingSubroute\"\r\n                ]\r\n            },\r\n            \"ParameterPassingSubroute\": {\r\n                \"path\": \"ParameterPassingSubroute\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"subrouteParameterExampleId\",\r\n                    \"subrouteParameterExampleId2\"\r\n                ]\r\n            }\r\n        }\r\n    }\r\n}',
		componentExample: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"rootPaths\": {\r\n                \"default\": \"sample_application\/\"\r\n            },\r\n            \"paths\": {\r\n                \"ControllerCommunicationListener\": \"Examples\/ControllerCommunications\/ListenerComponent\/\"\r\n            }\r\n        },\r\n        \"components\": {\r\n            \"ControllerCommunicationListener\": {\r\n                \"path\": \"ControllerCommunicationListener\",\r\n                \"controller\": true,\r\n                \"modelbuilder\": true,\r\n                \"actions\": true,\r\n                \"model\": true\r\n            }\r\n        }\r\n    }\r\n}',
		servicesExample: 'var FibonacciService = function( ){\r\n\treturn {\r\n\t\ta: 1,\r\n\t\tb: 1,\r\n\t\tgetNextFibonacciNumber: function(){\r\n\t\t\tvar value = this.a + this.b;\r\n\t\t\tthis.a = this.b; \r\n\t\t\tthis.b = value;\r\n\t\t\treturn value;\t\r\n\t\t}\r\n\t};\r\n};\r\n',
		serviceUsageExample: 'var ServicesActions = function(Modelbuilder, FibonacciService){\r\n\treturn {\r\n\t\tgetNextFibonacciNumberFromService: function(){\r\n\t\t\tModelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );\r\n\t\t}\r\n\t};\r\n};',
	};
	
	
	return {
		docs: [
			{
				title: 'Config.json',
				subSections: [
					{
						title: 'Structure and required properties',
						steps: [
							{
								content: 'The config.json file must have a very particular structure, and has required fields. The below example shows an empty config.json file:'
							},
							{
								code: escapedJS.emptyConfigJSON
							}
						]
					},
					{
						title: '\'defaultView\'',
						steps: [
							{
								content: '\'defaultView\' must match the name of an existing view. This is the view that is loaded when the application first starts running, or is navigated to an invalid view.'
							},
							{
								code: escapedJS.configDefaultViewExample
							}
						]
					},
					{
						title: '\'properties\'',
						steps: [
							{
								content: '\'properties\' contains all the file-paths in the application. A default rootPath is required, and is used unless otherwise specified in the configuration for a specific view.'
							},
							{
								code: escapedJS.configPropertiesExample
							}
						]
					},
					{
						title: '\'components\'',
						steps: [
							{
								content: '\'components\' are static or dynamic UI objects available anywhere in your application. For more information, see "Creating Components" section, below'
							},
							{
								code: escapedJS.configComponentsExample
							}
						]
					},
					{
						title: '\'views\'',
						steps: [
							{
								content: '\'views\' are pages (screens) within your application that expose functionality. If a view includes a \'url\' property, it can be navigated-to from the browser\'s address bar (and bookmarked).'
							},
							{
								code: escapedJS.configViewsSimpleExample
							},
							{
								content: 'Child-views can be included inside a parent if they are explicitly declared as such in this config.json file. In this example, #/NestedView, #/NestedView/NestedChild1, and #/NestedView/NestedChild2 are all valid URLs. Complex views must include a template and controller, and optionally include actions, or the pair of model + modelbuilder, or everything, as seen here:'
							},
							{
								code: escapedJS.configViewsNestedExample
							}
						]
					},
					{
						title: '\'services\'',
						steps: [
							{
								content: '\'services\' are application-specific functionality that may be shared between one or more views. They are loaded from a JavaScript files, and can optionally specify a \'rootPath\' property to load from an alltogether-different path:'
							},
							{
								code: escapedJS.servicesExample
							}
						]
					}
				]
			},
			{
				title: 'Creating Application Screens',
				subSections: [
					{
						title: 'Static Page',
						steps: [
							{
								content: 'To create a static HTML page in your application, begin by creating an HTML file "LandingPage.html" in your project folder.'
							},
							{
								code: '<h3>New HTML Page!</h3>'
							},
							{
								content: 'Create a new \'view\' in your config.json:'
							},
							{
								code: escapedJS.appContentStaticExample
							},
							{
								content: 'Now the page is available if you navigate to #/LandingPage'
							}
						]
					},
					{
						title: 'Dynamic Page',
						steps: [
							{
								content: 'To create a dynamic HTML page in your application, you will need an HTML template, and one or more of the following JS files: controller, actions, model, modelbuilder. Modelbuilder requires having a model and controller, and actions requires a controller.'
							},
							{
								content: 'Here is a full example:'
							},
							{
								code: escapedJS.appContentDynamicExampleFull
							}
						]
					}
				]
			},
			{
				title: 'Creating Application Components',
				subSections: [
					{
						title: 'Instructions',
						steps: [
							{
								content: 'Create your component just as you would a simple view, but include it in the \'components\' section of the config.json file. Do not include a \'url\' property, as you cannot navigate directly to a component (only views):'
							},
							{
								code: escapedJS.componentExample
							},
							{
								content: 'To use your component, just include it in any HTML template as seen below. NOTE: The HTML-attribute name must exactly match the component name in config.json file, as well as (optionally) the controller JavaScript file'
							},
							{
								code: '<div ControllerCommunicationListener></div>'
							}
						]
					}
				]
			},
			{
				title: 'Creating Application Services',
				subSections: [
					{
						title: 'Service from File',
						steps: [
							{
								content: 'To create a service that provides complex data, build the service\'s JavaScript file like this:'
							},
							{
								code: escapedJS.servicesExample
							}
						]
					},
					{
						title: 'Using Services',
						steps: [
							{
								content: 'To use a service that has been declared in the application config.json file, include it as a parameter in your JavaScript function, as seen in this Action-file:'
							},
							{
								code: escapedJS.serviceUsageExample
							}
						]
					}
				]
			},
			{
				title: 'HTML Template Information',
				subSections: [
					{
						title: 'Hyperlinks',
						steps: [
							{
								content: 'To link to another page, put the whole route in your hyperlink tag. Links without href="#" will not work correctly.'
							},
							{
								code: '<a href="#PageName/ChildPageName">Go to PageName/ChildPageName</a>'
							}
						]
					}
				]
			}
		]
	};
}
var DocumentationModelbuilder = function(Model){
	return function(){
		return Model;
	};
};
var ControllerCommunicationsActions = function(ControllerCommunication){
	return {
		changeSharedData: function(){
			var randomNumber = Math.floor( Math.random()*1000 );
			ControllerCommunication.set('ControllerCommunicationExampleChannel', randomNumber );	
		}
	};
}
var ControllerCommunicationsController = function(Context, Actions){
	Context.actions = Actions;
};
var HTMLRenderingController = function(Context){
	
	Context.Model = {
		exampleText: "<h2>Hello, World! <small>This text comes from the model</small></h2>"
	};
};
var ParameterPassingController = function( Context, Modelbuilder, StateParameters ){
	Context.Model = Modelbuilder( StateParameters );
};
var ParameterPassingInnerSubrouteController = function(Context, StateParameters){
	
	Context.Model = {
		innerSubrouteParameterExampleId: StateParameters.innerSubrouteParameterExampleId,
		innerSubrouteParameterExampleId2: StateParameters.innerSubrouteParameterExampleId2,
	};
};
var ParameterPassingModel = function(){
	return {};
};
var ParameterPassingModelbuilder = function(Model){
	return function( parameters ){
		
		if( parameters ){
			Model.parameters = parameters;
		}
		
		return Model;
	};
};
var ParameterPassingSubrouteController = function( Context, Modelbuilder, StateParameters ){
	Context.Model = Modelbuilder( StateParameters );
};
var ParameterPassingSubrouteModel = function(){
	return {};
};
var ParameterPassingSubrouteModelbuilder = function(Model){
	return function( parameters ){
		
		if( parameters ){
			Model.parameters = parameters;
		}
		
		return Model;
	};
};
var RoutingActions = function(Router){
	return {
		goToExamples: function(){
			Router.goTo('Examples');	
		},
		goToParameterPassing: function(){
			Router.goTo('ParameterPassing');
		},
		goToParameterPassingSubroute: function(){
			Router.goTo('ParameterPassing.ParameterPassingSubroute');
		},
		goToHome: function(){
			Router.goToHome();
		}
	}
};
var RoutingController = function( Context, Actions ){
	Context.Actions = Actions;
};
var ServicesActions = function(Modelbuilder, FibonacciService, FetchJSONService){
	return {
		getNextFibonacciNumberFromService: function(){
			Modelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );
		},
		
		// This function is called when the service retrieves the JSON data from REST service or file
		FetchJSONServiceDataAvailable: function(){
			
			// Retrieve most-recent data from service
			var data = FetchJSONService.getData();
			
			// Add the data to our Model, which is then exposed to the template and rendered
			Modelbuilder( {jsonData: data} );
		}
	};
};
var ServicesController = function( Context, Modelbuilder, Actions, FetchJSONService ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
	
	FetchJSONService.listenForData( Context.Actions.FetchJSONServiceDataAvailable );
	
	// By calling fetchData() here, the service will retrieve the JSON data as soon as this controller is loaded
	// Alternatively, the call to fetchData() can be tied to an event, or an Action function
	FetchJSONService.fetchData();
};
var ServicesModel = function(){
	return {
		fibonacciNumber: 1
	};
};
var ServicesModelbuilder = function(Model, ExampleService, USAStates){
	return function( options ){
		if( options && options.fibonacciNumber ){
			Model.fibonacciNumber = options.fibonacciNumber;
		}
		
		if( options && options.jsonData ){
			Model.jsonData = options.jsonData;	
		}
		
		Model.data = ExampleService.getExampleData();
		Model.states = USAStates.states;
		return Model;
	};
};
// Actions are functions that can be invoked by interacting with the template

var SimpleActions = function(Modelbuilder){
	return {
		changeModel: function(){
			Modelbuilder( {firstName: 'Second, Changed', lastName: 'Model'} );	
		}
	};
};
// A Controller needs to receive the following parameters:
//   Context (which is exposed to the template), 
//   Actions (functions that can be called by actions in the template)
//   Modelbuilder (which is invoked to get a model to display)

var SimpleController = function( Context, Modelbuilder, Actions ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
};
// A Model just returns a plain JS object (with no functions!)

var SimpleModel = function(){
	return {
		firstName: 'John',
		lastName: 'Tibble'
	};
};
// Modelbuilders always accept a Model

var SimpleModelbuilder = function(Model){
	
	// Modelbuilders must return a function that can be called.
	//    This function returns the built model
	return function( config ){
		
		// Modelbuilders can be configured to add/remove/change Model properties
		//     See http://en.wikipedia.org/wiki/Builder_pattern
		if( config && config.firstName && config.lastName ){
			Model.firstName = config.firstName;
			Model.lastName = config.lastName;
		}
		
		return Model;
	};
};
var ControllerCommunicationListenerActions = function(ControllerCommunication, Modelbuilder){
	return {
		notifyNumberChanged: function(){
			var newNumber = ControllerCommunication.get( 'ControllerCommunicationExampleChannel' );
			Modelbuilder( newNumber );
		}
	}
};
var ControllerCommunicationListenerController = function(Context, Modelbuilder, Actions, ControllerCommunication){
	Context.Model = Modelbuilder();
	Context.Actions = Actions;
	
	ControllerCommunication.registerCallback( 'ControllerCommunicationExampleChannel', Actions.notifyNumberChanged );
};
var ControllerCommunicationListenerModel = function(){
	return {
		number: 'Number Not Set!'	
	};
};
var ControllerCommunicationListenerModelbuilder = function(Model){
	return function(newNumber){
		if( newNumber ){
			Model.number = newNumber;	
		}
		
		return Model;
	};
};
var AJAXActions = function(){
	return {};
};
var AJAXController = function( Context, Modelbuilder, Actions ){
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
};
var AJAXModel = function(){
	return {};
}
var AJAXModelbuilder = function(Model){
	return function(){
		return Model;
	};
};
var ExampleService = function(){

	var service = {
		exampleData: {
			firstName: 'Sample',
			lastName: 'Data'
		},
		
		getExampleData: function(){
			return this.exampleData;
		}
	};
	
	return service;
};
var FetchJSONService = function(FrameworkAJAX){
	return {
		data: [],
		fetchingData: false,
		url: 'sample_application/assets/data/mock.json',
		
		// Holds list of callback-functions, to be called in-order when the data is stored
		listeners: [],
		
		// Give the current copy of the data to the caller
		getData: function(){
			return this.data;
		},
		
		// Caller registers a callback function with this service that is called when data arrives
		listenForData: function(callback){
			this.listeners.push( callback );
			
			// If the data has already arrived, immediately execute callback
			if( this.data.length ){
				callback();	
			}
		},
		
		// Begins the process of fetching data from REST (or in this case, our mock JSON)
		fetchData: function(){
			
			// If a fetch is not already in-progress
			if( !this.fetchingData ){
				
				// Begin fetching data
				this.fetchingData = true;
				
				this.fetch( this.url, this.saveData );
			} else {
				// Fetch is already in-progress, so do nothing	
			}
		},
		
		// Instructs the SlimUI Framework to get the JSON
		fetch: function( url, callback ){
			
			var errorCallback = function(){
				console.log('Error fetching data in FetchJSONService');	
			};
			
			var request = {
				url: url,
				method: 'GET',
				data: {}
			};
			
			// See FrameworkAJAX-documentation for more information
			FrameworkAJAX.sendRequest( request, _.bind(callback, this), errorCallback);
		},
		
		// Called by fetch() when the call to FrameworkAJAX completes
		saveData: function( data ){
			
			// Fetch is complete
			this.fetchingData = false;
			
			// Process and save the data
			// 'data' passed to this function is the entire JSON object, which contains 'objects' array
			this.data = data.objects;
			
			// Notify all listeners
			this.notifyListeners();	
		},
		
		// Notify all listeners that the data stored in the service has been updated
		// Once they have been notified, often they will immediately call [ServiceName].getData()
		notifyListeners: function(){
			for( var i in this.listeners ){
				this.listeners[i]();	
			}
		}
		
	};
}
var FibonacciService = function( ){
	return {
		a: 1,
		b: 1,
		getNextFibonacciNumber: function(){
			var value = this.a + this.b;
			this.a = this.b; 
			this.b = value;
			return value;	
		}
	};
};

/**
 * @name USAStates
 * @description 
 * Provides list of states and their abbreviations
 */
var USAStates = function(  ){
	return {
		states : [
		{
			"stateId" : 'AL',
			"stateDescription" : 'Alabama'
		}, {
			"stateId" : 'AK',
			"stateDescription" : 'Alaska'
		}, {
			"stateId" : 'AZ',
			"stateDescription" : 'Arizona'
		}, {
			"stateId" : 'AR',
			"stateDescription" : 'Arkansas'
		}, {
			"stateId" : 'CA',
			"stateDescription" : 'California'
		}, {
			"stateId" : 'CO',
			"stateDescription" : 'Colorado'
		}, {
			"stateId" : 'CT',
			"stateDescription" : 'Connecticut'
		}, {
			"stateId" : 'DE',
			"stateDescription" : 'Delaware'
		}, {
			"stateId" : 'FL',
			"stateDescription" : 'Florida'
		}, {
			"stateId" : 'GA',
			"stateDescription" : 'Georgia'
		}, {
			"stateId" : 'HI',
			"stateDescription" : 'Hawaii'
		}, {
			"stateId" : 'ID',
			"stateDescription" : 'Idaho'
		}, {
			"stateId" : 'IL',
			"stateDescription" : 'Illinois'
		}, {
			"stateId" : 'IN',
			"stateDescription" : 'Indiana'
		}, {
			"stateId" : 'IA',
			"stateDescription" : 'Iowa'
		}, {
			"stateId" : 'KS',
			"stateDescription" : 'Kansas'
		}, {
			"stateId" : 'KY',
			"stateDescription" : 'Kentucky'
		}, {
			"stateId" : 'LA',
			"stateDescription" : 'Louisiana'
		}, {
			"stateId" : 'ME',
			"stateDescription" : 'Maine'
		}, {
			"stateId" : 'MD',
			"stateDescription" : 'Maryland'
		}, {
			"stateId" : 'MA',
			"stateDescription" : 'Massachusetts'
		}, {
			"stateId" : 'MI',
			"stateDescription" : 'Michigan'
		}, {
			"stateId" : 'MN',
			"stateDescription" : 'Minnesota'
		}, {
			"stateId" : 'MS',
			"stateDescription" : 'Mississippi'
		}, {
			"stateId" : 'MO',
			"stateDescription" : 'Missouri'
		}, {
			"stateId" : 'MT',
			"stateDescription" : 'Montana'
		}, {
			"stateId" : 'NE',
			"stateDescription" : 'Nebraska'
		}, {
			"stateId" : 'NV',
			"stateDescription" : 'Nevada'
		}, {
			"stateId" : 'NH',
			"stateDescription" : 'New Hamphsire'
		}, {
			"stateId" : 'NJ',
			"stateDescription" : 'New Jersey'
		}, {
			"stateId" : 'NM',
			"stateDescription" : 'New Mexico'
		}, {
			"stateId" : 'NY',
			"stateDescription" : 'New York'
		}, {
			"stateId" : 'NC',
			"stateDescription" : 'North Carolina'
		}, {
			"stateId" : 'ND',
			"stateDescription" : 'North Dakota'
		}, {
			"stateId" : 'OH',
			"stateDescription" : 'Ohio'
		}, {
			"stateId" : 'OK',
			"stateDescription" : 'Oklahoma'
		}, {
			"stateId" : 'OR',
			"stateDescription" : 'Oregon'
		}, {
			"stateId" : 'PA',
			"stateDescription" : 'Pensylvania'
		}, {
			"stateId" : 'RI',
			"stateDescription" : 'Rhode Island'
		}, {
			"stateId" : 'SC',
			"stateDescription" : 'South Carolina'
		}, {
			"stateId" : 'SD',
			"stateDescription" : 'South Dakota'
		}, {
			"stateId" : 'TN',
			"stateDescription" : 'Tennessee'
		}, {
			"stateId" : 'TX',
			"stateDescription" : 'Texas'
		}, {
			"stateId" : 'UT',
			"stateDescription" : 'Utah'
		}, {
			"stateId" : 'VT',
			"stateDescription" : 'Vermont'
		}, {
			"stateId" : 'VA',
			"stateDescription" : 'Virginia'
		}, {
			"stateId" : 'WA',
			"stateDescription" : 'Washington'
		}, {
			"stateId" : 'WV',
			"stateDescription" : 'West Virginia'
		}, {
			"stateId" : 'WI',
			"stateDescription" : 'Wisconsin'
		}, {
			"stateId" : 'WY',
			"stateDescription" : 'Wyoming'
		}]
	};
};
var DocumentationTemplate = '<div class=\"\"><div class=\"row-fluid title \" id=\"title\"><h2 class=\"voice-brand span12\">Documentation</h2></div><div ng-repeat=\"section in Model.docs\"><h3>{{section.title}}</h3><div class=\"row-fluid container\"><accordion class=\"span12\"><accordion-group ng-repeat=\"lesson in section.subSections\"><accordion-heading>{{lesson.title}}</accordion-heading><div ng-repeat=\"step in lesson.steps\"><div ng-if=\"step.content\"><p>{{step.content}}</p></div><div ng-if=\"step.code\"><pre>{{step.code}}</pre></div></div></accordion-group></accordion></div></div></div>';
var ExamplesTemplate = '<div class=\"row-fluid\"><div class=\"title row-fluid\" id=\"title\"><h2 class=\"voice-brand\">Examples</h2></div><div class=\"row-fluid\"><div class=\"col-md-8 container\" ui-view=\"\" autoscroll=\"false\">Please choose an option from the menu. If you\'re new to the SlimUI framework start with a simple example <a href=\"#/Examples/Simple\">here</a>.</div><div class=\"col-md-4 container\" examplesmenu=\"\"></div></div></div>';
var HeaderTemplate = '<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container\"><h1>SlimUI Framework - Sample Application</h1><center><div class=\"row\"><div class=\"col-md-2\"><a href=\"#Documentation\">Documentation</a></div><div class=\"col-md-2\"><a href=\"#Examples\">Examples</a></div><div class=\"col-md-2\"><a href=\"#ReleaseNotes\">Release Notes</a></div><div class=\"col-md-3\"><a href=\"#MoreInformation\">More Information</a></div><div class=\"col-md-3\"><a href=\"#Setup\">Setup</a></div></div></center></div></nav>';
var LandingPageTemplate = '<h3>Choose from the options above to learn more about the SlimUI Framework</h3>';
var ReleaseNotesTemplate = '<div class=\"container\"><h2>Release Notes</h2><p><h3><span class=\"label label-warning\">In Development</span></h3><div class=\"container\"><ul><li>Removing controllers completely and refactoring dependency-injection.</li><li>Updating examples to show model reuse across screens.</li></ul></div></p><p><h3>v0.0.16 <span class=\"label label-info\">Stable</span> <small>June 12, 2014</small></h3><div class=\"container\"><ul><li>Fixed bug in URL route-creation. Now config.json views MUST include \'url\' to be routable.</li></ul></div></p><p><h3>v0.0.15 <small>May 15, 2014</small></h3><div class=\"container\"><ul><li>Updated Services Example with how to fetch JSON asynchronously using a Service, built on top of SlimUI\'s \'FrameworkAJAX\'</li></ul></div></p><p><h3>v0.0.14 <small>May 8, 2014</small></h3><div class=\"container\"><ul><li>Created new Gulp-task to build a \'Standalone\' version of the SlimUI framework. See included sample_application.html for how to use this.</li></ul></div></p><p><h3>v0.0.13 <small>April 24, 2014</small></h3><div class=\"container\"><ul><li>Removed RequireJS script-loading due to work done with Gulp. Now the framework assumes that all scripts are loaded in-memory before application is initialized. Look in the gulpfile.js and \'Setup\' section for more information about how to build the application.</li></ul></div></p><p><h3>v0.0.12 <small>April 8, 2014</small></h3><div class=\"container\"><ul><li>Bug Fix: Setting ControllerCommunication channel to value [false] would not notify channel-listeners</li><li>Updated Documentation for ngSantitize</li><li>Setup Information added</li><li>Documentation for Services updated</li></ul></div></p><p><h3>v0.0.11 <small>April 7, 2014</small></h3><div class=\"container\"><ul><li>Added ngSanitize to allow for rendering of HTML in a template</li></ul></div></p><p><h3>v0.0.10 <small>April 4, 2014</small></h3><div class=\"container\"><ul><li>Added ability to pass parameters to HTML elements</li><li>Fixed bug when defaultView requires parameters</li></ul></div></p><p><h3>v0.0.9 <small>March 27, 2014</small></h3><div class=\"container\"><ul><li>Fixed parameter-passing bug. Now passing parameters using Router.goTo(\"state\", {\'parameterName\': value}) works correctly.</li><li>Improved config-file validation and error-checking to give more helpful advice.</li></ul></div></p><p><h3>v0.0.8 <small>March 25, 2014</small></h3><div class=\"container\"><ul><li>Added <a href=\"#/Examples/Services\">Services Examples</a> to help developers write services.</li><li>Refactored config.json service-generation functionality to act more like views/components.</li><li>Added arbitrarily-deep subroutes with <a href=\"#/ParameterPassing//\">Parameter Passing</a>. Additionally, extended examples.</li></ul></div></p><p><h3>v0.0.7 <small>March 21, 2014</small></h3><div class=\"container\"><ul><li>Rebuilt <a href=\"#/ParameterPassing//\">Parameter Passing</a> functionality with examples</li><li>Created this Release Notes page</li><li>Config.json: <a href=\"#/Documentation\">Restructured and simplified</a>. Added assumptions about file names and naming conventions to automate loading files, which greatly reduces config.json complexity. Added support for multiple root-folders, specified on a view-by-view basis. Updated config.js examples and documentation.</li></ul></div></p><p><h3>v0.0.6 <small>March 20, 2014</small></h3><div class=\"container\"><ul><li>Refactored framework to separate Model, Modelbuilder, Actions, and Controller. See <a href=\"#/Examples/Simple\">Simple Page Documentation</a>.</li><li>Reworked route-generation to allow for view to have a url of \'/\'</li><li>In config.json, renamed \'regions\' to \'subroutes\'</li></ul></div></p><p><h3>v0.0.5 <small>March 14, 2014</small></h3><div class=\"container\"><ul><li>Changed \'FrameworkPOST\' service to \'FrameworkAJAX\'</li><li>Removed \'Session\' service</li><li>Removed two \'Routing\' service methods</li></ul></div></p><p><h3>v0.0.4 <small>March 7, 2014</small></h3><div class=\"container\"><ul><li>Updated framework to pull RequireJS text-loading plugin dependency from bower_components folder</li></ul></div></p><p><h3>v0.0.3 <small>March 7, 2014</small></h3></p><p><h3>v0.0.2 <small>March 6, 2014</small></h3></p><p><h3>v0.0.1 <small>March 5, 2014</small></h3><div class=\"container\"><ul><li>First release using Bower</li></ul></div></p></div>';
var SetupTemplate = '<div class=\"row-fluid\"><div class=\"title row-fluid\" id=\"title\"><h2 class=\"voice-brand\">Setup</h2></div><div class=\"row-fluid\"><div class=\"col-md-8 container\" ui-view=\"\" autoscroll=\"false\">In this section, you´ll learn how to install the previous requirements that you need for work with UI project.</div><div class=\"col-md-4\" setupmenu=\"\"></div></div></div>';
var AJAXTemplate = '<h3 class=\"voice-brand\">AJAX with the SlimUI Framework</h3>';
var ControllerCommunicationsTemplate = '<h3 class=\"voice-brand\">Controller Communication</h3>The SlimUI Framework provides a service that lets controllers communicate on a shared channel. Include the ControllerCommunication service as a parameter in your controller to begin using it:<pre>var FunctionName = function(Context, ControllerCommunication){</pre>The ControllerCommunication service has four methods available:<pre>ControllerCommunication.registerCallback(channel, callback);\r\nControllerCommunication.notifyObservers(channel);\r\nControllerCommunication.get(channel);\r\nControllerCommunication.set(channel, data);</pre><p>get(channel) retrieves the data associated with a particular \'channel\'.</p><p>set(channel, data) sets the data on a particular channel and then calls notifyObservers() to alert all listeners to the changed data.</p><p>registerCallback(channel, callback) associates a function in your controller with a ControllerCommunication \'channel\'. When the data associated with that channel changes, this callback function will be invoked.</p><p>notifyObservers(channel) notifies all listeners on a given \'channel\' that the data has changed. Calling ControllerCommunication.set() calls this automatically.</p><hr><p>Example:<br><div class=\"btn btn-primary\" ng-click=\"actions.changeSharedData()\">Set New Number</div></p><p><div controllercommunicationlistener=\"\"></div></p><p></p>';
var ExamplesMenuTemplate = '<h3 class=\"voice-brand\">Menu</h3><ul><li><a href=\"#/Examples/Simple\">Simple Page</a></li><li><a href=\"#/Examples/Routing\">Routing</a></li><li><a href=\"#/Examples/ControllerCommunications\">Controller Communication</a></li><li><a href=\"#/Examples/AJAX\">AJAX</a></li><li><a href=\"#/ParameterPassing//\">Parameter Passing</a></li><li><a href=\"#/Examples/Services\">Services</a></li><li><a href=\"#/Examples/HTMLRendering\">HTMLRendering</a></li></ul>';
var HTMLRenderingTemplate = '<h3 class=\"voice-brand\">HTML Rendering</h3>The framework allows you to (on occasion!) render HTML into your view using the \'ng-bind-html\' attribute like this example:<pre>&lt;div ng-bind-html=&quot;Model.textToRender&quot;&gt;&lt;/div&gt;</pre><hr><p><span ng-bind-html=\"Model.exampleText\"></span></p>';
var ParameterPassingTemplate = '<div class=\"row-fluid\"><div class=\"title row-fluid\" id=\"title\"><h2 class=\"voice-brand\">Examples</h2></div><div class=\"row-fluid\"><div class=\"col-md-8 container\"><p><div class=\"alert alert-info\">Notice the URL for this page! This page is not a subroute of Examples; it is its own top-level route.</div></p><h3 class=\"voice-brand\">Parameter Passing</h3><p>This page received the following URL parameters:<div ng-repeat=\"(key, value) in Model.parameters\">{{key}}: <b>{{value}}</b></div></p><hr><h3 class=\"voice-brand\">Demo 1: Pass Simple Parameters</h3><div class=\"container\"><p><a href=\"#/ParameterPassing/parameter1/parameter2\">Click to send parameters to this page</a></p></div><hr><h3 class=\"voice-brand\">Demo 2: Navigate to Subroute</h3><div class=\"well well-lg\" ui-view=\"\" autoscroll=\"false\"><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute//\">Click to navigate to subroute (no subroute parameters)</a></p></div></div><div class=\"col-md-4\" examplesmenu=\"\"></div></div><div class=\"row-fluid\"><div class=\"col-md-12 container\"><hr><h3 class=\"voice-brand\">Parameter Passing</h3><p>URL Parameter-passing can be used to select a particular item and drill down into its details.</p><p>To pass paramters to a view, you must add a list of parameters to the view in your config.json file:<pre>\"ParameterPassing\": {\r\n	\"url\": \"ParameterPassing\",\r\n	\"template\": \"ParameterPassingTemplate\",\r\n	\"model\": \"ParameterPassingModel\",\r\n	\"modelbuilder\": \"ParameterPassingModelbuilder\",\r\n	\"controller\": \"ParameterPassingController\",\r\n	\"parameters\": [\r\n		\"parameterExampleId\",\r\n		\"parameterExampleId2\"\r\n	],\r\n	\"subroutes\": [\r\n		\"ParameterPassingSubroute\"	\r\n	]\r\n}</pre><pre>\"ParameterPassingSubroute\": {\r\n	\"template\": \"ParameterPassingSubrouteTemplate\",\r\n	\"model\": \"ParameterPassingSubrouteModel\",\r\n	\"modelbuilder\": \"ParameterPassingSubrouteModelbuilder\",\r\n	\"controller\": \"ParameterPassingSubrouteController\",\r\n	\"parameters\": [\r\n		\"subrouteParameterExampleId\",\r\n		\"subrouteParameterExampleId2\"\r\n	]\r\n}</pre></p><p>To receive parameters, include them in your controller and pass them to your modelbuilder:<pre>var ParameterPassingController = function( Context, Modelbuilder, StateParameters ){\r\n	Context.Model = Modelbuilder( StateParameters );\r\n};</pre><pre>var ParameterPassingModelbuilder = function(Model){\r\n	return function( parameters ){\r\n		\r\n		if( parameters ){\r\n			Model.parameters = parameters;\r\n		}\r\n		\r\n		return Model;\r\n	};\r\n};</pre></p><br><br></div></div></div>';
var ParameterPassingInnerSubrouteTemplate = '<h4 class=\"voice-brand\">ParameterPassingInnerSubroute</h4><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4/ParameterPassingInnerSubroute/parameter5/parameter6\">Click to add subroute parameters</a></p>';
var ParameterPassingSubrouteTemplate = '<h3 class=\"voice-brand\">ParameterPassingSubroute</h3><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4\">Click to add subroute parameters</a></p><div class=\"well well-lg\" ui-view=\"\" autoscroll=\"false\"><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4/ParameterPassingInnerSubroute//\">Load the inner-most subroute (no parameters)</a></div>';
var RoutingTemplate = '<h3 class=\"voice-brand\">Routing</h3>The SlimUI Framework provides a service that can be used to route from page-to-page within your application. Include the Router as a parameter in your controller to begin using it:<pre>var FunctionName = function(Context, Router){</pre>The Router has two methods available, goTo() and goToHome()<pre>Router.goTo(\'Screen6\');\r\n	Router.goTo(\'Screen6.SubScreen\');\r\n	Router.goTo(\'Screen6\', parameters);\r\n	Router.goToHome();</pre><p>Router.goTo( route ) changes the browser URL and navigates to that page. Router.goTo( route, parameters ) navigates to the page, but additionally passes along parameters to the destination view Router.goToHome() will navigate to the \'defaultView\' as specified in the config.json file.</p><p>Examples:<br><a href=\"\" ng-click=\"Actions.goToExamples()\">Go To #/Examples</a><br><a href=\"\" ng-click=\"Actions.goToParameterPassing()\">Go To #/ParameterPassing//</a><br><a href=\"\" ng-click=\"Actions.goToParameterPassingSubroute()\">Go To #/ParameterPassing///ParameterPassingSubroute//</a><br><a href=\"\" ng-click=\"Actions.goToHome()\">Go To Home</a><br></p>';
var ServicesTemplate = '<h3 class=\"voice-brand\">Populating a Model with Services</h3><p>This data comes from the ExampleService: <b>{{Model.data.firstName}} {{Model.data.lastName}}</b></p><p>This selected state <b>{{Model.selectedState.stateDescription}}</b> comes from a dropdown displaying options from a more-complex \"USAStates\" service:<select ng-model=\"Model.selectedState\" ng-options=\"state.stateId for state in Model.states\"></select></p><hr><h3 class=\"voice-brand\">Calling a Service with Actions</h3><p>The next Fibonacci Number is <span class=\"btn btn-primary btn-sm\" ng-click=\"Actions.getNextFibonacciNumberFromService()\">{{Model.fibonacciNumber}}</span></p><hr><h3 class=\"voice-brand\">Building a Service</h3><p>To build a service that returns client-side data, create a generic JavaScript function that returns an object:<pre>var FibonacciService = function( ){\r\n	return {\r\n		a: 1,\r\n		b: 1,\r\n		getNextFibonacciNumber: function(){\r\n			var value = this.a + this.b;\r\n			this.a = this.b; \r\n			this.b = value;\r\n			return value;	\r\n		}\r\n	};\r\n};</pre></p><p>Then pass the service to an Actions, Modelbuilder, or Controller, where it will be available:<pre>var ServicesActions = function(Modelbuilder, FibonacciService){\r\n	return {\r\n		getNextFibonacciNumberFromService: function(){\r\n			Modelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );\r\n		}\r\n	};\r\n};</pre></p><hr><h3 class=\"voice-brand\">Building an Asynchronous Service</h3><p>To build a service that returns server-side data, follow the example of the \'FetchJSONService\', provided with this sample application. The caller must register a callback with the service, and then tell the service to begin the asychronous fetch:<pre>// In controller or actions...\r\nFetchJSONService.listenForData( Context.Actions.FetchJSONServiceDataAvailable );\r\nFetchJSONService.fetchData();</pre><pre>// In actions...\r\n\r\nFetchJSONServiceDataAvailable: function(){\r\n	\r\n  // Retrieve most-recent data from service\r\n  var data = FetchJSONService.getData();\r\n\r\n  // Add the data to our Model, which is then exposed to the template and rendered\r\n  Modelbuilder( {jsonData: data} );\r\n}</pre><table class=\"table\"><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr ng-repeat=\"object in Model.jsonData\"><td>{{object.id}}</td><td>{{object.name}}</td></tr></tbody></table></p>';
var SimpleTemplate = '<div class=\"row-fluid\"><h3 class=\"voice-brand\">Simple Page</h3><p>This example will show how to create a simple screen with basic functionality using the framework.</p><hr><h4 class=\"voice-brand\">Demo:</h4>Model: {{Model.firstName}} {{Model.lastName}}<br><br>Click to change model through Modelbinder:<br><div class=\"btn btn-primary\" ng-click=\"Actions.changeModel()\">Change Model Through Modelbinder</div><hr><h4 class=\"voice-brand\">Example:</h4><p>Begin by creating a new view in your config.json file:</p><pre>{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"Simple\": {\r\n                \"url\": \"Simple\",\r\n                \"template\": \"SimpleTemplate\",\r\n                \"model\": \"SimpleModel\",\r\n                \"modelbuilder\": \"SimpleModelbuilder\",\r\n                \"actions\": \"SimpleActions\",\r\n                \"controller\": \"SimpleController\"\r\n            }\r\n        }\r\n    }\r\n}</pre><p>Next, add the files to your properties section:</p><pre>{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"jsPaths\": {\r\n                \"SimpleModel\": \"path/to/SimpleModel.js\",\r\n                \"SimpleModelbuilder\": \"path/to/SimpleModelbuilder.js\",\r\n                \"SimpleActions\": \"path/to/SimpleActions.js\",\r\n                \"SimpleController\": \"path/to/SimpleController.js\"\r\n            },\r\n            \"templatePaths\": {\r\n                \"SimpleTemplate\": \"path/to/Simple.html\"\r\n            }\r\n        }\r\n    }\r\n}</pre><p>Create your model (using this page as an example):</p><pre>// A Model just returns a plain JS object (with no functions!)\r\n\r\nvar SimpleModel = function(){\r\n	return {\r\n		firstName: \'John\',\r\n		lastName: \'Tibble\'\r\n	};\r\n};</pre><p>Create your modelbuilder (using this page as an example):</p><pre>// Modelbuilders always accept a Model\r\n\r\nvar SimpleModelbuilder = function(Model){\r\n	\r\n	// Modelbuilders must return a function that can be called.\r\n	//    This function returns the built model\r\n	return function( config ){\r\n		\r\n		// Modelbuilders can be configured to add/remove/change Model properties\r\n		//     See http://en.wikipedia.org/wiki/Builder_pattern\r\n		if( config && config.firstName && config.lastName ){\r\n			Model.firstName = config.firstName;\r\n			Model.lastName = config.lastName;\r\n		}\r\n		\r\n		return Model;\r\n	};\r\n};</pre><p>Create your actions (using this page as an example):</p><pre>var ExamplesActions = function(Router){\r\n	return {\r\n		goTo: function( route ){\r\n			Router.goTo(route);\r\n		}\r\n	};\r\n};</pre><p>Create your controller (using this page as an example):</p><pre>// A Controller needs to receive the following parameters:\r\n//   Context (which is exposed to the template), \r\n//   Actions (functions that can be called by actions in the template)\r\n//   Modelbuilder (which is invoked to get a model to display)\r\n\r\nvar SimpleController = function( Context, Modelbuilder, Actions ){\r\n	Context.Actions = Actions;\r\n	Context.Model = Modelbuilder();\r\n};</pre><p>Create your template (look at the page for this example)<br>Finally, navigate with your browser to #/Simple to see the page</p></div>';
var BowerTemplate = '<div class=\"row-fluid\"><h3 class=\"voice-brand\">Config Proxies</h3><p>We need previously installed Git and Node JS</p><h4 class=\"voice-brand\">Creating .bash_profile</h4><pre>1.-	Create file .bash_profile in your user folder, which is usually C:/Users/[SSO]/\n2.-	In .bash_profile, add the following:<h6># Enable npm & git behind the GE proxy with these ENV variables</h6>export http_proxy=\"http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80\"\n    export HTTPS_PROXY=\"http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80\"\n    export https_proxy=\"http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80\"\n    export HTTP_PROXY=\"http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80\"<h6># For GIT</h6>export no_proxy=\"devcloud.sw.ge.com, openge.ge.com\" #Atlassian Stash and OpenGE\n		\n3.- Open up your .gitconfig file in C:/Users/[SSO]/.gitconfig and add the following:\n\n    [url \"ssh://\"]\n        insteadOf = git://\n     \n4.- Open up Git Bash from Start Menu -> Programs -> Git -> Git Bash       \n\n5.- Navigate to project folder\n\n6.- Add proxies to node package manager like this:\n\n    npm config set proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80/ \n    npm config set https-proxy http://iss-americas-pitc-alpharettaz.proxy.corporate.ge.com:80/</pre><h4 class=\"voice-brand\">Installing Bower</h4><pre>1.- Opem Git Bash and type:\n\n    npm install -g bower\n\n2.- Run bower to fetch all UI dependencies:\n\n    bower install</pre></div>';
var NodeTemplate = '<div class=\"row-fluid\"><h3 class=\"voice-brand\">NodeJS Configuration</h3><p>We need previously installed NodeJS</p><h4 class=\"voice-brand\">Install the Test environment</h4><p>Open the Windows Console</p><pre>1.-	Go to ...ls-client\\src\\main\\javascript\\test\\nightwatch (click enter)\n2.-	Run to add proxy configuration:\n	npm config set proxy http://alpext11.proxy.corporate.ge.com:80/ (click enter)\n	npm config set https-proxy http://alpext11.proxy.corporate.ge.com:80/ (click enter)\n \n3.-	Run: \n	npm install (click enter)\n\n4.-	Download selenium-standalone (selenium-server-standalone-2.39.0.jar2)from libraries:\n	http://libraries.ge.com/foldersIndex.do?entity_id=29896711101&sid=101&SF=1#29896711101<h5>Note: Change the name selenium-server-standalone-2.39.0.jar2 to selenium-server-standalone-2.39.0.jar</h5>5.-	Paste selenium-standalone driver and put it in:\n...ls-client\\src\\main\\javascript\\test\\nightwatch\\selenium-driver\\ (click enter)\n\n6.- Open Firefox (default browser) and paste the url:\n	http://localhost:8080/client/javascript/app/brands/ge/#/DMC\n\n7.-	In the console go to ...ls-client\\src\\main\\javascript\\test\\nightwatch (click enter)\n	and then run:\n 		node nightwatch.js -c nightwatch-settings.json (click enter)</pre><p>Configuration for Chrome Browser:</p><pre>1.-	Download chrome driver from http://libraries.ge.com/foldersIndex.do?entity_id=29896711101&sid=101&SF=1#29896711101\nChange the name chromedriver.exe2 to chromedriver.exe\n\n2.-	Paste selenium-server-standalone-2.39.0.jar and chromedriver.exe into \n…\\ls-client\\src\\main\\javascript\\test\\nightwatch\\drivers\n\n3.-	Open Chrome and paste the url:\nhttp://localhost:8080/client/javascript/app/brands/ge/#/DMC\n\n4.-	in the console go to ...ls-client\\src\\main\\javascript\\test\\nightwatch \n5.-	run:\n node nightwatch.js -c nightwatch-settings.json</pre></div>';
var SetupMenuTemplate = '<div class=\"container\"><h3 class=\"voice-brand\">Menu</h3><ul><li><a href=\"#/Setup/Node\">How to set up NodeJS</a></li><li><a href=\"#/Setup/GIT\">How to set up Git</a></li><li><a href=\"#/Setup/Bower\">Install Bower and Config Proxies</a></li></ul></div>';
var GITTemplate = '<div class=\"row-fluid\"><h3 class=\"voice-brand\">How configure Git</h3><p>We need previously installed Git (Git GUI and Git Bash)</p><h4 class=\"voice-brand\">Define the workspace</h4><p>Open the “Git Bash\"</p><pre>1.-	First, we need to go to local disk, we can use the next syntaxis :  \n		cd ../..   (click enter)\n2.-	Now, go to workspace:\n		cd GE_DATA_CLASSIFICATION/confidencial/workspace/  (click enter)\n3.-	Type your OpenGE email	\n		git clone ssh://nameaccount@ge.com/gitroot/ls2_0 ls20angular  (click enter)\n			(After this, you need type your OpenGE password)\n4.-	Then, in the screen will be appear a message dialog with two options:\n		Write yes (click enter) and wait for download\n5.-	When the download finish, type:\n		cd ls20angular/  (click enter)\n		and then	\n		git checkout \"master\" branch(click enter) <img src=\"sample_application/assets/img/img1.jpg\"></pre><p>Now, go to ls20angular folder: GE_DATA_CLASSIFICATION/confidencial/workspace/ls20angular and Press right click and select TortoiseGit:</p><pre>1.- First select Fetch <img src=\"sample_application/assets/img/img2.jpg\"> 2.- Press OK, after, type your password <img src=\"sample_application/assets/img/img3.jpg\"> 3.- When Fetch is finish, select Pull and repeat the last step.\n\n4.- Press right click and select TortoiseGit/Settings <img src=\"sample_application/assets/img/img4.jpg\"> 5.- Type your Name and your Email of GE. <img src=\"sample_application/assets/img/img5.jpg\"> 6.- Click in Edit local .git/config button and modify like this: (only substitude with your respective name and email) <img src=\"sample_application/assets/img/img6.jpg\"> 7.- Finally, press OK.</pre></div>';
var ControllerCommunicationListenerTemplate = 'In the ControllerCommunicationListener Component:<pre>Current Number: {{Model.number}}</pre>';