import { Link, Navigate, NavLink, useParams, useSearchParams } from "react-router-dom";
import { decodeTeamName, getTeamFocusProfile, type RankingFormat } from "../data/teamProfiles";
import "./TeamDetailsPage.css";

type TeamDetailsPageProps = {
  defaultFormat?: RankingFormat;
};

export function TeamDetailsPage({ defaultFormat = "ODI" }: TeamDetailsPageProps) {
  const { teamName } = useParams<{ teamName: string }>();
  const [searchParams] = useSearchParams();

  if (!teamName) {
    return <Navigate to="/rankings" replace />;
  }

  const decodedTeamName = decodeTeamName(teamName);
  const requestedFormat = searchParams.get("format");
  const format: RankingFormat =
    requestedFormat === "TEST" || requestedFormat === "ODI" || requestedFormat === "T20"
      ? requestedFormat
      : defaultFormat;
  const profile = getTeamFocusProfile(decodedTeamName, format);

  return (
    <main className="cricket-page team-details-page">
      <section className="hero-shell team-page-shell">
        <header className="hero-topbar">
          <Link to="/live" className="brand brand-button hero-header-btn">
            Cricly
          </Link>
          <div className="search-pill">Team profile: {decodedTeamName}</div>
          <nav className="top-links" aria-label="Primary cricket navigation">
            <NavLink to="/live" className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Live Score</NavLink>
            <NavLink to="/upcoming" className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Upcoming Matches</NavLink>
            <NavLink to="/rankings" className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Rankings</NavLink>
            <NavLink to="/news" className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>News</NavLink>
          </nav>
          <div className="flex gap-2 team-details-header-actions">
            <Link to="/rankings" className="hero-header-btn upload-btn">Back to Rankings</Link>
            <label className="hero-header-btn upload-btn" style={{cursor:"pointer"}}>
              📂 Upload File
              <input type="file" style={{display:"none"}} onChange={(e) => { if(e.target.files?.[0]) alert(`Selected: ${e.target.files[0].name}`); }} />
            </label>
          </div>
        </header>

        <div className="hero-subbar" aria-label="Featured shortcuts">
          <Link to="/live" className="sub-link">🏆 Trophy Museum</Link>
          <Link to="/live" className="sub-link">📚 Match History</Link>
          <Link to="/live" className="sub-link">📊 All-Time Stats</Link>
        </div>
      </section>

      <section className="team-details-hero">
        <p className="team-details-eyebrow">Cricket Team Profile</p>
        <h1>{decodedTeamName}</h1>
        <p>{profile.summary}</p>
        <div className="team-details-actions">
          <Link to="/rankings">Back to Rankings</Link>
          <Link to="/live">Back to Home</Link>
        </div>
      </section>

      <section className="team-details-grid">
        <article className="team-details-card">
          <h2>Team Snapshot</h2>
          <div className="team-details-meta">
            <span>Captain</span>
            <strong>{profile.captain}</strong>
            <span>Coach</span>
            <strong>{profile.coach}</strong>
            <span>Base</span>
            <strong>{profile.homeBase}</strong>
          </div>
        </article>

        <article className="team-details-card">
          <h2>Squad Core</h2>
          <ul className="team-details-list">
            {profile.squad.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </article>

        <article className="team-details-card team-details-card-wide">
          <h2>Upcoming Matches</h2>
          <div className="team-details-matches">
            {profile.upcomingMatches.map((match) => (
              <div className="team-details-match" key={`${match.fixture}-${match.date}`}>
                <strong>{match.fixture}</strong>
                <span>{match.series}</span>
                <span>{match.date}</span>
                <span>{match.venue}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="team-details-card team-details-card-wide">
          <h2>Cricket Focus</h2>
          <ul className="team-details-list">
            {profile.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}