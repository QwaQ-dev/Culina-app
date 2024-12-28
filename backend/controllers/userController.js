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
            await User.create({
                e_mail, 
                username, 
                password: hashedPassword, 
                role: 'Basic', 
                sex: 'male'
            });
            
            const token = generateJwt(username, 'Basic', 'male');

            return res.status(200).json({'JWT': token});
        
        } catch (error) {
            return res.status(500).json({message: "Error signing up", error: error.message});
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body;
    
        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (user.length === 0) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(comparePassword) {
            const token = generateJwt(user.username, user.role, user.sex);
    
            return res.status(200).json({
                 JWT: token 
                });
        } else {
            return res.status(500).json({
                message: "Password is incorrect"
            });
        };
    }

    async check(req, res) {
        const token = generateJwt(req.username, req.role, req.sex)
        return res.status(200).json({token: token})
    }

    async newUsername(req, res){
        const { prevUsername, newUsername } = req.body;

        if(prevUsername === newUsername) {
            return res.status(500).json({message: `Your name is already ${prevUsername}`})
        } else {
            try {
                await User.update({
                    username: newUsername
                }, 
                {
                    where: {
                        username: prevUsername
                    }
                })
                return res.status(200).json({message: "Username has been changed!"});
            } catch (error) {
                return res.status(500).json({message: "Cannot change username", error: error.message});
            }
        }
    }

    async newPassword(req, res){
        const { username, prevPassword, newPassword } = req.body;
        try {
            const password = await User.findOne({
                where: {
                    username: username
                }
            })
            const comparePassword = await bcrypt.compare(prevPassword, password[0].password);

            if(comparePassword){
                const newHashedPassword = await bcrypt.hash(newPassword, 5);

                await User.update({
                    password: newHashedPassword
                }, 
                {
                    where: {
                        username: username,
                    }
                });
                return res.status(200).json({
                    message: "Password has been changed!"
                });
            } else {
                return res.status(500).json({
                    message: "Password is incorrect"
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Cannot change user password", error: error.message
            });
        }
    }

    async newSex(req, res){
        const { username, prevSex, newSex } = req.body;

        if(prevSex === newSex) {
            return res.status(500).json({message: `Your sex is already ${newSex}`});
        } else {
            try {
                await User.update({
                    sex: 
                        newSex
                    },
                    {
                        where: {
                        username: username,
                    }
                })
                return res.status(200).json({message: "Sex has been changed!"});
            } catch (error) {
                return res.status(500).json({message: "Cannot change user sex", error: error.message});
            }
        }
    }

}

module.exports = new UsersController();