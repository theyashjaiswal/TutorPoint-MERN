/*Author: Manpreet Singh, BannerID: B00853930*/
const mongoose = require("mongoose");

const registerWorkshop = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // mongoose Type objectId is used for generating unique ID's
  workshopid:String,
  email: String,
  
});

module.exports = mongoose.model("registerWorkshop",registerWorkshop ,'registerWorkshop');