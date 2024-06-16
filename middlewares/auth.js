const { log } = require('console');
const jwt = require('jsonwebtoken');
const {promisify } = require ('util') ; 
async function auth(req,res,next){ // here make auth to control who can create todo or delete todo 
    const {authorization} = req.headers ; 
    console.log (authorization) ; 
    if (!authorization) {
        return res.status (404).json ({massage : "PLZ Login first "}) ; 
    }
    try{
       var decoded =  await  promisify(jwt.verify)(authorization , process.env.SECRET)
         // promisfy insteat of promise to handel error 
    //    console.log(decoded) ; 
       req.id = decoded.id ; 
         next() ; 
    }catch (err){
        console.log(err) ;
        return res.status (404).json ({massage :"err.massage"}) ; 

    }

}

module.exports = {auth} ;  