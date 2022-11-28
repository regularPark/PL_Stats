const standings = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c33b72b886mshad567ef50e3e4ebp102b2fjsn0acac325e2e8",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

fetch(
  "https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39",
  standings
)
  .then((response) => response.json())
  .then((response) => {
    let text = "<ul>";
    console.log(response);
    console.log(response.parameters.season);
    response.response[0].league.standings[0].forEach((team) => {
      text += "<li >" + team.rank + " " + team.team.name + "</li>";
      //   + team.team.logo
    });
    text += "</ul>";

    document.getElementById("standings").innerHTML = text;
  })
  .catch((err) => console.error(err));

// // console.log(standings_board);
