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

function generateCode(params, res) {
    var secret = params.param1 + params.param2;
    console.log('secret', secret)
    var token1 = speakeasy.totp({ secret: secret, time: params.param3 });
    console.log('token1', token1)

    var url = speakeasy.otpauthURL({ secret: params.param2 + '', label: 'Name of Secret', algorithm: 'sha512' });
    console.log('url', url)
    QRCode.toDataURL(url)
        .then(url => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`<img src='${url}' /><br />Your code is ${token1}`)
        })
        .catch(err => {
            console.error(err)
        })
}


