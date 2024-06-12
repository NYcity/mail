const express = require('express');
// const https = require('https');
// const fs = require('fs');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
// npm i express https fs nodemailer cors dotenv
const app = express();
app.use(cors());
app.use(express.json());

// MAILFROM=robert@cocomarket.app
// MAILFROM_PASSWORD=@1q2w3e4r5T
// MAILTO=mossei@nate.com
// SUBJECT=Test
// BODY=Test324234321432
// DOMAIN = cocomarket.app

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.DOMAIN,
    port: process.env.PORT,
    secure: process.env.SECURE, // use SSL
    auth: {
        user: process.env.MAILFROM,
        pass: process.env.MAILFROM_PASSWORD
    }
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Endpoint to send email
app.get('/sendmail', (req, res) => {
    const mailOptions = {
        from: process.env.MAILFROM,
        to: process.env.MAILTO,
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
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
// // HTTPS options
// const httpsOptions = {
//     cert: fs.readFileSync('/etc/letsencrypt/live/cocomarket.app/fullchain.pem'),
//     key: fs.readFileSync('/etc/letsencrypt/live/cocomarket.app/privkey.pem')
// };

// // Start server
// https.createServer(httpsOptions, app).listen(443, () => {
//     console.log('Server running on port 443');
// });