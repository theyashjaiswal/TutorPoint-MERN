/*Author: Manpreet Singh, BannerID: B00853930*/
const workshopRegisterModel = require('../model/workshopRegisterModel'); 
const mongoose = require("mongoose");


const registerWorkshops = (req,res)=>{
    workshopRegisterModel.countDocuments().then((count_documents) => {
        console.log(count_documents);
        const newDocument = count_documents + 1;
        console.log(req.body);
        const registerWorkshop= new workshopRegisterModel({
            _id: new mongoose.Types.ObjectId(),
            workshopid: req.body.workshopid,
            email: req.body.email,
        });

        console.log("Working!!!!!");
        registerWorkshop.save();
        return registerWorkshop;
  }).catch((err) => {
      console.log(err);
      return err;
  })

}
const getWorkshopIdsByEmail=(req,data)=>{
    const email=req.query.email;
    console.log(req.query);
    let filteredWorkshopIds = [];
    data.map(item =>
        {
            if(email === item.email){
                filteredWorkshopIds.push(item.workshopid);
            }
        })
    return filteredWorkshopIds;
}

module.exports.registerWorkshops = registerWorkshops;
module.exports.getWorkshopIdsByEmail = getWorkshopIdsByEmail;


