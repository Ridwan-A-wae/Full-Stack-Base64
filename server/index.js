const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
require("dotenv").config()
const bodyParser = require('body-parser');

const imageRoute = require("./routes/imageRouter")

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())
app.use(express.json())


app.use('/api/image', imageRoute)

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})