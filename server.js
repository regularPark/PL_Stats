const express = require("express");
const app = express();
const path = require("path");

app.listen(8080, function () {
  console.log(path.join(__dirname, "pl-stats/build/index.html"));
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "pl-stats/build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "pl-stats/build/index.html"));
});
