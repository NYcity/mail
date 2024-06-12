const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express()

const options = {
    cert: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/fullchain.pem'),
    key: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/privkey.pem')
};

https.createServer(options, app).listen(443);