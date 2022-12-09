import "./Team.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import Loading from "../components/Loading";
import axios from "axios";

const Team = () => {
  useEffect(() => {
    axios.get("/api/team").then((response) => console.log(response.data));
  }, []);

  const [loading, setLoading] = useState(true);

  const [topScoredTeam, setTopScoredTeam] = useState([]);
  const [topMiss, setTopMiss] = useState([]);
  const [topPossession, setTopPossession] = useState([]);
  const [topShotOnTarget, setTopShotOnTarget] = useState([]);
  const [topFoul, setTopFoul] = useState([]);

  const teamScoreRank = [];
  const teamMissRank = [];
  const teamPosRank = [];
  const teamFoulRank = [];
  const teamSOTRank = [];

  const sortTeams = (players, rank) => {
    players.forEach((player, idx) => {
      if (idx > 0) rank.push(player);
    });
  };

  useEffect(() => {
    axios.get("/api/teams").then((response) => {
      response.data.forEach((val, idx) => {
        if (idx === 0) sortTeams(val, teamFoulRank);
        if (idx === 1) sortTeams(val, teamPosRank);
        if (idx === 2) sortTeams(val, teamSOTRank);
        if (idx === 3) sortTeams(val, teamMissRank);
        if (idx === 4) sortTeams(val, teamScoreRank);
      });
      setTopFoul(teamFoulRank);
      setTopMiss(teamMissRank);
      setTopPossession(teamPosRank);
      setTopShotOnTarget(teamSOTRank);
      setTopScoredTeam(teamScoreRank);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="wrap-teams">
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
                  {topScoredTeam.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{val.rank}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stat-teams">{val.team_name}</td>
                        <td className="total-team-stats">{val.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
                  {topMiss.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{val.rank}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stat-teams">{val.team_name}</td>
                        <td className="total-team-stats">{val.miss}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
                        <td className="stat-rank">{val.rank}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stat-teams">{val.team_name}</td>
                        <td className="total-team-stats">{val.possession}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="div-team">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">유효 슈팅 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-team-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-team-head"></td>
                    <td className="stat-team-head">팀 이름</td>
                    <td className="stat-team-head" id="stat-teams-right">
                      유효슛
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {topShotOnTarget.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{val.rank}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stat-teams">{val.team_name}</td>
                        <td className="total-team-stats">
                          {val.shot_on_target}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="div-team">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">파울 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-team-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-team-head"></td>
                    <td className="stat-team-head">팀 이름</td>
                    <td className="stat-team-head" id="stat-teams-right">
                      파울
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {topFoul.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{val.rank}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stat-teams">{val.team_name}</td>
                        <td className="total-team-stats">{val.foul}</td>
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
