import axios from "axios";
import "./Players.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import { Loading } from "./../components/Loading";
const cheerio = require("cheerio");

const Players = () => {
  const [loading, setLoading] = useState(true);

  const [topScorerName, setTopScorerName] = useState([]);
  const [topScorerTeam, setTopScorerTeam] = useState([]);
  const [topScorerGoal, setTopScorerGoal] = useState([]);

  const [topAssistName, setTopAssistName] = useState([]);
  const [topAssist, setTopAssist] = useState([]);
  const [topAssistTeams, setTopAssistTeams] = useState([]);

  const [topPassesName, setTopPassesName] = useState([]);
  const [topPasses, setTopPasses] = useState([]);
  const [topPassesTeams, setTopPassesTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "https://www.scoreman.vip/football/database/playertech-36"
        );

        const $ = cheerio.load(resp.data);
        const goals = $("#Total_Goals td");
        const names = $("#Total_Goals .PName");
        const teams = $("#Total_Goals .team");

        const assists = $("#Total_Assist td");
        const assistNames = $("#Total_Assist .PName");
        const assistTeams = $("#Total_Assist .team");

        const passes = $("#Total_TotalPass td");
        const passesNames = $("#Total_TotalPass .PName");
        const passesTeams = $("#Total_TotalPass .team");

        goals.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 40 && idx % 4 === 2)
            setTopScorerGoal((goals) => [...goals, newItem]);
        });

        names.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopScorerName((goals) => [...goals, newItem]);
        });

        teams.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopScorerTeam((goals) => [...goals, newItem]);
        });

        assists.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 30 && idx % 3 === 2)
            setTopAssist((goals) => [...goals, newItem]);
        });

        assistNames.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopAssistName((goals) => [...goals, newItem]);
        });

        assistTeams.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopAssistTeams((goals) => [...goals, newItem]);
        });

        passes.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 40 && idx % 4 === 2)
            setTopPasses((goals) => [...goals, newItem]);
        });

        passesNames.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopPassesName((goals) => [...goals, newItem]);
        });

        passesTeams.each((idx, el) => {
          const newItem = $(el).text();
          if (idx < 10) setTopPassesTeams((goals) => [...goals, newItem]);
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
      {loading ? (
        <Loading />
      ) : (
        <div className="player-stats">
          <div className="top-scorers">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">득점 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-head"></td>
                    <td className="stat-head">선수 이름</td>
                    <td className="stat-head">골(PK)</td>
                  </tr>
                </thead>
                <tbody>
                  {topScorerName.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topScorerTeam[idx])}
                            alt={topAssistTeams[idx]}
                          />
                        </td>
                        <td className="stats-player-list">
                          <b>{val}</b>
                          <br />
                          {topScorerTeam[idx]}
                        </td>
                        <td className="total-score">{topScorerGoal[idx]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="top-assists">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">도움 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-head"></td>
                    <td className="stat-head">선수 이름</td>
                    <td className="stat-head">도움</td>
                  </tr>
                </thead>
                <tbody>
                  {topAssistName.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topAssistTeams[idx])}
                            alt={topAssistTeams[idx]}
                          />
                        </td>
                        <td className="stats-player-list">
                          <b>{val}</b>
                          <br />
                          {topAssistTeams[idx]}
                        </td>
                        <td className="total-assist">{topAssist[idx]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="top-assists">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">패스 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-head"></td>
                    <td className="stat-head">선수 이름</td>
                    <td className="stat-head">총 패스</td>
                  </tr>
                </thead>
                <tbody>
                  {topPassesName.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(topPassesTeams[idx])}
                            alt={topPassesTeams[idx]}
                          />
                        </td>
                        <td className="stats-player-list">
                          <b>{val}</b>
                          <br />
                          {topPassesTeams[idx]}
                        </td>
                        <td className="total-passes">{topPasses[idx]}</td>
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

export default Players;
