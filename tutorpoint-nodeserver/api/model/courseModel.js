/*Author: Yash Jaiswal, BannerID: B00873246*/
const mongoose = require("mongoose");

const courses = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
  departments: [
    {
      department_name: String,
      courses: [
        {
          course_name: String,
          course_id: String,
          faculty: String,
          faculty_email: String,
          approver_id: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("courses", courses);
