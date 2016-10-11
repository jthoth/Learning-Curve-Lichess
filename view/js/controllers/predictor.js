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


      this.storage_data = function()
        {
          this.parameters = this.data_user.toJSON();
          return  this.parameters;
        }

      this.compute_winProbability = function()
      {
        var x = [];
        var y = [];

        var your_rating = this.parameters.last_rating;

        var _from = 800;
        var _end = 2900;

        for(var i = _from ; i<= _end; i+=10)
        {
            /*            EQUATION   wp = 1 / (1 + 10) ^ (-delta/ 400)       ; delta= Elo1 - Elo2       | thi is a easy model.     */
             var delta = your_rating - i;
             var computed_equation = (1 / (1 + Math.pow(10,-delta / 400))) * 100;
              x.push(i);
              y.push(computed_equation);
        }

        return {x_values: x,y_values: y, ranting:your_rating};

      }

       this.compute_chart = function()
        {
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
