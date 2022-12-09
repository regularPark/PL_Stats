const express = require("express");
const path = require("path");
const app = express();
const FirebaseDB = require("./config");
require("dotenv").config();

let leagueRef = FirebaseDB.ref("league_rank/");
leagueRef.on("child_added", function (data) {
  console.log(data.val());
});

let teamsRef = FirebaseDB.ref("player_stats/");
teamsRef.on("child_added", function (data) {
  console.log(data.val());
});

let playersRef = FirebaseDB.ref("team_stats/");
playersRef.on("child_added", function (data) {
  console.log(data.val());
});

app.listen(8080, function () {
  console.log(path.join(__dirname, "pl-stats/build/index.html"));
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "pl-stats/build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "pl-stats/build/index.html"));
});
