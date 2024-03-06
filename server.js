const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/urls-base")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
