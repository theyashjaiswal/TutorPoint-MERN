//Author: Prabhjot Kaur(B00843735)
const mongoose = require("mongoose");

const tutors = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  dep: String,
  course: String,
  email: String,
});

module.exports = mongoose.model("tutors", tutors, "tutors");
