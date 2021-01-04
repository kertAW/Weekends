const jwt = require('jsonwebtoken');
const config = require('config');
const mailer = require('../modules/nodemailer');

function confirmViaEmail({ email, middleUrl = '/api', subject = 'Заголовок', html = '<p>Содержание</p>', expiresIn = '1h', act, etcSend }) {
    const date = new Date();

    const toSend = {
        "email": email,
        "act": act,
        "created": date.toString(),
        "etc": etcSend
    }

    const tokenMailVerification = jwt.sign(toSend, config.get('JWT.email'), { expiresIn: expiresIn });

    const url = `${config.get('mainUrl')}${middleUrl}/verify?id=${tokenMailVerification}`;

    const message = {
        to: email,
        subject: subject,
        html: `${html}

            <a href="${url}">ссылка</a>.
        `
    }

    mailer(message)
}

module.exports = confirmViaEmail;