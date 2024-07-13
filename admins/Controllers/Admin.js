const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const Essay=require('../Models/Essay');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Vendor=require('../../vendors/Models/vendor');
const EditVendor=require('../../vendors/Models/Edit');
const Client=require('../../clients/Models/client');
const Admin=require('../Models/Admin');
const SuperAdmin=require('../Models/SuperAdmin');
// let AdminFound = (req,res)=>{
//    // Admin.findById(res.id);
//     console.log(req.id);
//     console.log(res.id);

// } 

let mailTransporter =nodemailer.createTransport(
	{
		service: 'gmail',
		auth: {
			user: 'abrar.purpose@gmail.com',
			pass: 'vjusorbiqjpjwhaz'
		}
	}
);
let hashedPassword ;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;


const NewEssay=async(req,res)=>{
try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
   
    const essay={
        title:req.body.title,
        body:req.body.body
    }
    const result =await Essay.create(essay);
    return res.status(200).json({ "message": "new essay added" ,"result":result});
}
catch(e){
    res.status(400).json({"error":e.error});
} 
}
const DeleteEssay=async (req,res)=>{
try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const result= await Essay.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "message": "essay deleted" });
}
catch(e){
    res.status(400).json({"error":e.error});
}
}



const AllEssays=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    const result = await Essay.find();
    return res.status(200).json({ "message": "all essays","result":result});
}catch(e){
    res.status(400).json({"error":e.error});
}
}
const EditEssay=async (req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    const result=await Essay.findByIdAndUpdate(req.params.id,{"title":req.body.title,"body":req.body.body},{new:true});
    return res.status(200).json({ "message": "essay updated","result":result});
}catch(e){
    res.status(400).json({"error":e.error});
}
}
const NewVendorsRequests=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
const result=await Vendor.find({status:"pending"});
return res.status(200).json({ "message": "all new vendor requets","result":result});
    }
    catch(e){
        res.status(400).json({"error":e.error});
    }
};
const EditVendorRequests=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    const result=await EditVendor.find({status:"pending"});
    return res.status(200).json({ "message": "all edit vendor requets","result":result});
}
catch(e){
    res.status(400).json({"error":e.error});
}
};
const AddVendor=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
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
    catch(e){
        res.status(400).json({"error":e.error});
    }

}
const DeleteVendor=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const result= await Vendor.findByIdAndDelete(req.params.id);
    return res.status(200).json({ "message": "vendor deleted" });
}catch(e){
    res.status(400).json({"error":e.error});
}
}

const AllVendors=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const result=await Vendor.find({status:"accepted"});
    return res.status(200).json({ "message": "all vendors","result":result });

}catch(e){
    res.status(400).json({"error":e.error});
}
}

const VendorProfile=async(req,res)=>{
try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const result=await Vendor.findById(req.params.id);
    return res.status(200).json({ "message": "vendor Profile","result":result });
}
catch(e){
    res.status(400).json({"error":e.error});
}

}




const SendMailToAllVendors=async(req,res)=>{
try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    let vendors=await Vendor.find({},{vendorEmail:1,_id:0});

    let mailDetails = {
        from: 'abrar.purpose@gmail.com',
        subject: `${req.body.subject}`,
        text: `${req.body.text}`
    }
for (const [key, value] of Object.entries(vendors)) {
    mailDetails.to=`${value.vendorEmail}`
    mailTransporter.sendMail(mailDetails,function (err, data) {
        if (err) {
            console.log('Error Occurs');
            console.error(err);
            res.status(500).json(`${err}`);
        } else {
            console.log(`email sent to ${value.vendorEmail}`);
            res.status(200).json({"message":'Email sent successfully to vendor'});
        }
    });
}
}
catch(e){
    res.status(400).json({"error":e.error});
}
}





