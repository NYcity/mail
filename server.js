const express = require('express');
// const https = require('https');
// const fs = require('fs');
const nodemailer = require('nodemailer');
const { IncomingWebhook } = require('@slack/webhook');

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
const json1 = {
    host: process.env.DOMAIN,
    port: process.env.PORT,
    secureConnection: process.env.SECURE, // use SSL
    auth: {
        user: process.env.MAILFROM,
        pass: process.env.MAILFROM_PASSWORD
    }
}
console.log(json1)
const transporter = nodemailer.createTransport({
    host: process.env.DOMAIN,
    port: process.env.PORT,
    secureConnection: process.env.SECURE, // use SSL
    auth: {
        user: process.env.MAILFROM,
        pass: process.env.MAILFROM_PASSWORD
    }
});

app.get('/', (req, res) => {


    // Read a url from the environment variables
    const url = process.env.SLACK_WEBHOOK_URL;

    // Initialize
    const webhook = new IncomingWebhook(url);
    // Send the notification
    (async () => {
        await webhook.send({
            text: 'I\'ve got news for you...',
        });
    })();

    res.send('Hello, world!');
});

// Endpoint to send email
app.get('/sendmail', (req, res) => {
    const mailOptions = {
        from: process.env.MAILFROM,
        to: process.env.MAILTO,
        subject: '자료 협조 요청의 건',
        text: '1. 귀 사(교)의 무궁한 발전을 기원합니다.  2. 우리 협회에서는 화장품관련 기관의 현황을 파악하여 국내․외 바이어 등과의 교류 활성화를 통한 국내 화장품 수출증진에 도움을 드리고자, 각 기관의 정보를 취합하여 2002년부터 매년 화장품관련 디렉토리를 발행하고 있습니다. 3. 이에 금년에도 『2014 화장품관련 디렉토리』(국문/영문)를 발행하고자 하며, 이를 위한 자료 협조를 요청드리오니 2013년 11월 22일(금)까지 아래의 작성 방법을 참고하시어 우리 협회 홈페이지를 통해 작성하여 주시기 바랍니다. 4. 본 디렉토리 수재 신청은 무료이며, 자료를 제출하여 주신 기관을 대상으로 추후 발행된 책자를 무료로 송부해 드릴 예정입니다. 또한 디렉토리 영문판은 해외 바이어에게 배포될 예정이오니 영문도 함께 제출하여 주시기 바랍니다.'
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