// Tell our script-loader about the location of the text-loading plugin
require.config({
	paths: {
		text: 'bower_components/requirejs-text/text'
	}
});

// Bootstrapping of application with config file comes from 'philippd' courtesy of 
// http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data

// define the module of the bootstrap app
var bootstrapModule = angular.module('bootstrapModule', []);

// the bootstrapper service loads the config and bootstraps the specified app
bootstrapModule.factory('bootstrapper', function ($http, $log, $q) {
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
					$log.warn('Could not initialize application, configuration could not be loaded.');
					deferred.reject();
				});
			
			return deferred.promise;
		}
	};
});

// create a div which is used as the root of the bootstrap app
var appContainer = document.createElement('div');

// in run() function you can now use the bootstrapper service and shutdown the bootstrapping app after initialization of your actual app
bootstrapModule.run(function (bootstrapper) {

	bootstrapper.bootstrap('Framework').then(function () {
		// removing the container will destroy the bootstrap app
		appContainer.remove();
	});

});

// make sure the DOM is fully loaded before bootstrapping.
angular.element(document).ready(function() {
	angular.bootstrap(appContainer, ['bootstrapModule']);
});