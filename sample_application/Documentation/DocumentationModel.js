var DocumentationModel = function(){
	
	// EscapedJS generated with JSONLint.com and freeformatter.com/javascript-escape.html
	
	var escapedJS = {
		emptyConfigJSON: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"\",\r\n        \"properties\": {\r\n            \"jsPaths\": {},\r\n            \"templatePaths\": {}\r\n        },\r\n        \"components\": {},\r\n        \"views\": {},\r\n        \"services\": {\r\n            \"existing\": {},\r\n            \"generating\": {}\r\n        }\r\n    }\r\n}',
		configDefaultViewExample: '{\r\n    \"applicationConfig\": {\r\n        \"defaultView\": \"ViewName\",\r\n        \"views\": {\r\n            \"ViewName\": {\r\n                \"url\": \"ViewURL\",\r\n                \"template\": \"ViewTemplateProperty\"\r\n            }\r\n        }\r\n    }\r\n}',
		configPropertiesExample: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"jsPaths\": {\r\n                \"DocumentationController\": \"sample_application\/Documentation\/Documentation.js\"\r\n            },\r\n            \"templatePaths\": {\r\n                \"DocumentationTemplate\": \"sample_application\/Documentation\/Documentation.html\"\r\n            }\r\n        }\r\n    }\r\n}',
		configComponentsExample: '{\r\n    \"applicationConfig\": {\r\n        \"components\": {\r\n            \"Header\": {\r\n                \"template\": \"HeaderTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsSimpleExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"LandingPage\": {\r\n                \"url\": \"LandingPage\",\r\n                \"template\": \"LandingPageTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		configViewsNestedExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"NestedView\": {\r\n                \"url\": \"NestedView\",\r\n                \"template\": \"NestedViewTemplate\",\r\n                \"model\": \"NestedViewModel\",\r\n                \"modelbuilder\": \"NestedViewModelbuilder\",\r\n                \"actions\": \"NestedViewActions\",\r\n                \"controller\": \"NestedViewController\",\r\n                \"subroutes\": [\r\n                    \"NestedViewChild1\",\r\n                    \"NestedViewChild2\"\r\n                ]\r\n            },\r\n            \"NestedViewChild1\": {\r\n                \"controller\": \"NestedViewChild1Controller\",\r\n                \"template\": \"NestedViewChild1Template\"\r\n            },\r\n            \"NestedViewChild2\": {\r\n                \"controller\": \"NestedViewChild2Controller\",\r\n                \"template\": \"NestedViewChild2Template\"\r\n            }\r\n        }\r\n    }\r\n}',
		configServicesExample: '{\r\n    \"applicationConfig\": {\r\n        \"services\": {\r\n            \"existing\": {\r\n                \"ExampleService\": \"path\/to\/ExistingService.js\"\r\n            },\r\n            \"generating\": {\r\n                \"ApplicationMessages\": {\r\n                    \"Header\": {\r\n                        \"primaryText\": \"Header Primary Text\",\r\n                        \"secondaryText\": \"header secondary text\"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}',
		appContentStaticExample: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"NewView\": {\r\n                \"url\": \"NewView\",\r\n                \"template\": \"NewViewTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		appContentStaticExample2: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"jsPaths\": {},\r\n            \"templatePaths\": {\r\n                \"NewViewTemplate\": \"path\/to\/NewHTMLPage.html\"\r\n            }\r\n        },\r\n        \"views\": {\r\n            \"NewView\": {\r\n                \"url\": \"NewView\",\r\n                \"template\": \"NewViewTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		appContentDynamicExample: 'var NewViewName = function(Context){\n\tContext.model = {};\n\tContext.actions = {};\n};',
		appContentDynamicExample2: '{\r\n    \"applicationConfig\": {\r\n        \"views\": {\r\n            \"NewView\": {\r\n                \"url\": \"NewView\",\r\n                \"controller\": \"NewViewController\",\r\n                \"template\": \"NewViewTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		appContentDynamicExampleFull: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"jsPaths\": {\r\n                \"NewViewController\": \"path\/to\/NewPageController.js\"\r\n            },\r\n            \"templatePaths\": {\r\n                \"NewViewTemplate\": \"path\/to\/NewHTMLPage.html\"\r\n            }\r\n        },\r\n        \"views\": {\r\n            \"NewViewName\": {\r\n                \"url\": \"NewView\",\r\n                \"controller\": \"NewViewController\",\r\n                \"template\": \"NewViewTemplate\"\r\n            }\r\n        }\r\n    }\r\n}',
		componentExample: '{\r\n    \"applicationConfig\": {\r\n        \"properties\": {\r\n            \"jsPaths\": {\r\n                \"HeaderController\": \"path\/to\/Header.js\"\r\n            },\r\n            \"templatePaths\": {\r\n                \"HeaderTemplate\": \"path\/to\/Header.html\"\r\n            }\r\n        },\r\n        \"components\": {\r\n            \"Header\": {\r\n                \"template\": \"HeaderTemplate\",\r\n                \"model\": \"HeaderModel\",\r\n                \"modelbuilder\": \"HeaderModelbuilder\",\r\n                \"actions\": \"HeaderActions\",\r\n                \"controller\": \"HeaderController\"\r\n            }\r\n        }\r\n    }\r\n}',
		generatingServicesExample: '{\r\n    \"applicationConfig\": {\r\n        \"services\": {\r\n            \"existing\": {},\r\n            \"generating\": {\r\n                \"StaticServiceName\": {\r\n                    \"Header\": {\r\n                        \"primaryText\": \"Header Primary Text\",\r\n                        \"secondaryText\": \"header secondary text\"\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}',
		existingServicesExample: '{\r\n    \"applicationConfig\": {\r\n        \"services\": {\r\n            \"existing\": {\r\n                \"DynamicServiceName\": \"path\/to\/ExistingService.js\"\r\n            },\r\n            \"generating\": {}\r\n        }\r\n    }\r\n}',
		serviceUsageExample: 'var ViewName = function(Context, StaticServiceName, DynamicServiceName){\n\tContext.model = {\n\t\tprimaryText: StaticServiceName.Header.primaryText,\n\t\tsecondaryText: StaticServiceName.Header.secondaryText\n\t};\n\tContext.actions = {\n\t\tsubmit: function(){\n\t\t\tDynamicServiceName.submitData();\n\t\t}\n\t};\n};',
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
								content: '\'properties\' contains all the file-paths in the application. JavaScript paths go in \'jspaths\' and template paths go in \'templatePaths\'.'
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
								content: '\'services\' are application-specific functionality that may be shared between one or more views. They can be created from static data in the config.json file, or loaded from a JavaScript file:'
							},
							{
								code: escapedJS.configServicesExample
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
								content: 'To create a static HTML page in your application, begin by creating an HTML file in your project folder.'
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
								content: 'Next, add the HTML file to the \'properties\' \'templatePath\':'
							},
							{
								code: escapedJS.appContentStaticExample2
							},
							{
								content: 'Now the page is available if you navigate to #/NewView'
							}
						]
					},
					{
						title: 'Dynamic Page',
						steps: [
							{
								content: 'To create a dynamic HTML page in your application, begin by creating new HTML and JS files in your project folder.'
							},
							{
								code: '<h3>New HTML Page!</h3>'
							},
							{
								code: escapedJS.appContentDynamicExample
							},
							{
								content: 'Create a new \'view\' in your config.json.    NOTE: The name of the JS function must exactly match the key in the config.json \'views\' object!'
							},
							{
								code: escapedJS.appContentDynamicExample2
							},
							{
								content: 'Next, add the HTML file to the \'properties\' \'templatePath\':'
							},
							{
								code: escapedJS.appContentDynamicExampleFull
							},
							{
								content: 'Now the page is available if you navigate to #/NewViewName.'
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
								code: '<div Header></div>'
							}
						]
					}
				]
			},
			{
				title: 'Creating Application Services',
				subSections: [
					{
						title: 'Static-Data Service',
						steps: [
							{
								content: 'To create a service that provides static data, create a new property within the config.json file \'generating\' services section:'
							},
							{
								code: escapedJS.generatingServicesExample
							}
						]
					},
					{
						title: 'Complex Service',
						steps: [
							{
								content: 'To create a service that provides complex data, include the service\'s JavaScript file like this:'
							},
							{
								code: escapedJS.existingServicesExample
							}
						]
					},
					{
						title: 'Using Services',
						steps: [
							{
								content: 'To use a service that has been declared in the application config.json file, include it as a parameter in your controller JavaScript:'
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