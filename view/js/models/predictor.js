'use strict';

var app = app || {};

(function () {
	
	app.Predictor = function(data) {

		this.username = m.prop(data.username); 
		this.category = m.prop(data.category);
	};
	

	app.get_datailsAccount = function(attrs) {  	

		return m.request({method: "GET", url: "/userPref" , data:{'user':attrs.username,'category':attrs.category}}).then(function(data) {
			return data;
		});
		
	};


})();