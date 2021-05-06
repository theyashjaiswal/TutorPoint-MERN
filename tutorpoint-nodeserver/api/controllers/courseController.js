/*Author: Yash Jaiswal, BannerID: B00873246*/
const courseData = require("../model/courseModel");

const getCourses = (req, res) => {
  courseData
    .find()
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        console.log("empty");
        res
          .status(406)
          .json({ success: false, message: "No users in the Database!!" });
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
};

module.exports.getCourses = getCourses;
