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