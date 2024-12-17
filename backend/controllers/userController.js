const db = require('../db/db');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const createHmac = require("crypto")
dotenv.config();


class UsersController{
    async postUser(req, res) {
        const {e_mail, username, password} = req.body;

        const hashedPassword = createHmac.createHash('sha256')
                                         .update(password)
                                         .digest('hex')
        const postUser = await db.query("INSERT INTO dev.users (e_mail, username, password) VALUES  ($1, $2, $3)", [e_mail, username, hashedPassword]) 
        const user = await db.query("SELECT * FROM dev.users WHERE e_mail = $1", [e_mail]);
        const jwtSecretKey = process.env.JWT_SECRET_KEY

        let data = {
            time: Date(),
            user: user.rows[0],
        }
        let token = jwt.sign(data, jwtSecretKey)

        res.status(200).json({'JWT': token})
    }


    async getUser(req, res) {
        const {id} = req.params;




        res.status(200).json({"user": user.rows[0]})
    }

}

module.exports = new UsersController();