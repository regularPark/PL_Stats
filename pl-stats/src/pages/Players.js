import "./Players.css";
import { useEffect, useState } from "react";
import TeamLogo from "./../components/TeamLogo";
import { Loading } from "./../components/Loading";
import axios from "axios";

const Players = () => {
  const [loading, setLoading] = useState(true);

  const [topScorer, setTopScorer] = useState([]);
  const [topAssist, setTopAssist] = useState([]);
  const [topDribbler, setTopDribbler] = useState([]);
  const [topKeyPasser, setTopKeyPasser] = useState([]);
  const [topPasser, setTopPasser] = useState([]);

  const assistRank = [];
  const scoreRank = [];
  const dribbleRank = [];
  const keyPassesRank = [];
  const passesRank = [];

  const sortPlayers = (players, rank) => {
    players.forEach((player, idx) => {
      if (idx > 0) rank.push(player);
    });
  };

  useEffect(() => {
    axios.get("/api/players").then((response) => {
      response.data.forEach((val, idx) => {
        if (idx === 0) sortPlayers(val, assistRank);
        if (idx === 1) sortPlayers(val, dribbleRank);
        if (idx === 2) sortPlayers(val, keyPassesRank);
        if (idx === 3) sortPlayers(val, passesRank);
        if (idx === 4) sortPlayers(val, scoreRank);
      });
      setTopScorer(scoreRank);
      setTopAssist(assistRank);
      setTopDribbler(dribbleRank);
      setTopKeyPasser(keyPassesRank);
      setTopPasser(passesRank);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                  {topScorer.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stats-player-list">
                          <span style={{ fontWeight: "bold" }}>{val.name}</span>
                          <br />
                          {val.team_name}
                        </td>
                        <td className="total-score">{val.goal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
                  {topAssist.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stats-player-list">
                          <span style={{ fontWeight: "bold" }}>{val.name}</span>
                          <br />
                          {val.team_name}
                        </td>
                        <td className="total-assist">{val.assist}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="top-assists">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">키 패스 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-head"></td>
                    <td className="stat-head">선수 이름</td>
                    <td className="stat-head">키 패스</td>
                  </tr>
                </thead>
                <tbody>
                  {topKeyPasser.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stats-player-list">
                          <span style={{ fontWeight: "bold" }}>{val.name}</span>
                          <br />
                          {val.team_name}
                        </td>
                        <td className="total-passes">{val.key_pass}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="top-assists">
            <div className="stat-margin">
              <table>
                <caption className="stat-caption">드리블 순위</caption>
                <thead>
                  <tr>
                    <td className="stat-head" id="score-rank">
                      순위
                    </td>
                    <td className="stat-head"></td>
                    <td className="stat-head">선수 이름</td>
                    <td className="stat-head">드리블</td>
                  </tr>
                </thead>
                <tbody>
                  {topDribbler.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stats-player-list">
                          <span style={{ fontWeight: "bold" }}>{val.name}</span>
                          <br />
                          {val.team_name}
                        </td>
                        <td className="total-passes">{val.dribble}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
                    <td className="stat-head">패스</td>
                  </tr>
                </thead>
                <tbody>
                  {topPasser.map((val, idx) => {
                    return (
                      <tr>
                        <td className="stat-rank">{idx + 1}</td>
                        <td className="team-logo">
                          <img
                            src={TeamLogo(val.team_name)}
                            alt={val.team_name}
                          />
                        </td>
                        <td className="stats-player-list">
                          <span style={{ fontWeight: "bold" }}>{val.name}</span>
                          <br />
                          {val.team_name}
                        </td>
                        <td className="total-passes">{val.pass}</td>
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
