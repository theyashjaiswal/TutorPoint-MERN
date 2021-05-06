/*Author: Manpreet Singh, BannerID: B00853930*/
const workshopModel = require('../model/workshopModel'); 
const mongoose = require("mongoose");

const getWorkshops = (req,res)=>{
    workshopModel.find().exec().then(data=>{
        console.log(data);
        res.status(200).json(data);
    })
   .catch(err=>{
        res.status(200).json({
            success: false,
            message: "workshops not found",
        
    });
    console.log(err);
});
}

const filterByIds=(req,data)=>{
    const ids=req.query.id;
    
    let filteredWorkshops = [];
    data.map(item=>
        {
            if(ids.includes(item.id)){
                filteredWorkshops.push(item);
            }
        })
    return filteredWorkshops;
}

const addWorkshops = (req,res)=>{
    workshopModel.countDocuments().then((count_documents) => {
        console.log(count_documents);
        const newDocument = count_documents + 1;
        console.log(req.body);
        const workshop= new workshopModel({
            _id: new mongoose.Types.ObjectId(),
            id: newDocument,
            name: req.body.name,
            department: req.body.department,
            time: req.body.time,
            date: req.body.date,
            tutor: req.body.tutor,
        });

        console.log("Working!!!!!");
        workshop.save();
        return workshop;
  }).catch((err) => {
      console.log(err);
      return err;
  })

}


    


module.exports.getWorkshops = getWorkshops;
module.exports.addWorkshops = addWorkshops;
module.exports.filterByIds = filterByIds;

