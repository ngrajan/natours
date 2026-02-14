const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Gokulrajan <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // use sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  send(template, subject) {
    return 1;
  }

  sendWelcome() {
    this.send();
  }
};

const sendEmail = async (options) => {
  // 1) create a transporter

  // 2) Create email options
  const mailOptions = {
    from: 'Gokulrajan <gokulrajan@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
