import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import ShowStandings from "./pages/Standings";
import Team from "./pages/Team";
import Players from "./pages/Players";

function App() {
  return (
    <div className="App">
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
          선수 통계
        </NavLink>
      </p>
      <br />
      <Routes>
        <Route path="/standings" element={<ShowStandings />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/players" element={<Players />}></Route>
      </Routes>
    </div>
  );
}

export default App;
