import { Link, NavLink } from "react-router-dom";
import "./CricketTopNav.css";

export function CricketTopNav() {
  return (
    <section className="cricket-top-shell">
      <header className="cricket-topbar">
        <Link to="/live" className="cricket-top-btn cricket-brand">Cricly</Link>
        <nav className="cricket-top-links" aria-label="Primary navigation">
          <NavLink to="/live" className={({ isActive }) => `cricket-top-btn ${isActive ? "active" : ""}`}>
            Live Score
          </NavLink>
          <NavLink to="/upcoming" className={({ isActive }) => `cricket-top-btn ${isActive ? "active" : ""}`}>
            Upcoming Matches
          </NavLink>
          <NavLink to="/rankings" className={({ isActive }) => `cricket-top-btn ${isActive ? "active" : ""}`}>
            Rankings
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => `cricket-top-btn ${isActive ? "active" : ""}`}>
            News
          </NavLink>
          <NavLink to="/players" className={({ isActive }) => `cricket-top-btn ${isActive ? "active" : ""}`}>
            Players
          </NavLink>
        </nav>
      </header>
      <div className="cricket-subbar" role="navigation" aria-label="Secondary navigation">
        <Link to="/players/add" className="cricket-sub-link">Player Registration</Link>
        <Link to="/players" className="cricket-sub-link">Player List</Link>
        <Link to="/players" className="cricket-sub-link">Search Players</Link>
        <Link to="/live" className="cricket-sub-link">Live Dashboard</Link>
      </div>
    </section>
  );
}
