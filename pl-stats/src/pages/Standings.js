import "./Standings.css";
import axios from "axios";
import { useEffect, useState } from "react";
const cheerio = require("cheerio");

// const standings = [];

const ShowStandings = () => {
  const [standings, setStandings] = useState([]);
  const [games, setGames] = useState([]);
  const [win, setWin] = useState([]);
  const [draw, setDraw] = useState([]);
  const [lose, setLose] = useState([]);
  const [point, setPoint] = useState([]);

  const whichLeague = (rank) => {
    if (rank < 4) return "cl";
    if (rank === 4) return "el";
    if (rank === 5) return "ec";
    else return "etc";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "https://www.scoreman.vip/football/database/league-36"
        );

        const $ = cheerio.load(resp.data);
        const elements = $(".LName");
        const wdl = $(".rankdata td");

        wdl.each((idx, el) => {
          const newItem = $(el).text();
          if (idx % 6 === 0) {
            setGames((res) => [...res, newItem]);
          } else if (idx % 6 === 1) {
            setWin((res) => [...res, newItem]);
          } else if (idx % 6 === 2) {
            setDraw((res) => [...res, newItem]);
          } else if (idx % 6 === 3) {
            setLose((res) => [...res, newItem]);
          } else if (idx % 6 === 4) {
            setPoint((res) => [...res, newItem]);
          }
        });

        elements.each((idx, el) => {
          const newItem = $(el).text();
          setStandings((teams) => [...teams, newItem]);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="standings">
      <div className="teams">
        <table>
          <thead className="head-table">
            <tr>
              <td></td>
              <td>팀 이름</td>
              <td>경기수</td>
              <td>승리</td>
              <td>무승부</td>
              <td>패배</td>
              <td>승점</td>
            </tr>
          </thead>
          <tbody>
            {standings.map((val, idx) => {
              return (
                <tr>
                  <td className={whichLeague(idx)} id="rank">
                    {idx + 1}
                  </td>
                  <td className="team-name">{val}</td>
                  <td className="res">{games[idx]}</td>
                  <td className="res">{win[idx]}</td>
                  <td className="res">{draw[idx]}</td>
                  <td className="res">{lose[idx]}</td>
                  <td className="points">{point[idx]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowStandings;
