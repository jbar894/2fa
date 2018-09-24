var express = require('express');
var moment = require('moment');
var QRCode = require('qrcode');
var QRCodeReader = require('qrcode-reader');

var app = express();
var eventId = '123456789';
var userId = '987654321';
var time = moment().unix();
var url = '';
var decoded = '';

function generateQRCode(){
    const hash = userId;
    QRCode.toDataURL(hash)
        .then(url => {
            this.updateURL(url)
            this.updateDecode(url)
        })
};

function updateURL(url){
    this.url = url;
};

function updateDecode(url){
    var qr = new QRCodeReader()
    const decoded = qr.decode(url)
    this.decoded = decoded;
};

app.get('/', function (req, res) {
    res.sendfile(__dirname + "/index.html");
  });

app.post('/generate', function (req, res) {
    res.send(eventId);
  
})

app.listen(3000);


