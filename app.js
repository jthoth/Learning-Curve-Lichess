var app = function()
{
	var path = require('path');
	var express = require('express');

	var app = express();
	app.set('port', process.env.PORT || 80);


	app.use(express.static(path.join(__dirname, '/view')));
	
	app.get('/', function (req, res) {
		res.sendFile('index.html', {root: __dirname + '/view/'})
	});

	app.use(function (err, req, res, next) {
	console.log(err.stack);	res.status(500).send({message: err.message});
	});
	
	 return app;

}();


module.exports = app;

