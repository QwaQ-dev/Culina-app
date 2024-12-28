const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({message: "You are not authorized yet"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({message: "You are not authorized yet"});
    }
}