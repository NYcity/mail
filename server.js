const express = require('express');
const https = require('https');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'cocomarket.app',
    auth: {
        user: 'robert@cocomarket.app',
        pass: '@1q2w3e4r5T'
    }
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Endpoint to send email
app.get('/sendmail', (req, res) => {
    const mailOptions = {
        from: 'robert@cocomarket.app',
        to: 'mossei@nate.com',
        subject: 'Test Email',
        text: 'This is a test email from Node.js using Nodemailer.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// HTTPS options
const httpsOptions = {
    cert: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/fullchain.pem'),
    key: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/privkey.pem')
};

// Start server
https.createServer(httpsOptions, app).listen(443, () => {
    console.log('Server running on port 443');
});