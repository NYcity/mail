const express = require('express');
const nodemailer = require('nodemailer');
const https = require('https');
const fs = require('fs');

const HTTPS_PORT = 3000;
https.createServer(options, app).listen(HTTPS_PORT);

let options;

const app = express();
// const port = 3000;

// 보내는 사람 이메일 설정
const fromEmail = 'robert@cocomarket.app';
// 보내는 사람 비밀번호
const password = '@1q2w3e4r5T';

// 수신자 이메일 설정
const toEmail = 'mossei@nate.com';

// 이메일 전송에 사용될 transporter 생성
const transporter = nodemailer.createTransport({
    service: 'cocomarket.app',
    auth: {
        user: fromEmail,
        pass: password
    }
});

// POST 요청을 처리하는 엔드포인트 설정
app.use(express.json());

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

options = {
    key: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/fullchain.pem'),
    cert: fs.readFileSync('/www/server/panel/plugin/mail_sys/cert/cocomarket.app/privkey.pem')
};
https.createServer(options, app).listen(HTTPS_PORT);
// 서버 시작
// app.listen(port, () => {
//     console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
// });
