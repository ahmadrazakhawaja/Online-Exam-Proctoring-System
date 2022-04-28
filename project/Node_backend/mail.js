const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

// console.log(process.env.user, process.env.password);
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
});

module.exports.sendConfirmationEmail = (
  name,
  email,
  confirmationCode,
  description
) => {
  console.log("Check");
  if (description === "confirmation") {
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
  } else if (description === "log_file") {
    transport
      .sendMail({
        host: "smtp.gmail.com",
        from: process.env.user,
        to: email,
        attachments: [
          {
            path: `log_files/${confirmationCode}.txt`,
          },
        ],
        subject: `Log File for Exam ${confirmationCode}`,
        html: `<h1>Log File</h1>
          <h2>Hello ${name}</h2>
          <p>Please find the attached Log file for the Exam</p>
          </div>`,
      }).then(() => {
        fs.rm(`log_files/${confirmationCode}.txt`, (err) => {
          console.log(err);
      });
      })
      .catch((err) => console.log(err));
  } else {
    transport
      .sendMail({
        host: "smtp.gmail.com",
        from: process.env.user,
        to: email,
        subject: "Change Password",
        html: `<h1>Change Password</h1>
          <h2>Hello ${name}</h2>
          <p>In order to change your password please click on the following link.</p>
          <a href=http://localhost:3000/change-password/${confirmationCode}> Click here</a>
          </div>`,
      })
      .catch((err) => console.log(err));
  }
};
