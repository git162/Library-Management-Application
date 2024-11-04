const { createAdmin } = require('../models/adminModels');


async function handleAdminSignUp(req,res){
    try{
        const result = await createAdmin(req.body);
        res.status(200).json({
            msg:"Admin Signed Up",
        }) 
    }catch(err){
        res.status(500).json({
            msg:"Some error occurred!!",err
        })
    }
      
}

module.exports = { handleAdminSignUp };