const express = require("express");
const nodemailer = require("nodemailer");
const { getAppointmentsStudent,bookAppointment } = require("../controllers/appointmentController");
const router = express.Router();

const appointmentModel = require("../model/appointmentModel");


//get workshop details for workshop ids
router.get('/', (req, res) => {

    appointmentModel.find().exec().then((data)=>{
        console.log(data);
        const appointments= getAppointmentsStudent(req,data);
        if(appointments.length==0)
        {
            res.status(200).json({
                success: false,
                message: "No Appointments"

            })
        }
        else{
        res.status(200).json(appointments);
        }
    })


});

router.post("/", (req, res) => {
    appointmentModel
        .find()
        .exec()
        .then((data) => {
            console.log(data);
            let exists=false;
            console.log(exists);
            data.map(item=>{
                if(item.tutoremail===req.body.tutoremail && item.studentemail===req.body.studentemail
                    && item.time === req.body.time && item.day === req.body.day)
                {
                    exists=true;        
                }
            })
            console.log(exists);
            if(!exists){ 
            const response = bookAppointment(req,res);
            res.status(200).json({
                success: true,
                message: "Appointment booked successfully!",
            })
        } else{
            res.status(200).json({
                success: false,
                message: "Appointment already booked!",
            })

        }
           
        });
});
module.exports = router;