const { checkLibrarianAccount } = require('../models/librarianModels');
const jwt = require("jsonwebtoken");


const JWT_SECRET =process.env.TOKEN_SECRET;

const checkUniqueUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existingUser = await checkLibrarianAccount(email);
        
        if (existingUser.length>0) {
            return res.status(409).json({ error: "User already exists" });
        }
        
        next(); 
    } catch (error) {
        console.error("Error checking unique user:", error);
        res.status(500).json({ error: "Error checking user existence" });
    }
};

const generateAccessToken = (req, res, next) => {
    try {
      const { email } = req.body;
      const payload = { email };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
      req.token = token;
      next();
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ error: "Error generating token" });
    }
  };


  const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const bearerToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
  

    jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = decoded;
      console.log(decoded);
      next();
    });
  };

module.exports = { checkUniqueUser, generateAccessToken, verifyToken };


