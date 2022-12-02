import "./Team.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import Loading from "../components/Loading";
import { firebaseDB } from "../service/firebase";

const Team = () => {
  const [loading, setLoading] = useState(true);

  const [topScoredTeam, setTopScoredTeam] = useState([]);
  const [topMiss, setTopMiss] = useState([]);
  const [topPossession, setTopPossession] = useState([]);
  const [topShotOnTarget, setTopShotOnTarget] = useState([]);
  const [topFoul, setTopFoul] = useState([]);

  const teamScoreRef = firebaseDB.ref("team_stats/team_score_rank/");
  const teamMissRef = firebaseDB.ref("team_stats/team_miss_rank/");
  const teamPosRef = firebaseDB.ref("team_stats/possession_rank/");
  const teamFoulRef = firebaseDB.ref("team_stats/foul_rank/");
  const teamSOTRef = firebaseDB.ref("team_stats/shot_on_target_rank/");

  useEffect(() => {
    teamScoreRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setTopScoredTeam(teamsData);
    });
    teamMissRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setTopMiss(teamsData);
    });
    teamPosRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setTopPossession(teamsData);
    });
    teamFoulRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setTopFoul(teamsData);
    });
    teamSOTRef.on("value", (snapshot) => {
      const teams = snapshot.val();
      const teamsData = [];
      for (let team in teams) {
        teamsData.push({ ...teams[team], team });
      }
      setTopShotOnTarget(teamsData);
    });
    setLoading(false);
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
