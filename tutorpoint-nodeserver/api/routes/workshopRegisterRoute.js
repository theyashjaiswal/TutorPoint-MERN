/*Author: Manpreet Singh, BannerID: B00853930*/
/* The code below was referred from [Tutorial-6 V3 recording (T6V3: NodeJS and Express [Option 2 How-To Video])](https://dal.brightspace.com/d2l/le/content/143362/viewContent/2243534/View) and modified further to complete the activity.*/
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const workshopRegisterModel = require("../model/workshopRegisterModel");
const { registerWorkshops, getWorkshopIdsByEmail} =require('../controllers/workshopRegisterController');

//get workshops ids for logged in user
router.get('/specific', (req, res) => {

    workshopRegisterModel.find().exec().then((data)=>{
        const filteredWorkshopIds= getWorkshopIdsByEmail(req,data);
        console.log(filteredWorkshopIds);       
        if(filteredWorkshopIds.length==0)
        {
            res.status(200).json({
                success: false,
                message: "Workshops not found"

            })
        } else{
        res.status(200).json(filteredWorkshopIds);
        }
    })


});

//registering workshop and saving in database
router.post("/", (req, res) => {
    workshopRegisterModel
        .find()
        .exec()
        .then((data) => {
            console.log(data);
            let exists=false;
            data.map(item=>{
                if(item.workshopid===req.body.workshopid && item.email===req.body.email)
                {
                    exists=true;        
                }
            })
            console.log(exists);
            if(!exists){ 
            const response = registerWorkshops(req,res);
            res.status(200).json({
                success: true,
                message: "Workshop registered successfully!",
            })
        } else{
            res.status(200).json({
                success: false,
                message: "Workshop already registered!",
            })

        }
           
        });
});

module.exports = router;