/*Author: Yash Jaiswal, BannerID: B00873246*/
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/*", courseController.getCourses);

module.exports = router;
