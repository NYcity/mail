const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
    key: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/fullchain.pem'),
    cert: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/privkey.pem')
};

const app = express();

// Default route for server status
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
});

// Create an HTTP server.
http.createServer(app).listen(HTTP_PORT);

// Create an HTTPS server.
https.createServer(options, app).listen(HTTPS_PORT);