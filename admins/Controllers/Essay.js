const dotenv = require('dotenv');
const Essay=require('../Models/Essay');

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

module.exports ={NewEssay,DeleteEssay,AllEssays,EditEssay};