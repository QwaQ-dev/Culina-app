const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require("./routes/mainRouter");
const sequelize = require("./db/db");
const models = require("./models/models")
const app = express();
const PORT = process.env.PORT || 8080;
const uploadImagesMiddleware = require("./middleware/uploadImagesMiddleware");

dotenv.config();

app.use(cors());

app.use(express.json());
app.use('/uploads/:author/receipts-imgs', uploadImagesMiddleware);
app.use('/api/v1', apiRouter)

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