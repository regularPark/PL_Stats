const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/index");

app.use("/api", api);

app.listen(8080, function () {
  console.log(path.join(__dirname, "pl-stats/build/index.html"));
  console.log("listening on 8080");
});

app.get("/standings", function (request, response) {
  response.sendFile(path.join(__dirname, "pl-stats/build/index.html"));
});
