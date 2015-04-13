var ValidationController = function(Context, Actions, Modelbuilder, SchemaValidation){
    Context.Actions = Actions;
    Context.Model = new Modelbuilder();
    
    SchemaValidation.loadSchema('sample_application/assets/data/CustomerSchema.json');
};

var ValidationModel = function(){
    return {
        usernameRegex: /^[a-zA-Z0-9]{8,20}$/,
        passwordRegex: /^[a-zA-Z0-9]{8,20}$/,
        
        calendarPopupVisible: false
    };
};

var ValidationModelbuilder = function(Model){
    return function(options){
        if( options ){
            if( options.toggleCalendar !== undefined ){
                Model.calendarPopupVisible = !Model.calendarPopupVisible;   
            }
        }
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