const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

let transport = {};

switch (process.env.NODE_ENV) {
  case 'testing':
    // Mock
    transport = {
      inbox: [],
      sendMail: function(msg) {
        this.inbox.unshift(msg);
      },
      getLastMessage: function() {
        return this.inbox[0];
      }
    }
    break;
  case 'production':
    // Sendgrid
    transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
      })
    );
    break;
  default:
    // MailHog at localhost
    transport = nodemailer.createTransport({
      host: process.env.MAILHOG_HOST,
      port: process.env.MAILHOG_SMTP_PORT,
      secure: false,
      auth: null
    });
    break;
}

let mailer = {

  send: async (email) => {
    let templatesPath = path.join(__dirname, '..', 'e-mails', email.locale);
    let templateJson = `${templatesPath}/${email.template}.json`;
    let templateHtml = `${templatesPath}/${email.template}.ejs`;
    let templateText = `${templatesPath}/${email.template}.txt`;
    let rawJsonData = fs.readFileSync(templateJson);
    let jsonData = JSON.parse(rawJsonData);
    let msg = {
      from: email.from,
      to: email.to,
      subject: jsonData.subject,
    };
    msg.html = await ejs.renderFile(templateHtml, email.params, { async:true });
    msg.text = await ejs.renderFile(templateText, email.params, { async:true });
    return await transport.sendMail(msg);
  },

  getTransport: () => {
    return transport;
  }

}

module.exports = mailer;
