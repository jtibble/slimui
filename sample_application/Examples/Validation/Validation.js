var ValidationController = function(Context, Actions, Modelbuilder, PropertyValidation){
    Context.Actions = Actions;
    Context.Model = new Modelbuilder();
    
    PropertyValidation.addPropertyValidation('testRequired', 'required', true);
    PropertyValidation.addPropertyValidation('testLength', 'length', 17);
    PropertyValidation.addPropertyValidation('testMin', 'min', 100);
    PropertyValidation.addPropertyValidation('testMax', 'max', 100);
    PropertyValidation.addPropertyValidation('testRegex', 'regex', /^\d\d\d-\d\d-\d\d\d\d$/);
};

var ValidationModel = function(){
    return {
        usernameRegex: /^[a-zA-Z0-9]{8,20}$/,
        passwordRegex: /^[a-zA-Z0-9]{8,20}$/,
        
        lengthProperty: 'Must be length 17',
        requiredProperty: 'This must be filled-in',
        minProperty: 100,
        maxProperty: 100,
        regexProperty: '123-45-6789'
    };
};

var ValidationModelbuilder = function(Model){
    return function(options){
        return Model;
    };
};

var ValidationActions = function(){
    return {};
};