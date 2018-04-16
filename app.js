const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())

app.use((err, req, res, next) => next());

app.use('/web', express.static(__dirname + '/client'));

const key = JSON.parse(fs.readFileSync('./.key', 'utf8'));
require('./rpc')(app, key);

app.listen(4000, () => {
	console.log('Express server listening on port 4000');
});