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
const AddVendor=async(req,res)=>{
    data={
		vendorName: `${req.body.vendorName}`,
		brandName: `${req.body.brandName}`,
		vendorLocation: `${req.body.vendorLocation}`,
		vendorPhone: `${req.body.vendorPhone}`,
		vendorEmail: `${req.body.vendorEmail}`,
		typeOfLicense: `${req.body.typeOfLicense}`,
		licenseNumber: `${req.body.licenseNumber}`,
		registeredWithAddedTax: `${req.body.registeredWithAddedTax}`,
		LicenseFile:`${req.files['AddedTaxFile'][0].path}`,
		AddedTaxFile: `${req.files['AddedTaxFile'][0].path}`,
        "status": "accepted"
	}
	if (req.body.vendorName.length  === 0||req.body.brandName.length=== 0||req.body.vendorLocation.length===0||req.body.vendorPhone.length===0||req.body.vendorEmail.length===0||
		req.body.typeOfLicense.length===0||req.body.licenseNumber.length===0||req.body.registeredWithAddedTax.length===0||req.files['AddedTaxFile'][0].path.length===0||
		req.files['AddedTaxFile'][0].path.length===0
	 )
	 {
		return res.status(400).json({message:"your input not math the fields requirements"});
	 }
     const result=await Vendor.create(data);
	   if (result) {
		res.status(200).json({"message":'new vendor added',data:result});
	
		} else {
			res.status(400).json("Error adding new vendor, please try later ");
		  
		}

}
const DeleteVendor=async(req,res)=>{
    const result= await Vendor.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "message": "vendor deleted" });
}
const AllVendors=async(req,res)=>{
    
    const result=await Vendor.find({status:"accepted"});
    return res.status(200).json({ "message": "all vendors","result":result });

}
const VendorProfile=async(req,res)=>{
    const result=await Vendor.findById(req.params.id);
    return res.status(200).json({ "message": "vendor Profile","result":result });
}
module.exports ={NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests,EditVendorRequests,AddVendor,
    DeleteVendor,AllVendors,VendorProfile};