const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const router = require("./routes/mainRouter");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
