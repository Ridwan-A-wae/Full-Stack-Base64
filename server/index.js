const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const imageRoute = require("./routes/imageRouter");

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/image", imageRoute);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
