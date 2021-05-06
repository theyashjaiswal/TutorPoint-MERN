/*Author: Manpreet Singh, BannerID: B00853930*/
const mongoose = require("mongoose");

const appointments = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
  tutoremail:{ type : String,
    required : true },

  studentemail: { type : String,
    required : true },
    tutorname: { type : String,
        required : true },
  time: { type : String,
    required : true },
 day: { type : String,
  required : true },
  status: { type : String,
    required : true }
  
});

module.exports = mongoose.model("appointments",appointments ,'appointments');