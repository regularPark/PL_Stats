import React from "react";
import "./Navigation.css";

import { NavLink, Route, Routes } from "react-router-dom";
import ShowStandings from "../pages/Standings";
import Team from "../pages/Team";
import Players from "../pages/Players";
import TeamPages from "../pages/TeamPages";

const Nav = () => {
  return (
    <div>
      <div className="nav-wrapper">
        <p className="pl-title">Premier League</p>
        <p>
          <NavLink to="/standings" className="nav-link">
            순위
          </NavLink>
        </p>
        <p>
          <NavLink to="/team" className="nav-link">
            팀 통계
          </NavLink>
        </p>
        <p>
          <NavLink to="/players" className="nav-link">
            선수 통계
          </NavLink>
        </p>
      </div>
      <div className="contents">
        <Routes>
          <Route path="/standings" element={<ShowStandings />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/players" element={<Players />}></Route>
          <Route path="/standings/:id" element={<TeamPages />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