const AddNewSuperAdmin = async(req,res) => {
try{

    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly super admins allowed"});
    }

const {Email,Password}=req.body;
 hashedPassword = await bcrypt.hash(Password, 10);
const newadmin={
    Email:Email,
    Password:hashedPassword
}
const result=await SuperAdmin.create(newadmin);
return res.status(200).json({"message":"new super admin added"});
}

catch(e)
{
    return res.status(400).json({"erre":e.message});
}}







const AllSuperAdmins=async(req,res)=>{

try{
   
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly super admins allowed"});
    }

    const admins=await SuperAdmin.find({},{Email:1});
    return res.status(200).json({"message":"all super admins","result":`${admins}`});
}
catch(e){
    res.status(400).json({"error":e.error});
}
}


const DeleteSuperAdmin=async(req,res)=>{
    try{
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly  super admins allowed"});
    }

    const result=await SuperAdmin.findByIdAndDelete(req.params.id);
    const admins=await SuperAdmin.find({},{Email:1});
    return res.status(200).json({"message":"super admin deleted","result":`${admins}`});
  
}
catch(e){
    res.status(400).json({"error":e.error});
}
}










const AddNewAdmin = async(req,res) => {


    try{
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly super admins allowed"});
    }

const {Email,Password}=req.body;
 hashedPassword = await bcrypt.hash(Password, 10);
const newadmin={
    Email:Email,
    Password:hashedPassword
}
const result=await Admin.create(newadmin);
return res.status(200).json({"message":"new admin added"});
}

catch(e){
    return res.status(200).json({"message":e.error});
}
}





const AllAdmins=async(req,res)=>{

try{
   
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const admins=await Admin.find({},{Email:1});
    return res.status(200).json({"message":"all admins","result":`${admins}`});

}
catch(e){
    res.status(400).json({"error":e.error});
}

}

const DeleteAdmin=async(req,res)=>{

try{
    
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const result=await Admin.findByIdAndDelete(req.params.id);
    const admins=await Admin.find({},{Email:1});
    return res.status(200).json({"message":"admin deleted","result":`${admins}`});
  
}
catch(e){
    res.status(400).json({"error":e.error});
}
}






const AdminLogin=async(req,res)=>{
    try{
    
    let result=await Admin.find({"Email":req.params.email},{Password:1,_id:1});

    const found = JSON.stringify(result);
    if(found==="[]")
     {
        return res.status(400).json({"message":"this email not found"});
     }
        
    for (const [key, value] of Object.entries(result)) {
    let password=value.Password;
    let ID=value._id;
    let isPasswordValid = await bcrypt.compareSync(req.params.password,password);
    if(isPasswordValid){
        const data = {
            AdminId:result._id,
            Email:result.Email
        };
        const token = jwt.sign(data, jwtSecretKey);
        return res.status(200).json({"message":"ok","JWT":token,"AdminID":ID});

    }
    else
    {
        return res.status(400).json({"message":"the password is wrong "});
    }
}}
catch(e){
    res.status(400).json({"error":e.error});
}
};


const AdminLogout=async(req,res)=>{
    return res.status(200).json({"message":"ok"});
};








const SuperAdminLogin=async(req,res)=>{
    try{
    
    let result=await SuperAdmin.find({"Email":req.params.email},{Password:1,_id:1});

    const found = JSON.stringify(result);
    if(found==="[]")
     {
        return res.status(400).json({"message":"this Super admin email not found"});
     }
        
    for (const [key, value] of Object.entries(result)) {
    let password=value.Password;
    let ID=value._id;
    let isPasswordValid = await bcrypt.compareSync(req.params.password,password);
    if(isPasswordValid){
        const data = {
            AdminId:result._id,
            Email:result.Email
        };
        const token = jwt.sign(data, jwtSecretKey);
        return res.status(200).json({"message":"ok","JWT":token,"Super Admin ID":ID});

    }
    else
    {
        return res.status(400).json({"message":"the password is wrong "});
    }
}}
catch(e){
    res.status(400).json({"error":e.error});
}
}







