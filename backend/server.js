const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const router = require("./routes/mainRouter");
const PORT = process.env.PORT || 8080;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
