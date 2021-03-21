const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}
let transport = mailgunTransport(mailgunOptions)
let transporter = nodemailer.createTransport(transport)

module.exports = ({emailTo, html, subject, anexos}) => {

  const mailOptions = {
    from: `${process.env.MAIL_REMETENTE_NAME} <${process.env.MAIL_USERNAME}>`,
    to: emailTo,
    subject: subject,
    html,
    attachments: anexos
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(`Email - [${subject}] enviado para ${emailTo} com sucesso!`)
    }
  });

}