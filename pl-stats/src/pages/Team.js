import axios from "axios";
import "./Team.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import Loading from "../components/Loading";
const cheerio = require("cheerio");

const Team = () => {
  const [loading, setLoading] = useState(true);

  const [topScoredTeam, setTopScoredTeam] = useState([]);
  const [topScoredGoal, setTopScoredGoal] = useState([]);

  const [topGoalAgainst, setTopGoalAgainst] = useState([]);
  const [topGoalAgainstTeams, setTopGoalAgainstTeams] = useState([]);

  const [topPossession, setTopPossession] = useState([]);
  const [topPossessionTeams, setTopPossessionTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("/football/database/leagueteamtech-36");

        const $ = cheerio.load(resp.data);
        const goals = $("#Total_GOALS td");
        const goalsNames = $("#Total_GOALS .LName");

        const goalAgainst = $("#Total_MISS td");
        const goalAgainstNames = $("#Total_MISS .LName");

        const possession = $("#Total_BALLCONTROL td");
        const possessionNames = $("#Total_BALLCONTROL .LName");

        goals.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 40 && idx % 4 === 2)
            setTopScoredGoal((goals) => [...goals, newItem]);
        });

        goalsNames.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopScoredTeam((goals) => [...goals, newItem]);
        });

        goalAgainst.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 40 && idx % 4 === 2)
            setTopGoalAgainst((goals) => [...goals, newItem]);
        });

        goalAgainstNames.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopGoalAgainstTeams((goals) => [...goals, newItem]);
        });

        possession.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 30 && idx % 3 === 2)
            setTopPossession((goals) => [...goals, newItem]);
        });

        possessionNames.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopPossessionTeams((goals) => [...goals, newItem]);
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className="team-stats">
          <div className="div-team">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">팀 득점 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-team-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-team-head"></td>
                    <td className="stat-team-head">팀 이름</td>
                    <td className="stat-team-head" id="stat-teams-right">
                      득점
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {topScoredGoal.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topScoredTeam[idx])}
                            alt={topScoredTeam[idx]}
                          />
                        </td>
                        <td className="stat-teams">{topScoredTeam[idx]}</td>
                        <td className="total-team-stats">{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="div-team">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">팀 실점 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-team-head">순위</td>
                    <td className="stat-team-head"></td>
                    <td className="stat-team-head">팀 이름</td>
                    <td className="stat-team-head" id="stat-teams-right">
                      실점
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {topGoalAgainst.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topGoalAgainstTeams[idx])}
                            alt={topGoalAgainstTeams[idx]}
                          />
                        </td>
                        <td className="stat-teams">
                          {topGoalAgainstTeams[idx]}
                        </td>
                        <td className="total-team-stats">{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="div-team">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">점유율 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-team-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-team-head"></td>
                    <td className="stat-team-head">팀 이름</td>
                    <td className="stat-team-head" id="stat-teams-right">
                      점유율
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {topPossession.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topPossessionTeams[idx])}
                            alt={topPossessionTeams[idx]}
                          />
                        </td>
                        <td className="stat-teams">
                          {topPossessionTeams[idx]}
                        </td>
                        <td className="total-team-stats">{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
