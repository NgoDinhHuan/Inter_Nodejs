const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_MAILER_CLIENT_ID = '255710131288-2mq5l3abnqcfvesgrunrr98algkk96fd.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04l_wnTFW0pBnCgYIARAAGAQSNgF-L9IrxEnA7CEu8MqWQx62O8IuVMXIU64uO4I15bxrRaEOo9wdqBg4r_k5tD2o5ywZXIqxEg';
const ADMIN_EMAIL_ADDRESS = 'ngodinhhuan0799@gmail.com';

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendEmail = async (toEmail, subject, content) => {
  const myAccessTokenObject = await myOAuth2Client.getAccessToken();
  const myAccessToken = myAccessTokenObject?.token;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken,
    },
  });

  const mailOptions = {
    to: toEmail,
    subject: subject,
    html: `<h3>${content}</h3>`,
  };

  await transport.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};