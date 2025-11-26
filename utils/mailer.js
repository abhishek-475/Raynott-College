const nodemailer = require('nodemailer');

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  console.warn('EMAIL_USER / EMAIL_PASS not set — mailer disabled');
}

exports.sendMail = async ({ to, subject, text, html }) => {
  if (!transporter) return Promise.reject(new Error('Mailer not configured'));
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });
};
