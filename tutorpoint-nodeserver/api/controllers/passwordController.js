//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
/* The code below was referred from[Tutorial - 6 V3 recording(T6V3: NodeJS and Express[Option 2 How - To Video])](https://dal.brightspace.com/d2l/le/content/143362/viewContent/2243534/View) and modified further to complete the activity.*/
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

function passwordReset (req) {
    async function main() {
    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
      service: "gmail", // true for 465, false for other ports
      auth: {
        user: "tutorpointmailer@gmail.com", // generated ethereal user
        pass: "tutor@123", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transport.sendMail({
      from: '"TutorPoint" <tutorpointmailer@gmail.com>', // sender address
      to: req.email, // list of receivers
      subject: "Tutor Application Password Recovery Mail", // Subject line
      text:
        "Hi Sir/Madam, \n This is mail is regarding password reset for the user " + req.username +
        "\n Please go through the mail for the password for the application\n Also, you can directly contact the tutorpointmailer@gmail.com fof futher information. ", // plain text body
      html:
        "<h3>Hi Sir/Madam,</h3> <br> <h4>This is mail is regarding password reset for the user " + req.username +
        "<br> Please go through the mail for the password for the application.<br> Also, you can directly contact the tutorpointmailer@gmail.com for futher information.  <br> Security Code is : <b>"+req.code+"</b> </h4> ", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

module.exports.passwordReset = passwordReset;