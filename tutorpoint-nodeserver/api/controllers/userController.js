/*Author: Yash Jaiswal, BannerID: B00873246*/
const tutorApplicationData = require("../model/tutorApplicationModel");
const tutorData = require("../model/tutorModel");
const tutorRatingData = require("../model/tutorRatingModel");
const loginUserData = require("../model/loginModel");
const mongoose = require("mongoose");

const uploadFile = (req, res) => {
  console.log("body here");
  console.log(req.body);
  console.log("fullname" + req.body.fullName);
  console.log("files here");
  console.log("destination" + req.files[0].destination);
  var fileDestination = req.files[0].destination;
  var i;
  var fileNames = [];

  for (i = 0; i < req.files.length; i++) {
    fileNames.push(req.files[i].filename);
  }
  console.log("filenames" + fileNames);
  var responseObject = {
    formData: {
      fullName: req.body.fullName,
      email: req.body.email,
      department: req.body.department,
      course: req.body.course,
      description: req.body.description,
      availability: req.body.availability,
      faculty_email: req.body.facultyEmail,
      course_id: req.body.courseId,
      approver_id: req.body.approverId,
    },
    fileNames: fileNames,
    fileDestination: fileDestination,
    tutorApplicationId: "",
  };
  //res.status(200).json(responseObject);
  var new_tutor_application_id;
  tutorApplicationData
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .exec()
    .then((data) => {
      var jsonData = data;
      console.log("dasda" + jsonData);
      if (data.length == 0) {
        console.log(typeof data);
        console.log(data.tutor_application_id);
        new_tutor_application_id = "T111111";
        console.log("neww" + new_tutor_application_id);
      } else {
        console.log(jsonData[0].tutor_application_id.substring(2));
        new_tutor_application_id =
          "T" +
          (parseInt(
            jsonData[0].tutor_application_id.substring(
              1,
              jsonData[0].tutor_application_id.length
            ),
            10
          ) +
            1);
        console.log("neww" + new_tutor_application_id);
      }

      console.log("resp" + responseObject.formData.course_id);
      responseObject.tutorApplicationId = new_tutor_application_id;
      let tutorApplication = new tutorApplicationData({
        _id: new mongoose.Types.ObjectId(),
        tutor_application_id: new_tutor_application_id,
        applied_by: {
          student_name: responseObject.formData.fullName,
          email: responseObject.formData.email,
          username: responseObject.formData.fullName,
        },
        applied_for: {
          course_name: responseObject.formData.course,
          course_id: responseObject.formData.course_id,
          department_name: responseObject.formData.department,
          approver_email: responseObject.formData.faculty_email,
        },
        application_status: {
          status: "pending",
          to_be_approved_by: responseObject.formData.faculty_email,
          approver_id: responseObject.formData.approver_id,
          reason: "blank",
          updated_at: Date.now(),
        },
        application_details: {
          files_destination: responseObject.fileDestination,
          student_description: responseObject.formData.description,
          attachment_file_names: responseObject.fileNames,
          created_at: Date.now(),
        },
      });
      tutorApplication.save().then((result) => {
        console.log(result);
      });
      res.status(200).json(responseObject);
    });
};

const getTutorApplications = (req, res) => {
  const email = req.body.email;
  tutorApplicationData
    .find({ "applied_by.email": email })
    .exec()
    .then((data) => {
      var jsonData = data;
      res.status(200).json(data);
    });
};

