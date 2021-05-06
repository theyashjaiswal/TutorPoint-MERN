/*Author: Yash Jaiswal, BannerID: B00873246*/
const mongoose = require("mongoose");

const tutorratings = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
  feedback_given_by: {
    name: String,
    email: String,
  },
  tutor_rating: {
    tutor_name: String,
    tutor_dept: String,
    tutor_course: String,
    rating_out_of_five: Number,
    tutor_email: String,
    rating_comment: String,
    created_at: Date,
  },
});

module.exports = mongoose.model("tutorratings", tutorratings);
