const { findUserByEmail } = require('../models/userModels');

const checkUniqueUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existingUser = await findUserByEmail(email);
        
        if (existingUser.length>0) {
            return res.status(409).json({ error: "User already exists" });
        }
        
        next(); 
    } catch (error) {
        console.error("Error checking unique user:", error);
        res.status(500).json({ error: "Error checking user existence" });
    }
};

module.exports = { checkUniqueUser };
