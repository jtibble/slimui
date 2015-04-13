var framework = angular.module('Framework.Services', []);


/**
 * @name Router
 */
framework.provider('Router', function(){
	var strings = {
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
				},
                getStateParameters: function(){
                    return $state.params;   
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
					
					console.log('ControllerCommunication Error: no channel \'' + channel + '\' existing to return data');
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
 * As of SlimUI v0.0.21, sendRequest() returns the $http promise to the caller
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
					
					return $http( request ).success( successCallback ).error( errorCallback );
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
                        console.log('Can\'t return promise: deferred not created correctly');
                        return false;
                    }
                },
                resolveDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].resolve ){
                        this.promisesStorage[name].resolve( value );
                        return true;
                    } else {
                        console.log('Can\'t resolve: deferred not created correctly');
                        return false;
                    }
                },
                rejectDeferred: function(name, value){
                    if( this.promisesStorage[name] && this.promisesStorage[name].reject ){
                        this.promisesStorage[name].reject( value );
                        return true;
                    } else {
                        console.log('Can\'t reject: deferred not created correctly');
                        return false;
                    }
                }
            };
        }]
    };
});

framework.provider('PropertyValidation', function(){
    
    validationMappings = {};
    
    return {
        $get: function(){
            return {
                validationTypes: {
                    required: 'Validates that an input has (or does not have) a value set',
                    length: 'Validates that an input\'s length is a precise number of characters',
                    min: 'Validates that an input\'s value is greater than a certain value',
                    max: 'Validates that an input\'s value is less than a certain value',
                    regex: 'Validates that an input conforms to a particular structure',
                    script: 'Validates properties with respect to each other',
                    type: 'Validates that the property is the correct type (int, string, etc)'
                },
                getPropertyValidationTypes: function(){
                    return this.validationTypes;
                },
                
                addPropertyValidation: function(propertyName, validationType, validationValue){
                    if( this.validationTypes[validationType] === undefined ){
                        console.log('Cannot add unknown validation type \'' + validationType + '\'');
                        return false;
                    }
                    
                    if( !validationMappings[propertyName] ){
                        validationMappings[propertyName] = [];
                    }
                    
                    validationMappings[propertyName].push({validationType: validationType, validationValue: validationValue});
                },
                
                getPropertyValidationRules: function(propertyName){
                    if( !validationMappings[propertyName] ){
                        return [];
                    } else {
                        return validationMappings[propertyName];
                    }
                }
            };
        }
    };
});

framework.provider('SchemaValidation', function(){
    return {
        $get: ['$http', 'PropertyValidation', function($http, PropertyValidation){
            return {
                loadSchema: function( schemaJSONPath ){
                    $http.get(schemaJSONPath).success(function(schema){
                        var schemaName = schema.schemaName;
                        
                        for( var propertyName in schema.properties ){
                            var validationMapping = schema.properties[ propertyName ];
                            
                            for( var rule in validationMapping ){
                                var value = validationMapping[rule];
                                PropertyValidation.addPropertyValidation(propertyName, rule, value);
                            }
                        }
                        
                    }).error( function(){
                        console.error('Cannot fetch schema \'' + schemaJSONPath + '\''); 
                    });
                }
            };
        }]
    };
});

framework.directive('slimuivalidate', ['PropertyValidation', function(PropertyValidation){
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elm, attrs, ngModel){
            if (!ngModel) return;
            ngModel.$validators.propertyValidation = function(modelValue, viewValue){
                
                var propertyName = attrs.slimuivalidate;
                var validationRules = PropertyValidation.getPropertyValidationRules( propertyName );
                
                var test = {
                    required: function(requiredFlag){
                        if( !requiredFlag || requiredFlag && viewValue.toString().length > 0 ){
                            return true;
                        } else {
                            return false;
                        }
                    },
                    length: function(requiredLength){
                        if( viewValue.toString().length === requiredLength ){
                            return true;
                        } else {
                            return false;
                        }
                    },
                    min: function(requiredMin){
                        return viewValue >= requiredMin ? true : false;
                    },
                    max: function(requiredMax){
                        return viewValue <= requiredMax ? true : false;
                    },
                    regex: function(requiredRegex){
                        if( typeof(requiredRegex) === 'string'){
                            requiredRegex = new RegExp(requiredRegex);   
                        }
                        return requiredRegex.test(viewValue);
                    },
                    script: function(script){
                        script = 'window.validationScript = function(){ return ' + script + '; }';
                        
                        var validationStatus;
                        try{
                            eval(script);
                            validationStatus = angular.bind( viewValue, window.validationScript)();
                        } catch( e ){
                            console.error('failed to evaluate script or check validation status'); 
                        }
                        
                        return validationStatus;
                    },
                    type: function(requiredType){
                    
                        switch(requiredType){
                            case 'date':
                                var nanDate = isNaN( new Date(viewValue) );
                                var invalidDate = (new Date(viewValue)) === 'Invalid Date';
                                
                                return (nanDate || invalidDate) ? false : true;
                            case 'number':
                                return !isNaN( Number.parseFloat(viewValue) );
                            case 'int': 
                                var isValidNumber = !isNaN(Number.parseInt(viewValue));
                                var isInt = Number.parseInt(viewValue) === Number.parseFloat(viewValue);
                                return isValidNumber && isInt;
                            case 'string': 
                                return typeof(viewValue) === 'string';
                            default:
                                console.log('could not check type of value');
                                return false;
                        }
                        
                    }
                };
                
                for( var i in validationRules ){
                    var rule = validationRules[i];
                    var validationType = rule.validationType;
                    var validationValue = rule.validationValue;
                    
                    var validationSuccess;
                    
                    if( !test[validationType] ){
                        throw 'Cannot validate unknown validation rule type \'' + validationType + '\'!';
                    }
                    
                    validationSuccess = test[validationType](validationValue);
                    ngModel.$setValidity(validationType, validationSuccess);
                    
                    if( !validationSuccess ){
                        
                        return false;
                    }
                }
                
            };
        }
    };
}]);




























