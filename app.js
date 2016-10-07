var app = function()
{
	var path = require('path');
	var express = require('express');
	var Client = require('node-rest-client').Client;
 

	/* BUIDING APP*/
	var app = express();
	app.set('port', process.env.PORT || 80);
    
    /* BUILDING CLIENT */
    var client = new Client();
	var args = {headers: { "Accept": "application/vnd.lichess.v2+json" }};

	/* BUILDING ENVIROMENT OF STATICS FILES*/
	app.use(express.static(path.join(__dirname, '/view')));

	/* BUIDING HTTP RESPONSES */
		// - INDEX GET 
	app.get('/', function (req, res) {
		res.sendFile('index.html', {root: __dirname + '/view/'})
	});
		// - GET CRITIALS PARAMATERS  
	app.get('/userPref', function (req, res) {

		if(req.query.user)
		{
                var url = "https://en.lichess.org/@/"+req.query.user+"/perf/"+req.query.category;
		}
		else
		{
			res.send({error: "Resource not found"})
		}

		client.get(url, args, function (data, response) {
	 		

	 		if (data.error)
	 		{
	 			res.send(data);			
	 		}
	 		else
	 		{	
	 				if(data.stat.lowest)
	 				{
	 					res.send({
						user : data.user.name, 
						perfType: data.stat.perfType.name,
						last_rating : data.perf.glicko.rating,
						lowest_rating: data.stat.lowest.int,
						hours: data.stat.count.seconds / 3600 ,
						k : computeEquation(data.perf.glicko.rating , data.stat.lowest.int ,data.stat.count.seconds)
						});
	 				}
	 				else
	 				{
	 					res.send({error: "Parameters missings"})
	 				}

	 					
	 		}
			
		});

	});


	function computeEquation(rating_actual, rating_low , seconds_played)
	{	
		// MODEL APLY         [  dL/dt  = K(Lmax - L)  solved mode is equal  L(t) = Lmax - ( Lmax -  M)*exp^(-k*t) ]
		/*   SEKING K */	
		max_rating = 2900 ; // This is the maximun socore in chess never ever can is over this in the real world 
		k = - (Math.log((rating_actual - max_rating) / -(max_rating - rating_low)) / (seconds_played/3600)) // Compute K 
		
		return k;
	}




	/* FUNCTIONS OF HTTP ERROS*/
	app.use(function (err, req, res, next) {
			console.log(err.stack);	res.status(500).send({message: err.message});
	});
	
	 return app;

}();


module.exports = app;

