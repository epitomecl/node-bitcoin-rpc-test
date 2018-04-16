const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())

app.use((err, req, res, next) => next());

app.use('/web', express.static(__dirname + '/client'));
app.get('/web/*', (req, res) => {
	const options = {
		root: __dirname + '/client',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
		};
	res.sendFile("index.html", options, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('client web');
		}
	});
});

const key = JSON.parse(fs.readFileSync('./.key', 'utf8'));
require('./rpc')(app, key);

app.listen(5000, () => {
	console.log('Express server listening on port 5000');
});