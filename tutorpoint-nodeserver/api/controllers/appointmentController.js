const appointmentModel = require('../model/appointmentModel'); 
const mongoose = require("mongoose");


const getAppointmentsStudent=(req,data)=>{
    const studentemail=req.query.studentemail;
    
    let appointments = [];
    data.map(item=>
        {
            if(studentemail===item.studentemail){
                appointments.push(item);
            }
        })
    return appointments;
}

const bookAppointment = (req,res)=>{
    appointmentModel.countDocuments().then((count_documents) => {
        console.log(count_documents);
        const newDocument = count_documents + 1;
        console.log(req.body);
        const appointment= new appointmentModel({
            _id: new mongoose.Types.ObjectId(),
            tutoremail: req.body.tutoremail,
            studentemail: req.body.studentemail,
            time:req.body.time,
            day: req.body.day,
            status: req.body.status,
            tutorname: req.body.tutorname
        });

        console.log("Working!!!!!");
        appointment.save();
        return appointment;
  }).catch((err) => {
      console.log(err);
      return err;
  })

}

module.exports.getAppointmentsStudent = getAppointmentsStudent;
module.exports.bookAppointment = bookAppointment;