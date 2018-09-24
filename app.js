var express = require('express');
var moment = require('moment');
const speakeasy = require('speakeasy');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var eventId = '123456789';
var userId = '987654321';
var time = moment().unix();

var secret = eventId+userId;
var token1 = speakeasy.totp({ secret: secret, time: 1453853945 });

console.log(token1);

app.get('/', function (req, res) {
    res.sendfile(__dirname + "/index.html");
  });

app.post('/generate', function (req, res, next) {
    generateCode(req.body, res);
})

app.listen(3000);

function generateCode(params, res){
    var secret = params.param1 + params.param2;
    var token1 = speakeasy.totp({ secret: secret, time: 1453853945 });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("The code is " + token1);
}


