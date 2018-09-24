var express = require('express');
var moment = require('moment');
var QRCode = require('qrcode');
const speakeasy = require('speakeasy');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000);

var eventId = '123456789';
var userId = '987654321';
var time = moment().unix();

app.get('/', function (req, res) {
    res.sendfile(__dirname + "/index.html");
  });

app.post('/generate', function (req, res, next) {
    generateCode(req.body, res);
})


function generateCode(params, res){
    var secret = params.param1 + params.param2;
    var token1 = speakeasy.totp({ secret: secret, time: 1453853945 });
    var url = speakeasy.otpauthURL({ secret: token1.ascii, label: 'Name of Secret', algorithm: 'sha512' });
    
    QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
        console.log(data_url);
        res.end('<img src="' + data_url + '">');
      });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("The code is " + token1);
}


