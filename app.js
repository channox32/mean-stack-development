var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var PORT = 3000;
var pJson = require('./package.json');
var md5 = require('crypto-md5');
var passport = require('passport');

/*Load default html page*/
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
mongo.connect('mongodb://localhost/todo');

/*Require Models*/
require('./apiv1/model/UserModel')(mongo);

/*Require all Routes*/
require('./apiv1/controller/User')(app,md5,passport);

app.listen(PORT);
console.log('---------------------------------------');
console.log(pJson.name);
console.log("Current Version : " + pJson.version);
console.log("Contributor : " + pJson.author);
console.log('---------------------------------------');
console.log("Server running on port " + PORT);