const AddClient=async(req,res)=>{

try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }

    const {Email,Password,FirstName,LastName,PhoneNumber}=req.body;
    const isClient=await Client.find({$or: [{"Email":Email},{PhoneNumber:PhoneNumber}]});
    if(isClient.length!==0){
     
        return res.status(400).json({ "message": "email or phone exist"});
    }
    else
    {
 hashedPassword = await bcrypt.hash(Password, 10);
const newclient={
    Email:Email,
    Password:hashedPassword,
    FirstName:FirstName,
    LastName:LastName,
    PhoneNumber:PhoneNumber
}
const result=await Client.create(newclient);
return res.status(200).json({"message":"new client added","data":result});
}
}
catch(e){
    res.status(400).json({"error":e.error});
}
}




const DeleteClient=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    const result=await Client.findByIdAndDelete(req.params.id);
    const clients=await Client.find({},{Email:1});
    return res.status(200).json({"message":"client deleted","new Clients ":`${clients}`});
}
catch(e){
    res.status(400).json({"error":e.error});
}
}






const AllClients=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    const clients=await Client.find({},{Password:0});
    return res.status(200).json({"message":"all clients","data":`${clients}`});
}
catch(e){
    res.status(400).json({"error":e.error});
}
}
const SendMailToAllClients=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    let clients=await Client.find({},{Email:1,_id:0});

    let mailDetails = {
        from: 'abrar.purpose@gmail.com',
        subject: `${req.body.subject}`,
        text: `${req.body.text}`
    }
for (const [key, value] of Object.entries(clients)) {
    mailDetails.to=`${value.Email}`
    mailTransporter.sendMail(mailDetails,function (err, data) {
        if (err) {
            console.log('Error Occurs');
            console.error(err);
            res.status(500).json(`${err}`);
        } else {
            console.log(`email sent to ${value.Email}`);
            res.status(200).json({"message":'Email sent successfully to clients'});
        }
    });
}
    }
    catch(e){
        res.status(400).json({"error":e.error});
    }
} 
const ClientsNum=async(req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if(!isAdmin && !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins and super admins allowed"});
    }
    let clients=await Client.find({});
    res.status(200).json({"number of clients":`${clients.length}`});
}
catch(e){
    res.status(400).json({"error":e.error});
}
}

const EditAdmin=async (req,res)=>{
    try{
    const isAdmin=await Admin.findById(req.params.adminId);
    
    if(!isAdmin){
        return res.status(400).json({ "message": "not allowed onlly admins allowed"});
    }
    const result=await Admin.findByIdAndUpdate(req.params.adminId,{"Email":req.body.Email,"Password":req.body.Password});
    return res.status(200).json({ "message": "Admin profile updated"});
}catch(e){
    res.status(400).json({"error":e.error});
}
}



const EditSuperAdmin=async (req,res)=>{
    try{
    
    const isSuperAdmin=await SuperAdmin.findById(req.params.adminId);
    if( !isSuperAdmin){
        return res.status(400).json({ "message": "not allowed onlly super admins allowed"});
    }
    const result=await SuperAdmin.findByIdAndUpdate(req.params.adminId,{"Email":req.body.Email,"Password":req.body.Passwrd});
    return res.status(200).json({ "message": "super admin profile updated"});
}catch(e){
    res.status(400).json({"error":e.error});
}
}

module.exports ={NewEssay,DeleteEssay,AllEssays,EditEssay,NewVendorsRequests,EditVendorRequests,EditVendorRequests,AddVendor,
    DeleteVendor,AllVendors,VendorProfile,SendMailToAllVendors,AddNewAdmin,AllAdmins,DeleteAdmin,AdminLogin,AdminLogout,
    AddClient,DeleteClient,AllClients,SendMailToAllClients,ClientsNum,AddNewSuperAdmin,AllSuperAdmins,DeleteSuperAdmin,EditAdmin,EditSuperAdmin,SuperAdminLogin
};