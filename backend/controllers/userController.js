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
                                         .digest('hex');

        try {
            const user = await db.query("SELECT * FROM dev.users WHERE username = $1", [username]);
            if(user.rows.length >= 1) {
                res.status(500).json({message: "User with this name is already exists"});
            } else {
                await db.query("INSERT INTO dev.users (e_mail, username, password, role, sex) VALUES ($1, $2, $3, $4, $5)", 
                                [e_mail, username, hashedPassword, 'Basic', 'male']) ;

                const token = jwt.sign({username, role: "Basic", sex: "male"}, secretKey);

                res.status(200).json({'JWT': token});
            }
        
        } catch (error) {
            res.status(500).json({message: "Error signing up", error: error.message});
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
            user: JSON.stringify({
                "username": user.rows[0].username,
                "role": user.rows[0].role,
                "sex": user.rows[0].sex,
            }),
        };

        const token = jwt.sign(tokenData, secretKey);
    
        return res.status(200).json({ JWT: token });
    }

    async newUsername(req, res){
        const { prevUsername, newUsername } = req.body;

        try {
            await db.query("UPDATE dev.users SET username = $1 WHERE username = $2",
                [newUsername, prevUsername]);
            res.status(200).json({message: "Username has been changed!"});
        } catch (error) {
            res.status(500).json({message: "Cannot change username", error: error.message});
        }
    }

    async newPassword(req, res){
        const { username, prevPassword, newPassword } = req.body;
        const secretKey = process.env.SECRET_KEY;
        const passwordFromDb = await db.query("SELECT password FROM dev.users WHERE username = $1", [username]);

        const hashedPassword = createHmac.createHash('sha256', secretKey)
                                                    .update(prevPassword)
                                                    .digest('hex');
        const newHashedPassword = createHmac.createHash('sha256', secretKey)
                                                        .update(newPassword)
                                                        .digest('hex');

        if(passwordFromDb.rows[0].password == hashedPassword) {
            try {
                await db.query("UPDATE dev.users SET password = $1 WHERE username = $2",
                    [newHashedPassword, username]);
                res.status(200).json({message: "Password has been changed!"});
            } catch (error) {
                res.status(500).json({message: "Cannot change user password", error: error.message});
            }
        } else {
            res.status(500).json({message: "Password is incorrect"})
        }
    }

    async newSex(req, res){
        const { username, prevSex, newSex } = req.body;

        if(prevSex === newSex) {
            res.status(500).json({message: `Your sex is already ${newSex}`});
        } else {
            try {
                await db.query("UPDATE dev.users SET sex = $1 WHERE username = $2",
                    [newSex, username]);
                res.status(200).json({message: "Sex has been changed!"});
            } catch (error) {
                res.status(500).json({message: "Cannot change user sex", error: error.message});
            }
        }
    }

}

module.exports = new UsersController();