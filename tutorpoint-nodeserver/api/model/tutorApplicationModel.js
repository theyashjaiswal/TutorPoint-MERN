/*Author: Yash Jaiswal, BannerID: B00873246*/
const mongoose = require("mongoose");

const tutorapplications = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
  tutor_application_id: String,
  applied_by: {
    student_name: String,
    email: String,
    username: String,
  },
  applied_for: {
    course_name: String,
    course_id: String,
    department_name: String,
    approver_email: String,
  },
  application_status: {
    status: String,
    to_be_approved_by: String,
    approver_id: String,
    reason: String,
    updated_at: Date,
  },
  application_details: {
    files_destination: String,
    student_description: String,
    attachment_file_names: Array,
    created_at: Date,
  },
});

module.exports = mongoose.model("tutorapplications", tutorapplications);
