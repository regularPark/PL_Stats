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
          <NavLink to="/standings" className="nav-link">
            순위
          </NavLink>
        </p>
        <p>
          <NavLink to="/team" className="nav-link">
            팀
          </NavLink>
        </p>
        <p>
          <NavLink to="/players" className="nav-link">
            Top10
          </NavLink>
        </p>
      </div>
      <div className="contents">
        <Routes>
          <Route path="/standings" element={<ShowStandings />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/players" element={<Players />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
