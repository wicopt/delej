const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token =  req.headers.authorization;;
    if (token) {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json({ message: "Invalid or expired token" });
            } else {

                req.user_id = decodedToken;
                console.log(decodedToken);
                next();
                
            }
        });
    } else {
        return res.status(401).json({ message: "Authentication required" });
    }
}
module.exports = { requireAuth };