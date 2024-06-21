const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Client=require('../../clients/Models/client');

let hashedPassword ;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
const jwtSecretKey = process.env.SECRET;

const login=async(req,res)=> {
    try{
        let result=await Client.find({"Email":req.params.Email},{Password:1,_id:1});
        const found = JSON.stringify(result);
        if(found==="[]")
         {
            return res.status(400).json({"message":"this email not found"});
         }
            
        for (const [key, value] of Object.entries(result)) {
        let password=value.Password;
        let ID=value._id;
        let isPasswordValid = await bcrypt.compareSync("123",password);
        if(isPasswordValid){
            const data = {
                id:result._id,
                Email:result.Email
            };
            const token = jwt.sign(data, jwtSecretKey);
            return res.status(200).json({"message":"ok","JWT":token,"ClientID":ID});
    
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

const logout=async(req,res)=>{
    return res.status(200).json({"message":"ok"});
}

module.exports ={login,logout};