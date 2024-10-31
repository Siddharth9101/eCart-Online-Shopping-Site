const express = require("express");
const mongoose = require("mongoose");

const app = express();
try {
  mongoose.connect(
    "mongodb+srv://siddharthsaxena9101:Id7N6zwFFZPlMIQE@cluster0.pr0e4.mongodb.net/ecom"
  );
  console.log("Connected to the database");
} catch (error) {
  console.error("Error while connecting to the database");
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
