const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const router = require('./src/routers/routes');
const connectToMySQL = require('./src/utils/db');

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: false, limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb', parameterLimit: 50000 }));
connectToMySQL();

const upload = require('./src/utils/multer'); // Importing the upload middleware

app.use("/api", router);

// Using the upload middleware in your route


app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
