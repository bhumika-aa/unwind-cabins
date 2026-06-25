const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // 2) Define the email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    // 3) Actually send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.email}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${options?.email}. Error: ${error.message}`);
    // We return false instead of throwing to prevent application crashes
    return false;
  }
};

module.exports = sendEmail;
