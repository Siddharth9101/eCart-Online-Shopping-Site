require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/index.js");

const app = express();

// connecting to the database
try {
  mongoose.connect(process.env.DB_URL);
  console.log("Connected to the database");
} catch (error) {
  console.error("Error while connecting to the database");
}

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", apiRouter);

// Global Catch (this will hit if there is any error in the backend)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
