import React from "react";
import "./Navigation.css";

import { NavLink, Route, Routes } from "react-router-dom";
import ShowStandings from "../pages/Standings";
import Team from "../pages/Team";
import Players from "../pages/Players";

const Nav = () => {
  return (
    <div>
      <div className="nav-wrapper">
        <p className="pl-title">Premier League</p>
        <p>
          <NavLink to="/PL_Stats" className="nav-link">
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
          <Route path="/PL_Stats" element={<ShowStandings />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/players" element={<Players />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
