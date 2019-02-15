const friends = require("../data/friends");
const fs = require("fs");

module.exports = app => {
  // Displays all friends
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  // Displays a single friend, or returns false
  app.get("/api/friends/:friend", function(req, res) {
    const chosen = req.params.friend;

    console.log(chosen);

    for (let i = 0; i < friends.length; i++) {
      if (chosen === friends[i].routeName) {
        return res.json(friends[i]);
      }
    }

    return res.json(false);
  });

  // Create New Friends - takes in JSON input
  app.post("/api/friends", function(req, res) {
    // Capture the user input object
    const userInput = req.body;
    // console.log('userInput = ' + JSON.stringify(userInput));

    // Pushing user input to JSON file
    userInput.routeName = userInput.name.replace(/\s+/g, "").toLowerCase();

    const userResponses = userInput.scores;
    // console.log('userResponses = ' + userResponses);

    // Compute best friend match
    let matchName = [];
    let matchImage = [];
    let totalDifference = 50;

    // Examine all existing friends in the list
    for (let i = 0; i < friends.length; i++) {
      // Compute differenes for each question
      let diff = 0;

      for (let j = 0; j < userResponses.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userResponses[j]);
      }

      // If lowest difference, record the friend match
      if (diff < totalDifference) {
        matchName = [];
        matchImage = [];

        totalDifference = diff;
      }
      if (diff === totalDifference) {
        matchName.push(friends[i].name);
        matchImage.push(friends[i].photo);
      }
    }
    // Add new user
    friends.push(userInput);

    // Send appropriate response
    res.json({ status: "OK", matchName: matchName, matchImage: matchImage });
  });
};
