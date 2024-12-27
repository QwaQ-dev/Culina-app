const db = require("../db/db");
const { User } = require("../models/models")
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
dotenv.config();


const generateJwt = (username, role, sex) => {
    return jwt.sign(
        {username, role, sex}, 
        process.env.SECRET_KEY, 
        {expiresIn: "12h"}
    );
};

class UsersController{
    async signUp(req, res) {
        const {e_mail, username, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 5);

        try {
            await User.create({e_mail, username, hashedPassword, role: 'Basic', sex: 'male'});
            
            const token = generateJwt(username, 'Basic', 'male');

            return res.status(200).json({'JWT': token});
        
        } catch (error) {
            return res.status(500).json({message: "Error signing up", error: error.message});
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body;
    
        const user = await db.query("SELECT * FROM dev.users WHERE username = $1", [username]);
        const userRows = user.rows[0];

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const comparePassword = await bcrypt.compare(password, userRows.password);

        if(comparePassword) {
            const token = generateJwt(userRows.username, userRows.role, userRows.sex);
    
            return res.status(200).json({ JWT: token });
        } else {
            return res.status(500).json({message: "Password is incorrect"});
        };
    }

    async newUsername(req, res){
        const { prevUsername, newUsername } = req.body;

        try {
            await db.query("UPDATE dev.users SET username = $1 WHERE username = $2",
                [newUsername, prevUsername]);
            return res.status(200).json({message: "Username has been changed!"});
        } catch (error) {
            return res.status(500).json({message: "Cannot change username", error: error.message});
        }
    }

    async newPassword(req, res){
        const { username, prevPassword, newPassword } = req.body;
        try {
            const password = await db.query("SELECT password FROM dev.users WHERE username = $1", [username]);
            const comparePassword = await bcrypt.compare(prevPassword, password.rows[0].password);

            if(comparePassword){
                const hashedNewPassword = await bcrypt.hash(newPassword, 5);

                await db.query("UPDATE dev.users SET password = $1 WHERE username = $2",
                    [hashedNewPassword, username]);
                return res.status(200).json({message: "Password has been changed!"});
            } else {
                return res.status(500).json({message: "Password is incorrect"});
            }
        } catch (error) {
            return res.status(500).json({message: "Cannot change user password", error: error.message});
        }
    }

    async newSex(req, res){
        const { username, prevSex, newSex } = req.body;

        if(prevSex === newSex) {
            return res.status(500).json({message: `Your sex is already ${newSex}`});
        } else {
            try {
                await db.query("UPDATE dev.users SET sex = $1 WHERE username = $2",
                    [newSex, username]);
                return res.status(200).json({message: "Sex has been changed!"});
            } catch (error) {
                return res.status(500).json({message: "Cannot change user sex", error: error.message});
            }
        }
    }

}

module.exports = new UsersController();