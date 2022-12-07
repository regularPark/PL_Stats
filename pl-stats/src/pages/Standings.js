import "./Standings.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import Loading from "../components/Loading";
import { firebaseDB } from "../service/firebase";
import TeamPages from "./TeamPages";
import { Link, useNavigate } from "react-router-dom";

const ShowStandings = () => {
  const [loading, setLoading] = useState(true);

  const [standings, setStandings] = useState([]);

  const rankRef = firebaseDB.ref("league_rank/");

  const whichLeague = (rank) => {
    if (rank < 4) return "cl";
    if (rank === 4) return "el";
    if (rank === 5) return "ec";
    if (rank > 17) return "dl";
    else return "etc";
  };
  useEffect(() => {
    rankRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setStandings(teamsData);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const teamPagesHandler = (event) => {
    let teamName = event.target.innerText;
    console.log(event.target);
    return (
      <Link to={`/${teamName}`}>
        <TeamPages id={teamName} />
      </Link>
    );
  };

  const navigate = useNavigate();

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
                        {val.rank}
                      </td>
                      <td className="std-team-logo">
                        <img
                          src={TeamLogo(val.team_name)}
                          alt={val.team_name}
                        />
                      </td>
                      <td
                        className="team-name"
                        onClick={() => navigate(`/standings/${val.team_name}`)}
                        key={val.team_name}
                      >
                        {val.team_name}
                      </td>
                      <td className="res">{val.G}</td>
                      <td className="res">{val.W}</td>
                      <td className="res">{val.D}</td>
                      <td className="res">{val.L}</td>
                      <td className="points">{val.Pt}</td>
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
