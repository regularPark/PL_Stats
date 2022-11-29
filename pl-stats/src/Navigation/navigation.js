import React from "react";
import "./Navigation.css";
import { NavLink, Route, Routes } from "react-router-dom";
import ShowStandings from "../pages/Standings";
import Team from "../pages/Team";
import Players from "../pages/Players";

const Nav = () => {
  return (
    <nav className="wrapper">
      <NavLink to="/standings">순위</NavLink>
      <NavLink to="/team">팀</NavLink>
      <NavLink to="/players">선수 통계</NavLink>
      <Routes>
        <Route path="/standings" element={<ShowStandings />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/players" element={<Players />}></Route>
      </Routes>
    </nav>
  );
};

export default Nav;
