var path = require('path');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 80);
app.use(express.static(path.join(__dirname, '/app')));


app.get('/', function (req, res) {
	res.sendFile('index.html', {root: __dirname + '/app/'})
});

app.use(function (err, req, res, next) {
	console.log(err.stack);
	res.status(500).send({message: err.message});
});

console.log('Server has started on port: '+ app.get('port'));
app.listen(app.get('port'));