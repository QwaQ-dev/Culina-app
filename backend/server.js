const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require("./routes/mainRouter");
const sequelize = require("./db/db");
const models = require("./models/models")
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path")


dotenv.config();
app.use(cors());
app.use(express.json());
const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()