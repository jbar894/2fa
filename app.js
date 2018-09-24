var express = require('express');
var moment = require('moment');
var QRCode = require('qrcode');
var QRCodeReader = require('qrcode-reader');

var app = express();
var eventId = '';
var userId = '';
var time = '';
var url = '';
var decoded = '';

app.set(eventId, '123456789');
app.set(userId, '987654321');
app.set(time, moment().unix());

function generateQRCode(){
    const hash = app.get('userId');
    QRCode.toDataURL(hash)
        .then(url => {
            this.updateURL(url)
            this.updateDecode(url)
        })
};

function updateURL(url){
    app.settings('url', url);
};

function updateDecode(url){
    var qr = new QRCodeReader()
    const decoded = qr.decode(url)
    app.settings('decoded', decoded);

};

app.get('/', function (req, res) {
    res.sendfile(__dirname + "/index.html");
  })

app.listen(3000);


