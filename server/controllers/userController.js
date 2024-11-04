const { createUser } = require('../models/userModels');
const userAuth = require("../auth/userAuth");

async function handleUserSignUp(req,res){
    try{
        const result = await createUser(req.body);
        res.status(200).json({
            msg:"User Created Successfully",
            user:result
        }) 
    }catch(err){
        res.status(500).json({
            msg:"Some error occurred!!",err
        })
    }
      
}

module.exports = { handleUserSignUp };