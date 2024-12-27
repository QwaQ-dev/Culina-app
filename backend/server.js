const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const apiRouter = require("./routes/mainRouter");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});