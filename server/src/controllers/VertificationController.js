const Vertification = require("../models/Vertification");
const nodemailer = require("nodemailer");

// Create a transporter using the provided configuration
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587, 
    secure: false, 
    auth: {
        user: 'testingcs307@outlook.com',
        pass: 'PleaseWork123'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const generateVerificationCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const VertificationController = {
  async sendVerificationEmail(req, res) {
    const userEmail = req.params.userEmail;

    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }
    try {
      const verificationCode = generateVerificationCode();
      console.log(`Attempting to send verification code to email: ${userEmail}`);
      console.log(`Generated verification code: ${verificationCode}`);

      await Vertification.upsert({
        email: userEmail,
        code: verificationCode
      });

      const mailOptions = {
        from: 'blumap2024@outlook.com',
        to: userEmail,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}`
      };

      // Send the email using the transporter
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: "Failed to send verification email" });
        } else {
          console.log('Email sent:', info.response);
           res.status(200).json({ verificationCode: verificationCode }); 
        }
      });
    } catch (error) {
      console.error('Verification error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = VertificationController;