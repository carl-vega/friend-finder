const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//server get request
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

//initiate server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
