const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    host: config.get("mailServer.back.host"),
    port: config.get("mailServer.back.port"),
    secure: config.get("mailServer.back.secure"),
    auth: {
        user: config.get('mailServer.login'),
        pass: config.get('mailServer.password')
    },
}, {
    from: `${config.get("mailServer.content.from")} <${config.get('mailServer.login')}>`
});

function mailer(message) {
    transporter.sendMail(message, (err, info) => {
        if (err) {
            return;
        }
        return;
    })
}

module.exports = mailer;