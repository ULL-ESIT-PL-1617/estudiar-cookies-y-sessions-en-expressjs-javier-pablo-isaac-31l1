var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8081));

app.use(express.static('_book/'));

var server = app.listen(app.get('port'), function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Escuchando en  http://%s:%s', host, port)
});
