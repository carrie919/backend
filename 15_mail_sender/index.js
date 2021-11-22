const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'harshasunandh919@gmail.com',
        pass: 'seagulseagul'
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

const message = {
    from: 'harshasunandh919@gmail.com',
    to: 'sunandh1112@gmail.com',
    subject: 'test mail 2',
    html: '<h1>hey man how you doing</h1>',
    Text: 'fu man what were you doing'
}

transport.sendMail(message, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data);
    }
});