const updateTutorApplication = (req, res) => {
  let applicationId = req.body.applicationId;
  let approverId = req.body.approverId;
  let decision = req.body.decision;
  let reason = req.body.reason;
  let todaysDate = Date.now();

  tutorApplicationData
    .find({ tutor_application_id: applicationId })
    .exec()
    .then((data) => {
      console.log(data + "mongosearchres");
      if (data.length == 0) {
        res.status(400).json({
          success: false,
          message: "Invalid Application ID",
        });
      } else {
        console.log(data[0].application_status.approver_id + "checkkkkk!!");
        if (
          data[0].application_status.approver_id.toUpperCase() ===
          approverId.toUpperCase()
        ) {
          tutorApplicationData.findOneAndUpdate(
            { tutor_application_id: applicationId },
            {
              $set: {
                "application_status.status": decision,
                "application_status.updated_at": todaysDate,
                "application_status.reason": reason,
              },
            },
            { useFindAndModify: false },
            (err, d) => {
              console.log("document here" + d);
              if (d == null) {
                res.status(400).json({
                  success: false,
                  message: "Invalid Approver ID",
                });
              }
              if (err) {
                console.log(err);
                res.status(500).json(err);
              } else {
                if (decision === "Approved") {
                  loginUserData.findOneAndUpdate(
                    { email: d.applied_by.email },
                    {
                      $set: {
                        role: "tutor",
                      },
                    },
                    { useFindAndModify: false },
                    (err, doc) => {
                      console.log("document here" + doc);
                      if (doc == null) {
                        res.status(400).json({
                          success: false,
                          message: "Invalid Approver ID",
                        });
                      }
                      if (err) {
                        console.log(err);
                        res.status(500).json(err);
                      } else {
                        let tutorObj = new tutorData({
                          _id: new mongoose.Types.ObjectId(),
                          name: d.applied_by.student_name,
                          dep: d.applied_for.department_name,
                          course: d.applied_for.course_name,
                          email: d.applied_by.email,
                        });
                        tutorObj.save().then((result) => {
                          console.log(result);
                        });
                        console.log("Application Updated Successfully!!!");
                        res.status(200).json({
                          success: true,
                          message: d,
                        });
                      }
                    }
                  );
                } else {
                  console.log("Application Updated Successfully!!!");
                  res.status(200).json({
                    success: true,
                    message: d,
                  });
                }
              }
            }
          );
        } else {
          res.status(400).json({
            success: false,
            message: "Invalid Approver ID",
          });
        }
      }
    });
};

const getTutorsList = (req, res) => {
  const courseName = req.params.course;
  console.log("paramshere" + req.params.course);
  tutorData
    .find({ course: courseName })
    .exec()
    .then((data) => {
      var jsonData = data;
      res.status(200).json(data);
    });
};

const tutorRating = (req, res) => {
  console.log("body here");
  console.log(req);
  console.log("fullname" + req.body.fullName);

  let tutorRatingObject = new tutorRatingData({
    _id: new mongoose.Types.ObjectId(),
    feedback_given_by: {
      name: req.body.fullName,
      email: req.body.email,
    },
    tutor_rating: {
      tutor_name: req.body.tutorName,
      tutor_dept: req.body.tutorDept,
      tutor_course: req.body.tutorCourse,
      rating_out_of_five: req.body.tutorRating,
      tutor_email: req.body.tutorEmail,
      rating_comment: req.body.comment,
      created_at: Date.now(),
    },
  });
  tutorRatingObject.save().then((result) => {
    console.log(result);
  });
  res
    .status(200)
    .json({ success: "true", message: "Rating Added Succesfully!!!!" });
};

const getTutorRating = (req, res) => {
  const tutorEmail = req.params.tutoremail;
  console.log("paramshere" + req.params.tutoremail);
  tutorRatingData
    .find({ "tutor_rating.tutor_email": tutorEmail })
    .exec()
    .then((data) => {
      var jsonData = data;
      var i;
      var avg_rating;
      var rating_sum = 0;
      if (jsonData.length == 0) {
        res.status(400).json({ success: false, message: "Tutor Not Found!!!" });
      } else {
        for (i = 0; i < jsonData.length; i++) {
          rating_sum += jsonData[i].tutor_rating.rating_out_of_five;
        }
        avg_rating = rating_sum / jsonData.length;
        res.status(200).json({ rating: avg_rating });
      }
    });
};

module.exports.uploadFile = uploadFile;
module.exports.getTutorApplications = getTutorApplications;
module.exports.getTutorsList = getTutorsList;
module.exports.updateTutorApplication = updateTutorApplication;
module.exports.tutorRating = tutorRating;
module.exports.getTutorRating = getTutorRating;
