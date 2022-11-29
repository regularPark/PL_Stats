import axios from "axios";
import { useEffect, useState } from "react";
const cheerio = require("cheerio");

// const standings = [];

const ShowStandings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "https://www.scoreman.vip/football/database/league-36"
        );

        const $ = cheerio.load(resp.data);
        const elements = $(".LName");

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

  console.log(standings);

  return (
    <div>
      <ul>
        {standings.map((val, idx) => {
          return <li key={idx + 1}>{idx + 1 + " " + val}</li>;
        })}
      </ul>
    </div>
  );
};

export default ShowStandings;
