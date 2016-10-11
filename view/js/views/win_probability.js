'use strict';
var app = app || {};

(function () {

    app.chart_view_winprobability = function(ctrl) {


    var data = ctrl.compute_winProbability();

    // this is a error using parameter I do not how use mitrhil for render parameter to id div

    $('#params_winproba').empty();
    $('#params_winproba').append('<p class="card__description"> Model Equation: delta = Elo1 - Elo 2 ; wp = 1 / (1 + 10^(-delta/400)) </p>');
    //

       // Create the chart
       $('#plot_winporb').highcharts({
         chart: {
             type: 'areaspline'
         },
         title: {
             text: ''
         },
         xAxis: {
            categories: data.x_values,
            title: {
             text: 'Rating'
         },
         plotBands: [{
                        from: 0,
                        to: parseInt((data.ranting-800) / 10),
                        color: 'rgba(96, 171, 137, .2)'
                    },{
                        from: parseInt((data.ranting-800) / 10),
                        to: 290 ,
                        color: 'rgba(255, 40, 40, .2)'
                               }]
     },
     yAxis: {
         title: {
             text: 'Win Probability'
         }
     },        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}%</b><br/>',
            split: true
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
         name: 'Probability',
         data: data.y_values
     }
     ]
 });
       return [];
   }

})();
