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
        <ul className="rank">
          {standings.map((val, idx) => {
            return <li key={idx + val}>{idx + 1}</li>;
          })}
        </ul>
        <ul className="team-name">
          {standings.map((val, idx) => {
            return <li key={idx + val}>{val}</li>;
          })}
        </ul>
      </div>
      <div className="recent-games">
        <ul>
          {games.map((val, idx) => {
            return <li key={val + idx}>{val}</li>;
          })}
        </ul>
        <ul>
          {win.map((val, idx) => {
            return <li key={val + idx}>{val}</li>;
          })}
        </ul>
        <ul>
          {draw.map((val, idx) => {
            return <li key={val + idx}>{val}</li>;
          })}
        </ul>
        <ul>
          {lose.map((val, idx) => {
            return <li key={val + idx}>{val}</li>;
          })}
        </ul>
        <ul>
          {point.map((val, idx) => {
            return <li key={val + idx}>{val}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ShowStandings;
