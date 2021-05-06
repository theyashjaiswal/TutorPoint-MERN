/*Author: Manpreet Singh, BannerID: B00853930*/
/* The code below was referred from [Tutorial-6 V3 recording (T6V3: NodeJS and Express [Option 2 How-To Video])](https://dal.brightspace.com/d2l/le/content/143362/viewContent/2243534/View) and modified further to complete the activity.*/
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { getWorkshops,addWorkshops,filterByIds} =require('../controllers/workshopController');
const workshopModel = require("../model/workshopModel");


router.get('/', getWorkshops)

//get workshop details for workshop ids
router.get('/specific', (req, res) => {

    workshopModel.find().exec().then((data)=>{
        const filteredWorkshops= filterByIds(req,data);
        if(filteredWorkshops.length==0)
        {
            res.status(200).json({
                success: false,
                message: "Workshops not found"

            })
        }
        res.status(200).json(filteredWorkshops);
    })


});

router.post("/", (req, res) => {
    workshopModel
        .find({ name: req.body.name})
        .exec()
        .then((data) => {
            console.log(data);
            if (!data.length) {
                const response = addWorkshops(req,res);
                res.status(200).json({
                    success: true,
                    message: "Workshop created successfully!",
                })
            } else {
                res.status(407).json({
                    success: false,
                    message: "Workshop already exists",
                });
            }
        });
});

module.exports = router;