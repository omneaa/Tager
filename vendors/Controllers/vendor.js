
const nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('../../utils/cloudinary');
const{sendNotification }=require('../../utils/sendNotification');
const Vendor=require('../Models/vendor');
const EditRequest=require('../Models/Edit');
const axios = require('axios');
const httpRequest = require('https');
var ID;
var newRequestCode;
var vendorName,
brandName,
vendorLocation,
vendorPhone,
vendorEmail,
typeOfLicense,
licenseNumber,
registeredWithAddedTax,
LicenseFile,
AddedTaxFile;
var data={
	vendorName,
	 brandName,
	vendorLocation,
	vendorPhone,
	vendorEmail,
	typeOfLicense,
	licenseNumber,
	registeredWithAddedTax,
	LicenseFile,
	AddedTaxFile,
}
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;
let mailTransporter =nodemailer.createTransport(
	{
		service: 'gmail',
		auth: {
			user: 'abrar.purpose@gmail.com',
			pass: 'vjusorbiqjpjwhaz'
		}
	}
);

const SendCode=async(req,res) =>{
    
ID=Math.trunc(Math.random() * (9999 - 1000) + 1000);
let mailDetails = {
	from: 'abrar.purpose@gmail.com',
	to: `${req.params.email}`,
	subject: 'Email Code',
	text: `Hi this is your Code for the App ${ID}`
}
mailTransporter.sendMail(mailDetails,function (err, data) {
			if (err) {
				console.log('Error Occurs');
                console.error(err);
				res.status(500).json(`${err}`);
			} else {
				console.log(ID);
				res.status(200).json({"message":'Email sent successfully to vendor '});
			}
		});
};


const ValidateCode=async(req,res)=>{
    var code=req.params.code;
	try{
	if(code==ID)
		{

	
			const jwtSecretKey = process.env.SECRET;
			const user=await Vendor.findOne({vendorEmail:req.params.vendorEmail});
			const data = {
				time: Date(),
			};
			const token = jwt.sign(data, jwtSecretKey);
			res.send({"message":'the code is right', "token":token,"data":user});
		}

		else
		{ 
			res.status(400).json("the code is wrong");
			
		}
	}
	catch(err){
		res.status(500).json(`${err}`);
	}
};


const NewVendor=async(req,res)=>{
    
try{
	if(req.params.status==="1"){
const result=await Vendor.findByIdAndUpdate(req.params.Id,{status:"accepted"},{new:true});

	let mailDetails = {
		from: 'abrar.purpose@gmail.com',
		to: `${req.params.email}`,
		subject: 'Email',
		text: `Hi the admin approve your request you can login to the app now`
	}
	mailTransporter.sendMail(mailDetails,function (err, data) {
				if (err) {
					
					
					res.status(500).json( `${err}`);
				} else {
					
					res.status(200).json({"message":'Email sent to vendor',"data":result});
				}
			});

}
else
{
	const result=await Vendor.findByIdAndDelete(req.params.Id);
	let mailDetails = {
		from: 'abrar.purpose@gmail.com',
		to: `${req.params.email}`,
		subject: 'Email',
		text: `Hi the admin rejected your request `
	}
	mailTransporter.sendMail(mailDetails,function (err, data) {
				if (err) {
					
					
					res.status(500).json( `${err}`);
				} else {
					
					res.status(200).json({"message":'Email sent to vendor',"data":result});
				}
			});
}
}
catch(e){
	res.status(400).json(e);
}}





const NewVendorRequest=async(req,res)=>{
	  
try{


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
	}
	const vendorEmail=await Vendor.findOne({"vendorEmail":`${req.body.vendorEmail}`});
	

    

	if (req.body.vendorName.length  === 0||req.body.brandName.length=== 0||req.body.vendorLocation.length===0||req.body.vendorPhone.length===0||req.body.vendorEmail.length===0||
		req.body.typeOfLicense.length===0||req.body.licenseNumber.length===0||req.body.registeredWithAddedTax.length===0||req.files['AddedTaxFile'][0].path.length===0||
		req.files['AddedTaxFile'][0].path.length===0
	 )
	 {
		return res.status(400).json({message:"your input not math the fields requirements"});
	 }


	 newRequestCode=Math.trunc(Math.random() * (9999 - 1000) + 1000);
let mailDetails = {
	from: 'abrar.purpose@gmail.com',
	to: `${req.body.vendorEmail}`,
	subject: 'Email Code',
	text: `Hi this is your Code for the App ${newRequestCode}`
}

mailTransporter.sendMail(mailDetails,function (err, data) {
	if (err) {
		console.log('Error Occurs');
		console.error(err);
		res.status(500).json(`${err}`);
	} else {
		console.log(newRequestCode);
		res.status(200).json({"message":'Code sent successfully to vendor '});
	}
});

	
}
catch(e){
	res.status(400).json(e);
} };


const NewVendorValidateCode=async(req,res)=>{
	var code=req.params.code;
	try{
	if(code==newRequestCode)
		{


	 const result=await Vendor.create(data);
	   if (result) {
		res.status(200).json({"message":'your request sent to admins',data:result});
	
		} else {
			res.status(400).json("Error sending your request please try later ");
		  
		}
			
	}

		else
		{ 
			res.status(400).json("the code is wrong");
			
		}
	}
	catch(err){
		res.status(500).json(`${err}`);
	}
}



