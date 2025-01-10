const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require("./routes/mainRouter");
const sequelize = require("./db/db");
const models = require("./models/models");
const uploadImagesMiddleware = require("./middleware/uploadImagesMiddleware");

const { typesenseFill, createCollectionIfNotExist } = require("./search/Typesense"); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use('/uploads/:author/receipts-imgs', uploadImagesMiddleware);
app.use('/api/v1', apiRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await createCollectionIfNotExist(); 
        await typesenseFill();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error during server startup:", error);
    }
}

start();
