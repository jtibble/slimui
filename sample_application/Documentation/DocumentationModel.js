var DocumentationModel = function(){
	
	// EscapedJS generated with JSONLint.com and freeformatter.com/javascript-escape.html
	
	var escapedJS = {
		emptyConfigJSON: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"\",\r\n        \"properties\": {\r\n            \"rootPaths\": {\r\n                \"default\": \"\"\r\n            },\r\n            \"paths\": {\r\n            }\r\n        },\r\n        \"components\": {\r\n        },\r\n        \"views\": {\r\n        },\r\n        \"services\": {\r\n            \"existing\": {},\r\n            \"generating\": {}\r\n        }\r\n    }\r\n}',
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
								content: 'To link to another page, put the whole route in your hyperlink tag. Links with href="#" will not work correctly.'
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