/* 1 */
const EditLogo=async(req,res)=>{



			try {
				
					const result=await Vendor.findByIdAndUpdate(req.params.Id,{"logo":req.file.path},{new:true,select:"logo"});
					res.status(200).json({ message: "Logo Edited", data:result});
			}
				catch (error) {
				return res.status(500).send('error');
			}
		};





/*2*/
const DeleteLogo=async(req,res)=>{
	


		
			try {
				const token = req.header('tokenHeaderKey');
				const verified = jwt.verify(token, jwtSecretKey);
			    const result=await Vendor.findByIdAndUpdate(req.params.Id,{$unset:{ "logo": ""}});
                res.status(200).json({ message: "Logo Deleted"});

			} catch (error) {
				return res.status(500).send('error');
			}
		};
		


/*3*/
const DeleteVendor=async(req,res)=>{
	

	try {
		
			const result=await Vendor.findByIdAndDelete(req.params.Id);
			res.status(200).json({ message: "Youe account deleted successfully"});
	} catch (error) {
		return res.status(500).send('error');
	}

};



//router.patch('/vendor/:Id/:Request_Id/:Status/:vendorEmail'
/*4*/
const EditVendor=async(req,res)=>{
	try{
		if(req.params.Status==="1"){
		const result=await EditRequest.findById(req.params.Request_Id);
		const data=await Vendor.findByIdAndUpdate(req.params.Id,{"vendorName":result.vendorName,"brandName":result.brandName
			,"vendorLocation":result.vendorLocation,vendorPhone:result.vendorPhone,"vendorEmail": result.vendorEmail,
			"typeOfLicense":result.typeOfLicense, licenseNumber: result.licenseNumber,registeredWithAddedTax:result.registeredWithAddedTax,
			LicenseFile:result.LicenseFile,"AddedTaxFile":result.AddedTaxFile},{new:true});
			
	
		let mailDetails = {
			from: 'abrar.purpose@gmail.com',
			to: `${req.params.vendorEmail}`,
			subject: 'Email Code',
			text: `Hi the Admins approve your Edit request`
		}
		mailTransporter.sendMail(mailDetails,function (err, data) {
					if (err) {
						console.log('Error Occurs');
						console.error(err);
						res.status(500).json(`${err}`);
					} else {
						
						res.status(200).json({ message: "the vendor data updated"});

					}
				});
				await EditRequest.findByIdAndDelete(req.params.Request_Id);
			}
			else{

				const result=await EditRequest.findByIdAndDelete(req.params.Request_Id);
				let mailDetails = {
					from: 'abrar.purpose@gmail.com',
					to: `${req.params.vendorEmail}`,
					subject: 'Email Code',
					text: `Hi the Admins rejected your Edit request`
				}
				mailTransporter.sendMail(mailDetails,function (err, data) {
							if (err) {
								console.log('Error Occurs');
								console.error(err);
								res.status(500).json(`${err}`);
							} else {
								res.status(200).json({ message: "the vendor edit request rejected"});
								//res.status(200).json({ message: "Done"});
		
							}
						});
						await EditRequest.findByIdAndDelete(req.params.Request_Id);
					}
					
			}

	catch(e){
		res.status(400).json(e);
	}
};



/*5*/
const EditVendorRequest=async(req,res)=>{
	try{
		
		if (req.body.vendorName.length  === 0||req.body.brandName.length=== 0||req.body.vendorLocation.length===0||req.body.vendorPhone.length===0||req.body.vendorEmail.length===0||
			req.body.typeOfLicense.length===0||req.body.licenseNumber.length===0||req.body.registeredWithAddedTax.length===0||req.files['AddedTaxFile'][0].path.length===0||
			req.files['AddedTaxFile'][0].path.length===0
		 )
		 {
			return res.status(400).json({message:"your input not math the fields requirements"});
		 }

		const data={
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
			VendorId:req.params.Id,
		}
		const result=await EditRequest.create(data);
		return res.status(200).json({message:"your Request sent to admins" , data : result});;
console.log(result);
		  
		
	}
	catch(e){
		res.status(400).json(e);
	}
};


/*6*/
const Logout=async(req,res)=>{
	
	
	try {
		
		
			res.status(200).json({ message: "loged-out"});
		
		
	}
	catch (error) {
		return res.status(401).send('Invalid Token');
	}

}
const getNumberofvendors=async(req,res)=>{
	try{
        const result=await Vendor.countDocuments();
        res.status(200).json({message:"number of vendors",data:result});
    }
    catch(e){
        res.status(400).json(e);
    }
}


const MessageOtp=async(req,res)=>{
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
};

const data = `{
  "userName": "Gomalwabas@gmail.com",
  "numbers": "01099805381",
  "userSender": "tager",
  "apiKey": "1e9f382946e85ae594a084fab01413f7",
  "msg": "hi"
}`;

const request = httpRequest.request('https://www.msegat.com/gw/sendsms.php', options, response => {
  console.log('Status', response.statusCode);
  console.log('Headers', response.headers);
  let responseData = '';

  response.on('data', dataChunk => {
    responseData += dataChunk;
  });
  response.on('end', () => {
    console.log('Response: ', responseData)
  });
});

request.on('error', error => console.log('ERROR', error));

request.write(data);
request.end();
}

module.exports ={SendCode,ValidateCode
	,NewVendor,
	NewVendorRequest,
	Logout,EditLogo,
	EditVendor,
	EditVendorRequest,
	DeleteVendor,
	DeleteLogo,
	EditLogo,NewVendorValidateCode,
	getNumberofvendors,
	MessageOtp
};