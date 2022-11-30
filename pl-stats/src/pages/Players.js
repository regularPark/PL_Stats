import axios from "axios";
import "./Players.css";
import { useEffect, useState } from "react";
const cheerio = require("cheerio");

const Players = () => {
  const [topScorerName, setTopScorerName] = useState([]);
  const [topScorerTeam, setTopScorerTeam] = useState([]);
  const [topScorerGoal, setTopScorerGoal] = useState([]);

  const [topAssistName, setTopAssistName] = useState([]);
  const [topAssist, setTopAssist] = useState([]);
  const [topAssistTeams, setTopAssistTeams] = useState([]);

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
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="top-scorers">
        <table>
          <caption>득점 순위</caption>
          <thead>
            <tr>
              <td className="score-rank">순위</td>
              <td>선수 이름</td>
              <td>소속팀</td>
              <td>골(pk)</td>
            </tr>
          </thead>
          <tbody>
            {topScorerName.map((val, idx) => {
              return (
                <tr>
                  <td className="score-rank">{idx + 1}</td>
                  <td>{val}</td>
                  <td>{topScorerTeam[idx]}</td>
                  <td>{topScorerGoal[idx]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <div className="top-scorers">
        <table>
          <caption>도움 순위</caption>
          <thead>
            <tr>
              <td className="assist-rank">순위</td>
              <td>선수 이름</td>
              <td>소속팀</td>
              <td>도움</td>
            </tr>
          </thead>
          <tbody>
            {topAssistName.map((val, idx) => {
              return (
                <tr>
                  <td className="assist-rank">{idx + 1}</td>
                  <td>{val}</td>
                  <td>{topAssistTeams[idx]}</td>
                  <td>{topAssist[idx]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
