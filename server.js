const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express()
app.use(express.json());
const fromEmail = 'robert@cocomarket.app';
const password = '@1q2w3e4r5T';
const toEmail = 'mossei@nate.com';
const transporter = nodemailer.createTransport({
    service: 'cocomarket.app',
    auth: {
        user: fromEmail,
        pass: password
    }
});
app.post('/sendmail', (req, res) => {
    const { subject, text } = req.body;

    // 이메일 옵션 설정
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: text
    };

    // 이메일 전송
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('이메일 전송 오류:', error);
            res.status(500).send('이메일 전송 실패');
        } else {
            console.log('이메일이 성공적으로 전송되었습니다:', info.response);
            res.send('이메일이 성공적으로 전송되었습니다');
        }
    });
});

const options = {
    cert: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/fullchain.pem'),
    key: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/privkey.pem')
};

https.createServer(options, app).listen(443);





