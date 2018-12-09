const friends = require("../data/friends");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Displays all friends
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Displays a single friend, or returns false
app.get("/api/friends/:friend", function(req, res) {
  var chosen = req.params.friend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

// Create New Friends - takes in JSON input
app.post("/api/friends", function(req, res) {
  const newfriend = req.body;

  newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newfriend);

  friends.push(newfriend);

  res.json(newfriend);
});

//initiate server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
