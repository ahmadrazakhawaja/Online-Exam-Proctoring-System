const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.USER, process.env.Password);
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      host: "smtp.gmail.com",
      from: process.env.user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
