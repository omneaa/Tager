const dotenv = require('dotenv');
const Essay=require('../Models/Essay');
//const EditRequest=require('../../Vendors/Models/Edit');
const Vendor=require('../../vendors/Models/vendor');
const EditVendor=require('../../vendors/Models/Edit');
const NewEssay=async(req,res)=>{
    const essay={
        title:req.body.title,
        body:req.body.body
    }
    const result =await Essay.create(essay);
    return res.status(200).json({ "message": "new essay added" ,"result":result});
    
}
const DeleteEssay=async (req,res)=>{
    const result= await Essay.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "message": "essay deleted" });
}
const AllEssays=async(req,res)=>{
    const result = await Essay.find();
    return res.status(200).json({ "message": "all essays","result":result});
}
const EditEssay=async (req,res)=>{
    const result=await Essay.findByIdAndUpdate(req.params.id,{"title":req.body.title,"body":req.body.body},{new:true});
    return res.status(200).json({ "message": "essay updated","result":result});
}
const NewVendorsRequests=async(req,res)=>{
const result=await Vendor.find({status:"pending"});
return res.status(200).json({ "message": "all new vendor requets","result":result});

};
const EditVendorRequests=async(req,res)=>{
    const result=await EditVendor.find({status:"pending"});
    return res.status(200).json({ "message": "all edit vendor requets","result":result});
};

module.exports ={NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests,EditVendorRequests};