// index.js
const express = require('express');
const dotenv = require('dotenv')
const core = require('cors')
const bodyParser = require('body-parser')
const app = express();

const router = require('./src/routers/routes')
const connectToMySQL = require('./src/utils/db');

// const upload = require('./src/utils/multer')
// const cloudinary = require('./src/utils/couldinary')

dotenv.config()

app.use(core());
app.use(bodyParser.json({ extended: false, limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb', parameterLimit: 50000 }));
connectToMySQL();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
