
const nodemailer = require('nodemailer');
const vendorModel = require('../Models/vendor');
const cloudinary = require('../../utils/cloudinary');
var ID;
const SendCode=async(req,res) =>{

    let mailTransporter =nodemailer.createTransport(
		{
			service: 'gmail',
			auth: {
				user: 'abrar.purpose@gmail.com',
				pass: 'vjusorbiqjpjwhaz'
			}
		}
	);
ID=Math.trunc(Math.random() * (9999 - 1000) + 1000);
let mailDetails = {
	from: 'abrar.purpose@gmail.com',
	to: `${req.params.email}`,
	subject: 'Email Code ',
	text: `Hi this is your Code for the App ${ID}`
};

mailTransporter.sendMail(mailDetails,function (err, data) {
			if (err) {
				console.log('Error Occurs');
                console.error(err);
				res.status(404).json(`${err}`);
			} else {
				
				res.status(200).json('Email sent successfully');
			}
		});


};
const ValidateCode=async(req,res)=>{
    var code=req.params.code;
	if(code==ID)
		{
		   
			
			res.status(200).json('the code is right');
			return ;
		}
		else
		{ 
			res.status(400).json("the code is wrong");
			
		}
	
};

const NewVendor=async(req,res)=>{
    
}
module.exports ={SendCode,ValidateCode} ;