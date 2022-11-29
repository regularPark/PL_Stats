import axios from "axios";
import { useEffect } from "react";
const cheerio = require("cheerio");

const standings = [];

const ShowStandings = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "https://www.scoreman.vip/football/database/league-36"
        );

        const $ = cheerio.load(resp.data);
        const elements = $(".LName");

        elements.each((idx, el) => {
          standings.push([$(el).text()]);
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
      <ul></ul>
    </div>
  );
};

export default ShowStandings;
