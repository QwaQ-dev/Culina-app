const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

module.exports = function(role){
    return function(req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({message: "You are not authorized yet"})
            }
    
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role) {
                return res.status(403).json({message: "You do not have access rights"})
            }

            req.user = decoded;
            
            next()
        } catch (error) {
            return res.status(401).json({message: "You are not authorized yet"})
        }
}

