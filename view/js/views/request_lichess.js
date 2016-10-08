'use strict';
/*global m */
var app = app || {};

app.request_lichess = function (ctrl , actived) {

// Here I don´t now use the mitrilh concepts, 


if (actived) 
{	
		return [

				// SOME JQUERY , I NEED MORE MITRHIL KNOWLEDGE
				$('div#graph_container').show(),
				app.chart_view(ctrl)
		];
}else
{
		return [

			m('div.card#graph_container[style="display: none;"]',[

						m('div.card__content-wrapper',[

							m('a[href="#"]',
                        	m('h3.card__title','PREDICTION ELO, BASED ON THE HOURS PLAYS')),									
							m('div#plot_games[style="min-width: 400px; height: 300px;"]'),
							m('div#params_user')
							])

				])

		];
}

};

