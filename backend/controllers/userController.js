const db = require("../db/db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const createHmac = require("crypto")
dotenv.config();


class UsersController{
    async signUp(req, res) {
        const {e_mail, username, password} = req.body;
        const secretKey = process.env.SECRET_KEY;
        const hashedPassword = createHmac.createHash('sha256', secretKey)
                                         .update(password)
                                         .digest('hex')

        const user = await db.query("SELECT * FROM dev.users WHERE username = $1", [username]);
        if(user.rows.length >= 1) {
            res.status(500).json({message: "User with this name is already exists"});
        } else {
            const postUser = await db.query("INSERT INTO dev.users (e_mail, username, password) VALUES  ($1, $2, $3)", [e_mail, username, hashedPassword]) ;
            
            const tokenData = {
                time: Date(),
                user: user.rows[0],
            };

            const token = jwt.sign(tokenData, secretKey);
            res.status(200).json({'JWT': token});
        }

    }

    async signIn(req, res) {
        const { username, password } = req.body;
    
        const user = await db.query("SELECT * FROM dev.users WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const storedHashedPassword = user.rows[0].password;
    
        const secretKey = process.env.SECRET_KEY;
        const hashedPassword = createHmac.createHash('sha256', secretKey)
                                            .update(password)
                                            .digest('hex');
    
        if (hashedPassword !== storedHashedPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const tokenData = {
            time: Date(),
            user: user.rows[0].username,
        };

        const token = jwt.sign(tokenData, secretKey);
    
        return res.status(200).json({ JWT: token });
    
    }

}

module.exports = new UsersController();