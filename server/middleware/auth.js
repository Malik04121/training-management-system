

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No authentication token, access denied" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Token verification failed, access denied" });
        }
      
        req.user = verified;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Invalid token" });
          }
          res.status(500).json({ error: err.message });
        }

    
};

const adminAuth=(req,res,next)=>{
    auth(req, res, () => {
        if (req.user.role !== "Admin") {
          return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
      });
}



module.exports = {auth,adminAuth};