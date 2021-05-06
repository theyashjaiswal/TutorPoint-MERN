/*Author: Yash Jaiswal, BannerID: B00873246*/
const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".pdf");
  },
});

var upload = multer({ storage: storage });

router.post(
  "/uploadfile",
  upload.array("uploadDocuments", 12),
  userController.uploadFile
);

router.get("/tutors/:course", userController.getTutorsList);
router.post("/tutorapplications", userController.getTutorApplications);
router.put("/tutorapplication", userController.updateTutorApplication);
router.post("/tutorrating", userController.tutorRating);
router.get("/tutorrating/:tutoremail", userController.getTutorRating);

module.exports = router;
