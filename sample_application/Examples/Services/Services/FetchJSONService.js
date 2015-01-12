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