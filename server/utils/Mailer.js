const sgMail = require('@sendgrid/mail');

class Mailer {
    constructor() {
        this.initialize();
    }

    initialize() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    sendMail(message) {
        sgMail.send(message);
    }
}

const mailer = new Mailer();
module.exports = mailer;