var express = require('express');
var moment = require('moment');
var QRCode = require('qrcode');
var QRCodeReader = require('qrcode-reader');

var app = express();
app.set(eventId, '123456789');
app.set(userId, '987654321');
app.set(time, moment().unix());
app.set(url,'');
app.set(decoded,'');

function generateQRCode(){
    const hash = app.settings.userId
    QRCode.toDataURL(hash)
        .then(url => {
            this.updateURL(url)
            this.updateDecode(url)
        })
};

function updateURL(url){
    app.settings.url = url;
};

function updateDecode(url){
    var qr = new QRCodeReader()
    const decoded = qr.decode(url)
    app.settings.decoded = decoded;

};

app.get('/', function (req, res) {
    res.send('hello world')
  })

app.listen(3000);


