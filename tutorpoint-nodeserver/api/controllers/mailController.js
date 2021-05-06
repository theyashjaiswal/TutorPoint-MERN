/* mail format and code was adapted from nodemailer package documentation and from the following blog on the website - [https://johnmeguira.medium.com/sending-mail-with-nodejs-150fb6aec1bc](https://johnmeguira.medium.com/sending-mail-with-nodejs-150fb6aec1bc) */
/*Author: Yash Jaiswal, BannerID: B00873246*/
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const mailSender = (req, res) => {
  const toEmail = req.body.formData.faculty_email;
  const studentMail = req.body.formData.email;
  const studentName = req.body.formData.fullName;
  const courseId = req.body.formData.course_id;
  const courseName = req.body.formData.course;
  const description = req.body.formData.description;
  const availability = req.body.formData.availability;
  const fileNames = req.body.fileNames;
  const fileDestination = req.body.fileDestination;
  const tutorApplicationId = req.body.tutorApplicationId;
  const approverId = req.body.formData.approver_id;
  const attachmentsMail = [];
  var i;
  for (i = 0; i < fileNames.length; i++) {
    var jsonObjTemp = {
      filename: fileNames[i],
      path: fileDestination + "/" + fileNames[i],
      contentType: "application/pdf",
    };
    attachmentsMail.push(jsonObjTemp);
  }

  console.log(studentMail);
  async function main() {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tutorpointmailer@gmail.com",
        pass: "tutor@123",
      },
    });
    let info = await transport.sendMail({
      from: '"TutorPoint" <tutorpointmailer@gmail.com>',
      to: toEmail,
      subject:
        "Tutor Application " +
        "- " +
        tutorApplicationId +
        " received for the course " +
        courseId +
        "- " +
        courseName,
      // text:
      //   "Respected Faculty, \n This is regarding an application submitted by " +
      //   studentName +
      //   " for tutoring for one of your courses " +
      //   courseId +
      //   ". \n Please go through the attached documents and the application to make a decision. \n Also, you can directly contact the student at " +
      //   studentMail +
      //   "for futher information. \n Please make a decision on this application by clicking   ", // plain text body
      html:
        "<h3>Respected Faculty,</h3><br><h4>This is regarding an application submitted by the student " +
        studentName +
        " to tutor for one of your courses " +
        courseName +
        " - " +
        courseId +
        ".<br> <br>Application Details<br> ----------------- <br> Student Name: " +
        studentName +
        "<br> E-mail: " +
        studentMail +
        "<br> Message: <br>" +
        description +
        "<br> Availability: " +
        availability +
        "<br> <br> Please go through the attached documents and the application to make a decision. <br> Also, you can directly contact the student at " +
        studentMail +
        " for futher information. <br><br>Your Approver ID is: " +
        approverId +
        "<br> <b>Please make a decision on this application by clicking <a href='https://tutorpoint1.herokuapp.com/#/manage-tutor-application'>Here</a></b> </h4> ", // html body
      attachments: attachmentsMail,
    });
  }

  main().catch(console.error);
  res.status(200).json({ message: "email sent!!" });
};

const tutorApplicationUpdateMail = (req, res) => {
  const toEmail = req.body.student_mail;
  const studentName = req.body.fullName;
  const tutorApplicationId = req.body.tutorApplicationId;
  console.log(toEmail + studentName + tutorApplicationUpdateMail);
  async function main() {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tutorpointmailer@gmail.com",
        pass: "tutor@123",
      },
    });

    let info = await transport.sendMail({
      from: '"TutorPoint" <tutorpointmailer@gmail.com>',
      to: toEmail,
      subject: "Tutor Application " + "- " + tutorApplicationId + " Updated!!!",
      html:
        "<h2>Hello " +
        studentName +
        ",</h2><br><h3> Your Application - " +
        tutorApplicationId +
        " has been updated. <br>Please check the portal for details. " +
        "<br> <br> Thank you. Have a nice day.</h3>",
    });
  }

  main().catch(console.error);
  res.status(200).json({ message: "email sent!!" });
};

module.exports.mailSender = mailSender;
module.exports.tutorApplicationUpdateMail = tutorApplicationUpdateMail;
