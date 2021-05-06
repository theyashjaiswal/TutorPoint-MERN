//Author: Prabhjot Kaur(B00843735)
const tutorModel = require("../model/tutorModel");
const mongoose = require("mongoose");

const getTutors = (req, res) => {
  tutorModel
    .find()
    .exec()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        message: "Tutors not found!",
      });
      console.log(err);
    });
};

module.exports.getTutors = getTutors;
