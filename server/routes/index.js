const express = require("express");
const router = express.Router();
const FirebaseDB = require("../../config");

let league_rank = [];
let leagueRef = FirebaseDB.ref("league_rank/");
leagueRef.on("child_added", function (data) {
  league_rank.push(data.val());
});

let team_rank = [];
let teamsRef = FirebaseDB.ref("team_stats/");
teamsRef.on("child_added", function (data) {
  team_rank.push(data.val());
});

let player_rank = [];
let playersRef = FirebaseDB.ref("player_stats/");
playersRef.on("child_added", function (data) {
  player_rank.push(data.val());
});

router.get("/", (req, res) => {
  console.log("http://localhost:8080/api/");
  res.send({ title: "hello react!" });
});

router.get("/standings", (req, res) => {
  res.send(league_rank);
  //   leagueRef.on("child_added", function (data) {
  //     res.send(data);
  //   });
});

router.get("/teams", (req, res) => {
  res.send(team_rank);
});

router.get("/players", (req, res) => {
  res.send(player_rank);
});

module.exports = router;
