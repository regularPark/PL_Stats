import "./Standings.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import Loading from "../components/Loading";
const cheerio = require("cheerio");

const ShowStandings = () => {
  const [loading, setLoading] = useState(true);

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
    if (rank > 17) return "dl";
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
        <div className="standings">
          <div className="all-margin">
            <table className="league-table">
              <caption className="standings-caption">리그 순위</caption>
              <thead>
                <tr>
                  <td className="head-table"></td>
                  <td className="head-table"></td>
                  <td className="head-team">팀 이름</td>
                  <td className="head-table">경기수</td>
                  <td className="head-table">승리</td>
                  <td className="head-table">무승부</td>
                  <td className="head-table">패배</td>
                  <td className="head-table" id="head-point">
                    승점
                  </td>
                </tr>
              </thead>
              <tbody>
                {standings.map((val, idx) => {
                  return (
                    <tr>
                      <td className={whichLeague(idx)} id="rank">
                        {idx + 1}
                      </td>
                      <td className="team-logo">
                        <img src={TeamLogo(val)} alt={val} />
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
      )}
    </div>
  );
};

export default ShowStandings;
