'use strict';
var app = app || {};

(function () {

    app.chart_view = function(ctrl) {


    var data = ctrl.compute_chart();


    // this is a error using parameter I do not how use mitrhil for render parameter to id div

        $('#params_user').empty()
        $('#params_user').append('<p class="card__description"> Glicko Elo: '+parseInt(ctrl.parameters.last_rating)+' | Hours played: '+parseInt(ctrl.parameters.hours)+'</p>');
    
    // 


    $('#plot_games').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 50,
            y: 10,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
           categories: data.x_values,
           title: {
            text: 'Hours'
        },
  plotLines: [{
    color: 'red', // Color value
    dashStyle: 'longdashdot', // Style of the plot line. Default to solid
    value: parseInt(data.from / 10), // Value of where the line will appear
    width: 2, // Width of the line  
  }]
    },
    yAxis: {
        title: {
            text: 'Rating'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' ELO'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'Projection',
        data: data.y_values
    }
    ]
});

       return [];
   }

})();
