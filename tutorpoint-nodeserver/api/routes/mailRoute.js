/*Author: Yash Jaiswal, BannerID: B00873246*/
const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

router.post("/send", mailController.mailSender);
router.post(
  "/send-application-update",
  mailController.tutorApplicationUpdateMail
);

module.exports = router;
