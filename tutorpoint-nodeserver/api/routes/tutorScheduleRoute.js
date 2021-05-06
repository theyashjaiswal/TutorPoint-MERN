//Author: Prabhjot Kaur(B00843735)
/* The code below was referred from [Tutorial-6 V3 recording (T6V3: NodeJS and Express [Option 2 How-To Video])](https://dal.brightspace.com/d2l/le/content/143362/viewContent/2243534/View) and modified further to complete the activity.*/
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { getTutorSchedule} =require('../controllers/tutorScheduleController');
const tutorScheduleModel = require("../model/tutorScheduleModel");


router.get('/getByEmail', (req,res)=>{
	tutorScheduleModel.find().exec().then(data=>{
        const schedule= getTutorSchedule(req, data);
        if(schedule.length == 0) {
        	res.status(200).json({
	            success: false,
	            message: "No Session Available!",
        	});
        } else {
        	res.status(200).json(schedule);
        }
        
    })
});

module.exports = router;