'use strict';

var app = app || {};

(function () {
    

   app.controller = function(item) {

       this.data_user = null;
       this.username = m.prop('');        // Temp title placeholder
       this.category = m.prop('bullet');
       this.parameters = {};
        

        this.call_api = function(username,category) {
            if(this.username()) { 
            	this.data_user = new app.get_datailsAccount({ username : username() , category: category });             	
            }
        }


        this.select = function(args, extras) {
          
             return {  options: args.options,   select: args.change,  className: args.className   }

        }

        this.compute_chart = function()
        {

          this.parameters = this.data_user.toJSON();
          var x = [];
          var y = [];

          var max_rating = 2900;
          var limithour = this.parameters.hours + 300; // 

            for (var i = 0; i<= limithour; i+=10) 
            {        

                    var computed_equation = max_rating - (max_rating  - this.parameters.lowest_rating) * Math.exp(-this.parameters.k * i);
                    
                    x.push(i);
                    y.push(parseInt(computed_equation));
            }

            return {x_values: x,y_values: y, from: parseInt(this.parameters.hours)};
        }
        
            
    };

    
})();