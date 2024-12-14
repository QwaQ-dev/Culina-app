const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
