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
var ValidationController = function(Context, Actions, Modelbuilder, SchemaValidation){
    Context.Actions = Actions;
    Context.Model = new Modelbuilder();
    
    SchemaValidation.loadSchema('sample_application/assets/data/CustomerSchema.json');
};

var ValidationModel = function(){
    return {
        usernameRegex: /^[a-zA-Z0-9]{8,20}$/,
        passwordRegex: /^[a-zA-Z0-9]{8,20}$/,
        calendarPopupVisible: false,
        
        
        /* (example) Customer Domain Object */
        name: 'John Tibble',
        address: '1 Village Center Drive',
        address2: 'Building 50-2-033',
        city: 'Van Buren Twp',
        state: {
            stateId: 'MI'
        },
        zip: '48111',
        socialSecurityNumber: "123-45-6789",
        birthDate: 'Aug 16, 1989',
        yearsDriving: 10
    };
};

var ValidationModelbuilder = function(Model, USAStates){
    return function(options){
        if( options ){
            if( options.toggleCalendar !== undefined ){
                Model.calendarPopupVisible = !Model.calendarPopupVisible;   
            }
        }
        
        Model.states = USAStates.states;
        return Model;
    };
};

var ValidationActions = function(Modelbuilder){
    return {
        openCalendar: function(event){
            event.preventDefault();
            event.stopPropagation();
            
            Modelbuilder({toggleCalendar: true}); 
        }
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
var DocumentationController = function(Context, Modelbuilder){
	Context.Model = Modelbuilder();
};
var DocumentationModel = function(){
	
	// EscapedJS generated with JSONLint.com and freeformatter.com/javascript-escape.html
	
	var escapedJS = {
		emptyConfigJSON: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"\",\r\n        \"components\": {\r\n        },\r\n        \"views\": {\r\n        },\r\n        \"services\": {\r\n        }\r\n    }\r\n}',
		configDefaultViewExample: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"LandingPage\",\r\n        \"views\": {\r\n            \"LandingPage\": {\r\n                \"url\": \"\/\"\r\n            }\r\n        }\r\n    }\r\n}',
		configComponentsExample: '{\r\n    \"applicationConfig\": {\r\n        \"components\": {\r\n            \"Header\": {\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsSimpleExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"Documentation\": {\r\n                \"url\": \"Documentation\",\r\n                \"controller\": true,\r\n                \"model\": true,\r\n                \"modelbuilder\": true\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsNestedExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"ParameterPassing\": {\r\n                \"url\": \"ParameterPassing\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"parameterExampleId\",\r\n                    \"parameterExampleId2\"\r\n                ],\r\n                \"subroutes\": [\r\n                    \"ParameterPassingSubroute\"\r\n                ]\r\n            },\r\n            \"ParameterPassingSubroute\": {\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"subrouteParameterExampleId\",\r\n                    \"subrouteParameterExampleId2\"\r\n                ]\r\n            }\r\n        }\r\n    }\r\n}',
		configServicesExample: '{\r\n    \"applicationConfig\": {\r\n        \"services\": {\r\n            \"existing\": {\r\n                \"ExampleService\": \"path\/to\/ExistingService.js\"\r\n            },\r\n            \"generating\": {\r\n                \"ApplicationMessages\": {\r\n                    \"Header\": {\r\n                        \"primaryText\": \"Header Primary Text\",\r\n                        \"secondaryText\": \"header secondary text\"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}',
		appContentStaticExample: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"LandingPage\",\r\n        \"views\": {\r\n            \"LandingPage\": {\r\n                \"url\": \"\/\"\r\n            },\r\n        }\r\n    }\r\n}',
		appContentDynamicExampleFull: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"ParameterPassing\": {\r\n                \"url\": \"ParameterPassing\",\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"parameterExampleId\",\r\n                    \"parameterExampleId2\"\r\n                ],\r\n                \"subroutes\": [\r\n                    \"ParameterPassingSubroute\"\r\n                ]\r\n            },\r\n            \"ParameterPassingSubroute\": {\r\n                \"model\": true,\r\n                \"modelbuilder\": true,\r\n                \"controller\": true,\r\n                \"parameters\": [\r\n                    \"subrouteParameterExampleId\",\r\n                    \"subrouteParameterExampleId2\"\r\n                ]\r\n            }\r\n        }\r\n    }\r\n}',
		componentExample: '{\r\n    \"applicationConfig\": {\r\n        \"components\": {\r\n            \"ControllerCommunicationListener\": {\r\n                \"controller\": true,\r\n                \"modelbuilder\": true,\r\n                \"actions\": true,\r\n                \"model\": true\r\n            }\r\n        }\r\n    }\r\n}',
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
			FrameworkAJAX.sendRequest( request, angular.bind(this,callback), errorCallback);
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
var PromisesActions = function( Modelbuilder, Promise ){
	return { 
        createPromise: function(){
            var promise;
            if( Promise.createDeferred('Example') ){
                promise = Promise.getPromise( 'Example' );   
            }

            promise.then( function(){
                Modelbuilder({promiseResolved: true}); 
            });
            
            var randomTimeout = Math.random()*2000 + 4000;
            Modelbuilder({timeout: randomTimeout});
            
            setTimeout( function(){
                Promise.resolveDeferred( 'Example' );
            }, randomTimeout );
        }
    };
};
var PromisesController = function( Context, Modelbuilder, Actions ){
    
	Context.Actions = Actions;
	Context.Model = Modelbuilder();
};
var PromisesModel = function(){
	return {
        text: 'Not Created'
    };
}
var PromisesModelbuilder = function(Model){
	return function(options){
        if( options && options.promiseResolved ){   
            Model.text = 'Promise Resolved!';
        }
        if( options && options.timeout ){
            Model.text = 'Promise resolving in ' + (options.timeout/1000).toFixed(2) + ' seconds';
        }
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
var ParameterPassingController = function( Context, Modelbuilder, StateParameters){
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
var RoutingActions = function(Modelbuilder, Router){
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
		},
        getStateParameters: function(){
            Modelbuilder({parameters: Router.getStateParameters()});
        }
	}
};
var RoutingController = function( Context, Actions, Modelbuilder ){
	Context.Actions = Actions;
    Context.Model = Modelbuilder();
};
var RoutingModel = function(){
    return {};
};
var RoutingModelbuilder = function(Model){
    return function(options){
        if( options && options.parameters ){
            Model.parametersString = JSON.stringify( options.parameters );
        }
        return Model;
    }
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
var ExamplesTemplate = '<div class=\"row-fluid\"><div class=\"title row-fluid\" id=\"title\"><h2 class=\"voice-brand\">Examples</h2></div><div class=\"row-fluid\"><div class=\"col-md-8 container\" ui-view=\"\" autoscroll=\"false\">Please choose an option from the menu. If you\'re new to the SlimUI framework start with a simple example <a href=\"#/Examples/Simple\">here</a>.</div><div class=\"col-md-4 container\" examplesmenu=\"\"></div></div></div>';
var AboutTemplate = '<div class=\"container\"><h2>About SlimUI</h2><p>SlimUI was created to help developers build web-applications faster.<br>AngularJS is powerful, but complex, so SlimUI abstracts away much of the complexity of building AngularJS applications.<br>See the <a href=\"#/Examples\">Examples</a> for information on how to build functionality into your SlimUI web app.</p></div><div class=\"container\"><h2>Release Notes</h2><p></p><h3>v1.0.3 <span class=\"label label-info\">Stable</span> <small>April 14, 2015</small></h3><div class=\"container\"><ul><li>Added form-validation directive + service in addition to <a href=\"#/Examples/Validation\">an example</a> and sample validation schema.</li></ul></div><p></p><p></p><h3>v1.0.2 <small>April 9, 2015</small></h3><div class=\"container\"><ul><li>Updated gulpfile and removed preprocessing steps as they broke the build all the time.</li></ul></div><p></p><p></p><h3>v1.0.1 <small>Feb 10, 2015</small></h3><div class=\"container\"><ul><li>Updated bower.json to allow for future versions of Angular to be resolved without manual intervention.</li></ul></div><p></p><p></p><h3>v1.0.0 <small>Jan 12, 2015</small></h3><div class=\"container\"><ul><li><a href=\"https://github.sw.ge.com/jtibble/SlimUI/issues/1\">Corrected minification bug</a></li><li>Removed underscore from Services example</li><li>This project is stable enough now to be considered 1.0.0. It has been deployed with several production applications.</li></ul></div><p></p><p></p><h3>v0.0.23 <small>August 28, 2014</small></h3><div class=\"container\"><ul><li>Removed Underscore.js dependency in lieu of <a href=\"https://docs.angularjs.org/api/ng/function/angular.bind\">angular.bind()</a></li><li>Updated Sample Application examples, including Promises and AJAX documentation.</li></ul></div><p></p><p></p><h3>v0.0.22 <small>August 13, 2014</small></h3><div class=\"container\"><ul><li>Added Router method \'getStateParameters()\' which returns the current state parameters.</li></ul></div><p></p><p></p><h3>v0.0.21 <small>August 4, 2014</small></h3><div class=\"container\"><ul><li>Updated FrameworkAJAX service to return the $http promise to the caller.</li><li>Fixed gulp-build and deployed releaseA/SlimUIStandalone.js</li></ul></div><p></p><p></p><h3>v0.0.20 <span class=\"label label-danger\">Broken Build! Update to v0.0.21</span> <small>August 4, 2014</small></h3><div class=\"container\"><ul><li>Added support for Angular Promises ($q). See the example at <a href=\"#/Examples/Promises\">Examples: Promises</a></li></ul></div><p></p><p></p><h3>v0.0.19 <small>July 29, 2014</small></h3><div class=\"container\"><ul><li>Removed dynamic-rendering of HTML</li><li>Removed the ability to pass data directly to components</li><li>Added Gulp-Preprocessor directives to shrink the compiled SlimUI.min.js and SlimUIStandalone.min.js</li></ul></div><p></p><p></p><h3>v0.0.18 <small>July 25, 2014</small></h3><div class=\"container\"><ul><li>Refactored Gulp file, fixing build issues and removing config-file path-checking. Need to update docs, still.</li></ul></div><p></p><p></p><h3>v0.0.17 <small>July 25, 2014</small></h3><div class=\"container\"><ul><li>Added ngTouch to now swipe events are accessible with the ng-swipe-* attribute in your HTML templates</li></ul></div><p></p><p></p><h3>v0.0.16 <small>June 12, 2014</small></h3><div class=\"container\"><ul><li>Fixed bug in URL route-creation. Now config.json views MUST include \'url\' to be routable.</li></ul></div><p></p><p></p><h3>v0.0.15 <small>May 15, 2014</small></h3><div class=\"container\"><ul><li>Updated Services Example with how to fetch JSON asynchronously using a Service, built on top of SlimUI\'s \'FrameworkAJAX\'</li></ul></div><p></p><p></p><h3>v0.0.14 <small>May 8, 2014</small></h3><div class=\"container\"><ul><li>Created new Gulp-task to build a \'Standalone\' version of the SlimUI framework. See included sample_application.html for how to use this.</li></ul></div><p></p><p></p><h3>v0.0.13 <small>April 24, 2014</small></h3><div class=\"container\"><ul><li>Removed RequireJS script-loading due to work done with Gulp. Now the framework assumes that all scripts are loaded in-memory before application is initialized. Look in the gulpfile.js and \'Setup\' section for more information about how to build the application.</li></ul></div><p></p><p></p><h3>v0.0.12 <small>April 8, 2014</small></h3><div class=\"container\"><ul><li>Bug Fix: Setting ControllerCommunication channel to value [false] would not notify channel-listeners</li><li>Updated Documentation for ngSantitize</li><li>Setup Information added</li><li>Documentation for Services updated</li></ul></div><p></p><p></p><h3>v0.0.11 <small>April 7, 2014</small></h3><div class=\"container\"><ul><li>Added ngSanitize to allow for rendering of HTML in a template</li></ul></div><p></p><p></p><h3>v0.0.10 <small>April 4, 2014</small></h3><div class=\"container\"><ul><li>Added ability to pass parameters to HTML elements</li><li>Fixed bug when defaultView requires parameters</li></ul></div><p></p><p></p><h3>v0.0.9 <small>March 27, 2014</small></h3><div class=\"container\"><ul><li>Fixed parameter-passing bug. Now passing parameters using Router.goTo(\"state\", {\'parameterName\': value}) works correctly.</li><li>Improved config-file validation and error-checking to give more helpful advice.</li></ul></div><p></p><p></p><h3>v0.0.8 <small>March 25, 2014</small></h3><div class=\"container\"><ul><li>Added <a href=\"#/Examples/Services\">Services Examples</a> to help developers write services.</li><li>Refactored config.json service-generation functionality to act more like views/components.</li><li>Added arbitrarily-deep subroutes with <a href=\"#/ParameterPassing//\">Parameter Passing</a>. Additionally, extended examples.</li></ul></div><p></p><p></p><h3>v0.0.7 <small>March 21, 2014</small></h3><div class=\"container\"><ul><li>Rebuilt <a href=\"#/ParameterPassing//\">Parameter Passing</a> functionality with examples</li><li>Created this Release Notes page</li><li>Config.json: <a href=\"#/Documentation\">Restructured and simplified</a>. Added assumptions about file names and naming conventions to automate loading files, which greatly reduces config.json complexity. Added support for multiple root-folders, specified on a view-by-view basis. Updated config.js examples and documentation.</li></ul></div><p></p><p></p><h3>v0.0.6 <small>March 20, 2014</small></h3><div class=\"container\"><ul><li>Refactored framework to separate Model, Modelbuilder, Actions, and Controller. See <a href=\"#/Examples/Simple\">Simple Page Documentation</a>.</li><li>Reworked route-generation to allow for view to have a url of \'/\'</li><li>In config.json, renamed \'regions\' to \'subroutes\'</li></ul></div><p></p><p></p><h3>v0.0.5 <small>March 14, 2014</small></h3><div class=\"container\"><ul><li>Changed \'FrameworkPOST\' service to \'FrameworkAJAX\'</li><li>Removed \'Session\' service</li><li>Removed two \'Routing\' service methods</li></ul></div><p></p><p></p><h3>v0.0.4 <small>March 7, 2014</small></h3><div class=\"container\"><ul><li>Updated framework to pull RequireJS text-loading plugin dependency from bower_components folder</li></ul></div><p></p><p></p><h3>v0.0.3 <small>March 7, 2014</small></h3><p></p><p></p><h3>v0.0.2 <small>March 6, 2014</small></h3><p></p><p></p><h3>v0.0.1 <small>March 5, 2014</small></h3><div class=\"container\"><ul><li>First release using Bower</li></ul></div><p></p></div>';
var ExamplesMenuTemplate = '<h3 class=\"voice-brand\">Menu</h3><ul><li><a href=\"#/Examples/Simple\">Simple Page</a></li><li><a href=\"#/Examples/Routing/\">Routing</a></li><li><a href=\"#/Examples/ControllerCommunications\">Controller Communication</a></li><li><a href=\"#/Examples/AJAX\">AJAX</a></li><li><a href=\"#/ParameterPassing//\">Parameter Passing</a></li><li><a href=\"#/Examples/Services\">Services</a></li><li><a href=\"#/Examples/HTMLRendering\">HTMLRendering</a></li><li><a href=\"#/Examples/Promises\">Promises</a></li><li><a href=\"#/Examples/Validation\">Form Validation</a></li></ul>';
var HTMLRenderingTemplate = '<h3 class=\"voice-brand\">HTML Rendering</h3>This feature has been removed as of v0.0.19 in an effort to shrink the size of the SlimUI framework.';
var HeaderTemplate = '<nav class=\"navbar navbar-default navbar-static-top\" role=\"navigation\"><div class=\"container\"><h1>SlimUI Framework - Samples and Documentation</h1><center><div class=\"row\"><div class=\"col-md-2\"><a href=\"#About\">About SlimUI</a></div><div class=\"col-md-2\"><a href=\"#Documentation\">Documentation</a></div><div class=\"col-md-2\"><a href=\"#Examples\">Examples</a></div></div></center></div></nav>';
var ServicesTemplate = '<h3 class=\"voice-brand\">Populating a Model with Services</h3><p>This data comes from the ExampleService: <b>{{Model.data.firstName}} {{Model.data.lastName}}</b></p><p>This selected state <b>{{Model.selectedState.stateDescription}}</b> comes from a dropdown displaying options from a more-complex \"USAStates\" service:<select ng-model=\"Model.selectedState\" ng-options=\"state.stateId for state in Model.states\"></select></p><hr><h3 class=\"voice-brand\">Calling a Service with Actions</h3><p>The next Fibonacci Number is <span class=\"btn btn-primary btn-sm\" ng-click=\"Actions.getNextFibonacciNumberFromService()\">{{Model.fibonacciNumber}}</span></p><hr><h3 class=\"voice-brand\">Building a Service</h3><p>To build a service that returns client-side data, create a generic JavaScript function that returns an object:<pre>\r\nvar FibonacciService = function( ){\r\n	return {\r\n		a: 1,\r\n		b: 1,\r\n		getNextFibonacciNumber: function(){\r\n			var value = this.a + this.b;\r\n			this.a = this.b; \r\n			this.b = value;\r\n			return value;	\r\n		}\r\n	};\r\n};\r\n</pre></p><p>Then pass the service to an Actions, Modelbuilder, or Controller, where it will be available:<pre>\r\nvar ServicesActions = function(Modelbuilder, FibonacciService){\r\n	return {\r\n		getNextFibonacciNumberFromService: function(){\r\n			Modelbuilder( {fibonacciNumber: FibonacciService.getNextFibonacciNumber()} );\r\n		}\r\n	};\r\n};\r\n</pre></p><hr><h3 class=\"voice-brand\">Building an Asynchronous Service</h3><p>To build a service that returns server-side data, follow the example of the \'FetchJSONService\', provided with this sample application. The caller must register a callback with the service, and then tell the service to begin the asychronous fetch:<pre>\r\n// In controller or actions...\r\nFetchJSONService.listenForData( Context.Actions.FetchJSONServiceDataAvailable );\r\nFetchJSONService.fetchData();\r\n</pre><pre>\r\n// In actions...\r\n\r\nFetchJSONServiceDataAvailable: function(){\r\n	\r\n  // Retrieve most-recent data from service\r\n  var data = FetchJSONService.getData();\r\n\r\n  // Add the data to our Model, which is then exposed to the template and rendered\r\n  Modelbuilder( {jsonData: data} );\r\n}\r\n</pre><table class=\"table\"><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr ng-repeat=\"object in Model.jsonData\"><td>{{object.id}}</td><td>{{object.name}}</td></tr></tbody></table></p>';
var ValidationTemplate = '<h3 class=\"voice-brand\">Validation</h3><p>A simple form with static validation can be created like so:</p><form novalidate name=\"staticForm\"><div class=\"row\"><div class=\"col-xs-3\">Username:</div><div class=\"col-xs-9\"><input type=\"text\" name=\"username\" ng-model=\"Model.username\" ng-pattern=\"Model.usernameRegex\"></div></div><div class=\"row\"><div class=\"col-xs-3\">Password:</div><div class=\"col-xs-9\"><input type=\"password\" name=\"password\" ng-model=\"Model.password\" ng-pattern=\"Model.passwordRegex\"></div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"staticForm.username.$error.pattern\">Username should be 8-20 letters or numbers</div><div class=\"col-xs-12 text-danger\" ng-show=\"staticForm.password.$error.pattern\">Password should be 8-20 letters or numbers</div></div></form><h3 class=\"voice-brand\">Complex Validation</h3><p>A domain-object form can be created and validated using a schema, like this customer-form below.</p><form novalidate name=\"schemaForm\"><div class=\"row form-group\"><div class=\"col-xs-3\">Customer Name</div><div class=\"col-xs-9\"><input type=\"text\" class=\"form-control\" name=\"customerName\" ng-model=\"Model.name\" slimuivalidate=\"name\"></div></div><div class=\"row form-group\"><div class=\"col-xs-3\">Customer Address</div><div class=\"col-xs-9\"><input type=\"text\" class=\"form-control\" name=\"customerAddress\" ng-model=\"Model.address\" slimuivalidate=\"address\"></div></div><div class=\"row form-group\"><div class=\"col-xs-3\"></div><div class=\"col-xs-9\"><input type=\"text\" class=\"form-control\" name=\"customerAddress2\" ng-model=\"Model.address2\" slimuivalidate=\"address2\"></div></div><div class=\"row form-group\"><div class=\"col-xs-3\">Customer City/State/Zip</div><div class=\"col-xs-4\"><input type=\"text\" class=\"form-control\" name=\"customerCity\" ng-model=\"Model.city\" slimuivalidate=\"city\"></div><div class=\"col-xs-2\"><select class=\"form-control\" name=\"customerState\" ng-model=\"Model.state\" ng-options=\"state.stateId for state in Model.states track by state.stateId\" slimuivalidate=\"state\"></select></div><div class=\"col-xs-3\"><input type=\"text\" class=\"form-control\" name=\"customerZip\" placeholder=\"##### or #####-####\" ng-model=\"Model.zip\" slimuivalidate=\"zip\"></div></div><div class=\"row form-group\"><div class=\"col-xs-3\">Customer SSN</div><div class=\"col-xs-9\"><input type=\"text\" class=\"form-control\" name=\"customerSSN\" placeholder=\"###-##-####\" ng-model=\"Model.socialSecurityNumber\" slimuivalidate=\"socialSecurityNumber\"></div></div><div class=\"row form-group\"><div class=\"col-xs-3\">Customer Date of Birth</div><div class=\"col-xs-9\"><div class=\"input-group\"><input type=\"text\" name=\"customerBirthDate\" class=\"form-control\" datepicker-popup=\"MMM dd, yyyy\" ng-model=\"Model.birthDate\" is-open=\"Model.calendarPopupVisible\" datepicker-options=\"Model.dateOptions\" close-text=\"Close\" show-weeks=\"false\" placeholder=\"Jan 1, 1989\" slimuivalidate=\"birthDate\"> <span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"Actions.openCalendar($event)\"><i class=\"fa fa-calendar\"></i></button></span></div></div></div><div class=\"row form-group\"><div class=\"col-xs-3\">Years Driving</div><div class=\"col-xs-9\"><input type=\"number\" class=\"form-control\" name=\"customerDrivingYears\" ng-model=\"Model.yearsDriving\" slimuivalidate=\"yearsDriving\"></div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerName.$error.required\">Customer Name is required</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerAddress.$error.required\">Customer Address is required</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerCity.$error.required\">Customer City is required</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerState.$error.required\">Customer State is required</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerZip.$error.required\">Customer Zip is required</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerZip.$error.regex\">Customer Zip must be formatted correctly (##### or #####-####)</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerSSN.$error.regex\">Customer SSN must be formatted correctly (###-##-####)</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerBirthDate.$error.script\">Customer must be 18 years old</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerBirthDate.$error.regex\">Customer birthday must be formatted like \"MMM DD, YYYY\"</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerBirthDate.$error.parse\">Customer birthday must be a valid date</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerDrivingYears.$error.type\">Customer years-driven must be an integer</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerDrivingYears.$error.number\">Customer years-driven must be a number</div></div><div class=\"row\"><div class=\"col-xs-12 text-danger\" ng-show=\"schemaForm.customerDrivingYears.$error.min\">Customer years-driven cannot be negative</div></div></form><hr><p>Example customer schema:<pre>\r\n{\r\n    \"schemaName\": \"Customer\",\r\n    \"properties\": {\r\n        \"name\": {\r\n            \"required\": true,\r\n            \"type\": \"string\"\r\n        },\r\n        \"address\": {\r\n            \"required\": true,\r\n            \"type\": \"string\"\r\n        },\r\n        \"address2\": {\r\n            \"required\": false,\r\n            \"type\": \"string\"\r\n        },\r\n        \"city\": {\r\n            \"required\": true,\r\n            \"type\": \"string\"\r\n        },\r\n        \"state\": {\r\n            \"required\": true,\r\n            \"type\": \"string\",\r\n            \"regex\": \"^\\\\s\\\\s$\"\r\n        },\r\n        \"zip\": {\r\n            \"required\": true,\r\n            \"regex\": \"^\\\\d\\\\d\\\\d\\\\d\\\\d(-\\\\d\\\\d\\\\d\\\\d)?$\"\r\n        },\r\n        \"birthDate\": {\r\n            \"required\": true,\r\n            \"type\": \"date\",\r\n            \"script\": \"((new Date).getFullYear() - this.getFullYear() - 1) >= 18\"\r\n        },\r\n        \"socialSecurityNumber\": {\r\n            \"required\": true,\r\n            \"regex\": \"^\\\\d\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d\\\\d\\\\d$\"\r\n        },\r\n        \"yearsDriving\": {\r\n            \"required\": false,\r\n            \"type\": \"int\",\r\n            \"min\": 0\r\n        }\r\n    }\r\n}\r\n    \r\n    </pre>loaded by SlimUI like so:<pre>\r\nvar ValidationController = function(Context, Actions, Modelbuilder, SchemaValidation){\r\n    Context.Actions = Actions;\r\n    Context.Model = new Modelbuilder();\r\n    \r\n    SchemaValidation.loadSchema(\'sample_application/assets/data/CustomerSchema.json\');\r\n};\r\n</pre>attached to the template like so:<pre>\r\n&lt;input type=&quot;text&quot;\r\n       class=&quot;form-control&quot;\r\n       name=&quot;customerName&quot;\r\n       ng-model=&quot;Model.name&quot;\r\n       slimuivalidate=&quot;name&quot; &gt;\r\n</pre></p>';
var AJAXTemplate = '<h3 class=\"voice-brand\">AJAX with the SlimUI Framework</h3><p>The SlimUI framework includes a service called FrameworkAJAX which can be used to make AJAX requests to REST services.<br></p><pre>\r\nvar successCallback = function(response){\r\n    // Save the response to your model\r\n    // Modelbuilder({data: response.data});\r\n};\r\n			\r\nvar errorCallback = function(){\r\n    console.log(\'Error fetching data in FetchJSONService\');	\r\n};\r\n\r\nvar request = {\r\n    url: url,\r\n    method: \'GET\',  // Optionally \'POST\'\r\n    data: {} // Not required for GET, but required for \'POST\'\r\n};\r\n\r\nFrameworkAJAX.sendRequest( request, successCallback, errorCallback);\r\n</pre>Please look at \\sample_application\\Examples\\Services\\Services\\FetchJSONService.js for details.';
var DocumentationTemplate = '<div class><div class=\"row-fluid title\" id=\"title\"><h2 class=\"voice-brand span12\">Documentation</h2></div><div ng-repeat=\"section in Model.docs\"><h3>{{section.title}}</h3><div class=\"row-fluid container\"><accordion class=\"span12\"><accordion-group ng-repeat=\"lesson in section.subSections\"><accordion-heading>{{lesson.title}}</accordion-heading><div ng-repeat=\"step in lesson.steps\"><div ng-if=\"step.content\"><p>{{step.content}}</p></div><div ng-if=\"step.code\"><pre>{{step.code}}</pre></div></div></accordion-group></accordion></div></div></div>';
var PromisesTemplate = '<h3 class=\"voice-brand\">Promises</h3><p><div class=\"alert alert-info\">Please use Promises with discretion. DO NOT use them to bind Actions to Model-updates!</div></p><p>Promises can be used to trigger behavior after an asynchronous call has completed. For more information on how to use them, see <a href=\"https://docs.angularjs.org/api/ng/service/$q\">AngularJS \'$q\' Documentation</a>.</p><hr><label>Promise Status: {{Model.text}}</label><br><br><button class=\"btn btn-primary\" ng-click=\"Actions.createPromise()\">Click to Create Promise</button>';
var ControllerCommunicationsTemplate = '<h3 class=\"voice-brand\">Controller Communication</h3>The SlimUI Framework provides a service that lets controllers communicate on a shared channel. Include the ControllerCommunication service as a parameter in your controller to begin using it:<pre>\r\nvar FunctionName = function(Context, ControllerCommunication){\r\n</pre>The ControllerCommunication service has four methods available:<pre>\r\nControllerCommunication.registerCallback(channel, callback);\r\nControllerCommunication.notifyObservers(channel);\r\nControllerCommunication.get(channel);\r\nControllerCommunication.set(channel, data);\r\n</pre><p>get(channel) retrieves the data associated with a particular \'channel\'.</p><p>set(channel, data) sets the data on a particular channel and then calls notifyObservers() to alert all listeners to the changed data.</p><p>registerCallback(channel, callback) associates a function in your controller with a ControllerCommunication \'channel\'. When the data associated with that channel changes, this callback function will be invoked.</p><p>notifyObservers(channel) notifies all listeners on a given \'channel\' that the data has changed. Calling ControllerCommunication.set() calls this automatically.</p><hr><p>Example:<br><div class=\"btn btn-primary\" ng-click=\"actions.changeSharedData()\">Set New Number</div></p><p><div controllercommunicationlistener=\"\"></div></p><p></p>';
var ParameterPassingTemplate = '<div class=\"row-fluid\"><div class=\"title row-fluid\" id=\"title\"><h2 class=\"voice-brand\">Examples</h2></div><div class=\"row-fluid\"><div class=\"col-md-8 container\"><p><div class=\"alert alert-info\">Notice the URL for this page! This page is not a subroute of Examples; it is its own top-level route.</div></p><h3 class=\"voice-brand\">Parameter Passing</h3><p>This page received the following URL parameters:<div ng-repeat=\"(key, value) in Model.parameters\">{{key}}: <b>{{value}}</b></div></p><hr><h3 class=\"voice-brand\">Demo 1: Pass Simple Parameters</h3><div class=\"container\"><p><a href=\"#/ParameterPassing/parameter1/parameter2\">Click to send parameters to this page</a></p></div><hr><h3 class=\"voice-brand\">Demo 2: Navigate to Subroute</h3><div class=\"well well-lg\" ui-view=\"\" autoscroll=\"false\"><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute//\">Click to navigate to subroute (no subroute parameters)</a></p></div></div><div class=\"col-md-4\" examplesmenu=\"\"></div></div><div class=\"row-fluid\"><div class=\"col-md-12 container\"><hr><h3 class=\"voice-brand\">Parameter Passing</h3><p>URL Parameter-passing can be used to select a particular item and drill down into its details.</p><p>To pass paramters to a view, you must add a list of parameters to the view in your config.json file:<pre>\r\n\"ParameterPassing\": {\r\n	\"url\": \"ParameterPassing\",\r\n	\"model\": \"ParameterPassingModel\",\r\n	\"modelbuilder\": \"ParameterPassingModelbuilder\",\r\n	\"controller\": \"ParameterPassingController\",\r\n	\"parameters\": [\r\n		\"parameterExampleId\",\r\n		\"parameterExampleId2\"\r\n	],\r\n	\"subroutes\": [\r\n		\"ParameterPassingSubroute\"	\r\n	]\r\n}\r\n				</pre><pre>\r\n\"ParameterPassingSubroute\": {\r\n	\"model\": \"ParameterPassingSubrouteModel\",\r\n	\"modelbuilder\": \"ParameterPassingSubrouteModelbuilder\",\r\n	\"controller\": \"ParameterPassingSubrouteController\",\r\n	\"parameters\": [\r\n		\"subrouteParameterExampleId\",\r\n		\"subrouteParameterExampleId2\"\r\n	]\r\n}\r\n				</pre></p><p>To receive parameters, include them in your controller and pass them to your modelbuilder:<pre>\r\nvar ParameterPassingController = function( Context, Modelbuilder, StateParameters ){\r\n	Context.Model = Modelbuilder( StateParameters );\r\n};\r\n				</pre><pre>\r\nvar ParameterPassingModelbuilder = function(Model){\r\n	return function( parameters ){\r\n		\r\n		if( parameters ){\r\n			Model.parameters = parameters;\r\n		}\r\n		\r\n		return Model;\r\n	};\r\n};\r\n				</pre></p><br><br></div></div></div>';
var ParameterPassingInnerSubrouteTemplate = '<h4 class=\"voice-brand\">ParameterPassingInnerSubroute</h4><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4/ParameterPassingInnerSubroute/parameter5/parameter6\">Click to add subroute parameters</a></p>';
var ParameterPassingSubrouteTemplate = '<h3 class=\"voice-brand\">ParameterPassingSubroute</h3><p><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4\">Click to add subroute parameters</a></p><div class=\"well well-lg\" ui-view=\"\" autoscroll=\"false\"><a href=\"#/ParameterPassing/parameter1/parameter2/ParameterPassingSubroute/parameter3/parameter4/ParameterPassingInnerSubroute//\">Load the inner-most subroute (no parameters)</a></div>';
var RoutingTemplate = '<h3 class=\"voice-brand\">Routing</h3>The SlimUI Framework provides a service that can be used to route from page-to-page within your application. Include the Router as a parameter in your controller to begin using it:<pre>\r\nvar FunctionName = function(Context, Router){\r\n</pre>The Router has two methods available, goTo() and goToHome()<pre>\r\n	Router.goTo(\'Screen6\');\r\n	Router.goTo(\'Screen6.SubScreen\');\r\n	Router.goTo(\'Screen6\', parameters);\r\n	Router.goToHome();\r\n</pre><p>Router.goTo( route ) changes the browser URL and navigates to that page. Router.goTo( route, parameters ) navigates to the page, but additionally passes along parameters to the destination view Router.goToHome() will navigate to the \'defaultView\' as specified in the config.json file.</p><p>Examples:<br><a href ng-click=\"Actions.goToExamples()\">Go To #/Examples</a><br><a href ng-click=\"Actions.goToParameterPassing()\">Go To #/ParameterPassing//</a><br><a href ng-click=\"Actions.goToParameterPassingSubroute()\">Go To #/ParameterPassing///ParameterPassingSubroute//</a><br><a href ng-click=\"Actions.goToHome()\">Go To Home</a><br><br><br>Current Parameters: {{Model.parametersString}}<br><button ng-click=\"Actions.getStateParameters()\" class=\"btn btn-default\">Click to get Router StateParameters</button><br></p>';
var SimpleTemplate = '<div class=\"row-fluid\"><h3 class=\"voice-brand\">Simple Page</h3><p>This example will show how to create a simple screen with basic functionality using the framework.</p><hr><h4 class=\"voice-brand\">Demo:</h4>Model: {{Model.firstName}} {{Model.lastName}}<br><br>Click to change model through Modelbinder:<br><div class=\"btn btn-primary\" ng-click=\"Actions.changeModel()\">Change Model Through Modelbinder</div><hr><h4 class=\"voice-brand\">Example:</h4><p>Begin by creating a new view in your config.json file:</p><pre>\r\n{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"Simple\": {\r\n                \"url\": \"Simple\",\r\n                \"model\": \"SimpleModel\",\r\n                \"modelbuilder\": \"SimpleModelbuilder\",\r\n                \"actions\": \"SimpleActions\",\r\n                \"controller\": \"SimpleController\"\r\n            }\r\n        }\r\n    }\r\n}\r\n	</pre><p>Create your model (using this page as an example):</p><pre>\r\n// A Model just returns a plain JS object (with no functions!)\r\n\r\nvar SimpleModel = function(){\r\n	return {\r\n		firstName: \'John\',\r\n		lastName: \'Tibble\'\r\n	};\r\n};\r\n	</pre><p>Create your modelbuilder (using this page as an example):</p><pre>\r\n// Modelbuilders always accept a Model\r\n\r\nvar SimpleModelbuilder = function(Model){\r\n	\r\n	// Modelbuilders must return a function that can be called.\r\n	//    This function returns the built model\r\n	return function( config ){\r\n		\r\n		// Modelbuilders can be configured to add/remove/change Model properties\r\n		//     See http://en.wikipedia.org/wiki/Builder_pattern\r\n		if( config && config.firstName && config.lastName ){\r\n			Model.firstName = config.firstName;\r\n			Model.lastName = config.lastName;\r\n		}\r\n		\r\n		return Model;\r\n	};\r\n};\r\n	</pre><p>Create your actions (using this page as an example):</p><pre>\r\nvar ExamplesActions = function(Router){\r\n	return {\r\n		goTo: function( route ){\r\n			Router.goTo(route);\r\n		}\r\n	};\r\n};\r\n	</pre><p>Create your controller (using this page as an example):</p><pre>\r\n// A Controller needs to receive the following parameters:\r\n//   Context (which is exposed to the template), \r\n//   Actions (functions that can be called by actions in the template)\r\n//   Modelbuilder (which is invoked to get a model to display)\r\n\r\nvar SimpleController = function( Context, Modelbuilder, Actions ){\r\n	Context.Actions = Actions;\r\n	Context.Model = Modelbuilder();\r\n};\r\n	</pre><p>Create your template (look at the page for this example)<br>Finally, navigate with your browser to #/Simple to see the page</p></div>';
var ControllerCommunicationListenerTemplate = 'In the ControllerCommunicationListener Component:<pre>\r\nCurrent Number: {{Model.number}}\r\n</pre>';