import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { encodeTeamName } from "../data/teamProfiles";
import { upcomingMatches } from "../data/upcomingMatches";
import type { FormInput } from "../types/FormInput";
import "./HomePage.css";
import { IccRankingsDashboard } from "../components/IccRankingsDashboard";
import { TrophyMuseum } from "../components/TrophyMuseum";
import { HistorySearch } from "../components/HistorySearch";
import { AllTimeStats } from "../components/AllTimeStats";
import { Footer } from "../components/Footer";
import { ScoreCards } from "../components/ScoreCards";
import {
  scoreCards,
  rankingFormats,
  teamRankingsByFormat,
  rankingCategories,
  battingRankingsByFormat,
  bowlingRankingsByFormat,
  allRounderRankingsByFormat,
  iccLatestNews,
  indiaBatters,
  nzBowlers,
  liveBowlers,
  commentaryFeed,
  matchStats,
  heroShortcuts,
  TEAM_ISO,
} from "../data/mockData";

import type {
  Ranking,
  RankingFormat,
  RankingCategory,
  HeroShortcut,
} from "../types/entities";

interface HomePageProps {
  initialTab: "live" | "upcoming" | "rankings" | "news";
  theme: "light" | "dark";
  onThemeToggle: () => void;
  players: FormInput[];
}

function FlagImg({ isoCode, name }: { isoCode: string; name: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${isoCode}.png`}
      srcSet={`https://flagcdn.com/w40/${isoCode}.png 2x`}
      width={20}
      height={14}
      alt={`${name} flag`}
      className="team-flag-img"
    />
  );
}

function teamIso(name: string) {
  return TEAM_ISO[name] ?? "un";
}

function moveIndicator(move: Ranking["move"]) {
  if (move === "up") return "▲";
  if (move === "down") return "▼";
  return "■";
}

export function HomePage({ initialTab, theme, onThemeToggle, players }: HomePageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "rankings" | "news" | null>(initialTab);
  const [activeShortcut, setActiveShortcut] = useState<HeroShortcut["id"] | null>(null);
  const [selectedRankingFormat, setSelectedRankingFormat] = useState<RankingFormat>("TEST");
  const [selectedRankingCategory, setSelectedRankingCategory] = useState<RankingCategory>("batting");
  const [showLiveDashboard, setShowLiveDashboard] = useState(false);
  const [liveDetailTab, setLiveDetailTab] = useState<"scorecard" | "commentary" | "squard" | "stats">("scorecard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  type SearchResult = { type: string; label: string; sub: string; action: () => void };

  const searchResults: SearchResult[] = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: SearchResult[] = [];

    // Teams across all formats
    const seenTeams = new Set<string>();
    Object.values(teamRankingsByFormat).flat().forEach((t) => {
      if (!seenTeams.has(t.team) && t.team.toLowerCase().includes(q)) {
        seenTeams.add(t.team);
        results.push({ type: "Team", label: t.team, sub: "Cricket Team", action: () => { setSearchQuery(""); setSearchOpen(false); navigate(`/teams/${encodeTeamName(t.team)}?format=ODI`); } });
      }
    });

    // Players from Player List
    const seenPlayers = new Set<string>();
    players.forEach((p, idx) => {
      const playerName = (p.fullname || "").trim();
      if (!playerName) return;

      const key = `${playerName.toLowerCase()}|${(p.email || "").toLowerCase()}`;
      const searchable = `${playerName} ${p.email || ""} ${p.role || ""} ${p.country || ""}`.toLowerCase();

      if (!seenPlayers.has(key) && searchable.includes(q)) {
        seenPlayers.add(key);
        results.push({
          type: "Player",
          label: playerName,
          sub: p.role || p.email || "Player List",
          action: () => {
            setSearchQuery("");
            setSearchOpen(false);
            navigate(`/players/profile/${idx}`);
          },
        });
      }
    });

    // Upcoming matches
    upcomingMatches.forEach((m) => {
      const fixture = `${m.team1.name} vs ${m.team2.name}`;
      if (fixture.toLowerCase().includes(q) || m.series.toLowerCase().includes(q)) {
        results.push({ type: "Match", label: fixture, sub: m.series, action: () => { setSearchQuery(""); setSearchOpen(false); setActiveTab("upcoming"); navigate(`/upcoming/${m.id}`); } });
      }
    });

    // Live / result score cards
    scoreCards.forEach((c) => {
      const teams = `${c.team1.name} ${c.team2.name}`;
      if (teams.toLowerCase().includes(q) || c.tournament.toLowerCase().includes(q)) {
        results.push({ type: "Live", label: `${c.team1.name} vs ${c.team2.name}`, sub: c.tournament, action: () => { setSearchQuery(""); setSearchOpen(false); navigate("/live"); } });
      }
    });

    return results.slice(0, 8);
  })();

  const teamRankings = teamRankingsByFormat[selectedRankingFormat];
  const quickTeamRankings = teamRankings.slice(0, 5);
  const battingRankings = battingRankingsByFormat[selectedRankingFormat];
  const bowlingRankings = bowlingRankingsByFormat[selectedRankingFormat];
  const allRounderRankings = allRounderRankingsByFormat[selectedRankingFormat];

  const selectedPlayerRankings =
    selectedRankingCategory === "batting"
      ? battingRankings
      : selectedRankingCategory === "bowling"
        ? bowlingRankings
        : allRounderRankings;

  useEffect(() => {
    setActiveTab(initialTab);
    setActiveShortcut(null);
    setShowLiveDashboard(false);
  }, [initialTab]);

  const openTeamPage = (teamName: string) => {
    navigate(`/teams/${encodeTeamName(teamName)}?format=${selectedRankingFormat}`);
  };

  const handleHeaderNavigation = (tab: "live" | "upcoming" | "rankings" | "news") => {
    setActiveShortcut(null);
    setShowLiveDashboard(false);
    setActiveTab(tab);
    setSearchOpen(false);
  };

  const handleOpenLiveDashboard = () => {
    setActiveTab("live");
    setShowLiveDashboard(true);
    setLiveDetailTab("scorecard");
  };

  return (
    <main className="cricket-page">
      <section className="hero-shell">
        <header className="hero-topbar">
          <Link to="/live" className="brand brand-button hero-header-btn" onClick={() => handleHeaderNavigation("live")}>
            Cricly
          </Link>
          <div className="search-pill-wrap" ref={searchRef}>
            <input
              className="search-pill"
              type="search"
              placeholder="Search matches, teams, players…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              aria-label="Search matches, teams, players"
            />
            {searchOpen && searchResults.length > 0 && (
              <ul className="search-dropdown" role="listbox">
                {searchResults.map((r, i) => (
                  <li key={i} role="option" className="search-dropdown-item" onMouseDown={r.action}>
                    <span className={`search-badge search-badge-${r.type.toLowerCase()}`}>{r.type}</span>
                    <span className="search-result-label">{r.label}</span>
                    <span className="search-result-sub">{r.sub}</span>
                  </li>
                ))}
              </ul>
            )}
            {searchOpen && searchQuery.trim() && searchResults.length === 0 && (
              <div className="search-dropdown search-no-results">No results for "{searchQuery}"</div>
            )}
          </div>
          <nav className="top-links" aria-label="Primary cricket navigation">
            <NavLink to="/live" onClick={() => handleHeaderNavigation("live")} className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Live Score</NavLink>
            <NavLink to="/upcoming" onClick={() => handleHeaderNavigation("upcoming")} className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Upcoming Matches</NavLink>
            <NavLink to="/rankings" onClick={() => handleHeaderNavigation("rankings")} className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>Rankings</NavLink>
            <NavLink to="/news" onClick={() => handleHeaderNavigation("news")} className={({ isActive }) => `hero-header-btn top-link ${isActive ? "active" : ""}`}>News</NavLink>
          </nav>
          <div className="flex gap-2">
            <Link to="/players/add" className="hero-header-btn upload-btn">Player Registration</Link>
            <label className="hero-header-btn upload-btn" style={{cursor:"pointer"}}>
              📂 Upload File
              <input type="file" style={{display:"none"}} onChange={(e) => { if(e.target.files?.[0]) alert(`Selected: ${e.target.files[0].name}`); }} />
            </label>
            <button type="button" className="hero-header-btn upload-btn" onClick={onThemeToggle}>
              {theme === "light" ? "☾ Dark Theme" : "☀ Light Theme"}
            </button>
          </div>
        </header>

        <div className="hero-subbar" role="tablist" aria-label="Featured shortcuts">
          {heroShortcuts.map((shortcut) => (
            <button
              key={shortcut.id}
              type="button"
              className={`sub-link ${activeShortcut === shortcut.id ? "active" : ""}`}
              role="tab"
              aria-selected={activeShortcut === shortcut.id}
              onClick={() => {
                setActiveShortcut(shortcut.id);
                setActiveTab(null);
              }}
            >
              {shortcut.icon} {shortcut.label}
            </button>
          ))}
        </div>
      </section>

      {activeShortcut === "trophy" && <TrophyMuseum />}
      {activeShortcut === "history" && <HistorySearch />}
      {activeShortcut === "all-time" && <AllTimeStats />}

      {!activeShortcut && (
        activeTab === "upcoming" ? (
        <section className="upcoming-section" aria-label="Upcoming matches list">
          <p className="section-label">UPCOMING MATCHES</p>
          <h2>Upcoming Match Cards</h2>
          <div className="upcoming-card-row">
            {upcomingMatches.map((match) => (
              <Link className="upcoming-card-link" to={`/upcoming/${match.id}`} key={match.id}>
                <article className="upcoming-card">
                  <div className="upcoming-card-head">
                    <p>{match.series}</p>
                    <span>{match.format}</span>
                  </div>
                  <div className="upcoming-fixture">
                    <span className="upcoming-team"><FlagImg isoCode={match.team1.isoCode} name={match.team1.name} /> {match.team1.name}</span>
                    <span className="upcoming-vs">vs</span>
                    <span className="upcoming-team"><FlagImg isoCode={match.team2.isoCode} name={match.team2.name} /> {match.team2.name}</span>
                  </div>
                  <p className="upcoming-time">{match.startTime}</p>
                  <p className="upcoming-venue">{match.venue}</p>
                  <span className="primary-action">Open Match Center</span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ) : activeTab === "rankings" ? (
        <>
          <IccRankingsDashboard
            rankingFormats={rankingFormats}
            rankingCategories={rankingCategories}
            selectedRankingFormat={selectedRankingFormat}
            setSelectedRankingFormat={setSelectedRankingFormat}
            selectedRankingCategory={selectedRankingCategory}
            setSelectedRankingCategory={setSelectedRankingCategory}
            teamRankings={teamRankings}
            selectedPlayerRankings={selectedPlayerRankings}
            selectedTeam=""
            onTeamSelect={openTeamPage}
          />
        </>
      ) : activeTab === "news" ? (
        <section className="icc-news-section" aria-label="Latest ICC cricket news">
          <div className="icc-news-header">
            <p className="section-label">ICC OFFICIAL NEWS</p>
            <h2>Latest Cricket Stories From ICC</h2>
            <p>
              Headlines sourced from the official ICC news feed.
            </p>
          </div>

          <div className="icc-news-grid">
            {iccLatestNews.map((story) => (
              <article className="icc-news-card" key={story.url}>
                <p className="icc-news-category">{story.category}</p>
                <h3>{story.title}</h3>
                <div className="icc-news-meta">
                  <span>{story.age}</span>
                  <span>Source: ICC</span>
                </div>
                <a href={story.url} target="_blank" rel="noreferrer">
                  Read on ICC
                </a>
              </article>
            ))}
          </div>
        </section>
      ) : activeTab === "live" && showLiveDashboard ? (
        <section className="live-dashboard" aria-label="Detailed live scorecard">
          <div className="browser-shell">
            <div className="browser-topbar">
              <div className="browser-dots" aria-hidden="true"><span /><span /><span /></div>
              <div className="browser-url">live.cricly.com/scorecard/final-ind-vs-nz</div>
            </div>

            <div className="live-dashboard-head">
              <div className="dashboard-grid-12">
                <div className="team-panel left">
                  <img src="https://flagcdn.com/w80/in.png" alt="India flag" className="team-flag-img" />
                  <h3>India</h3>
                </div>

                <div className="live-center-panel">
                  <span className="live-pill"><span className="pulse-dot" /> LIVE</span>
                  <p>FINAL, ICC MEN'S T20 WORLD CUP 2026</p>
                  <strong>MATCH IN PROGRESS</strong>
                </div>

                <div className="team-panel right">
                  <img src="https://flagcdn.com/w80/nz.png" alt="New Zealand flag" className="team-flag-img" />
                  <h3>New Zealand</h3>
                </div>
              </div>

              <div className="score-tabs">
                <button type="button" className={`score-tab ${liveDetailTab === "scorecard" ? "active" : ""}`} onClick={() => setLiveDetailTab("scorecard")}>Scorecard</button>
                <button type="button" className={`score-tab ${liveDetailTab === "commentary" ? "active" : ""}`} onClick={() => setLiveDetailTab("commentary")}>Commentaru</button>
                <button type="button" className={`score-tab ${liveDetailTab === "squard" ? "active" : ""}`} onClick={() => setLiveDetailTab("squard")}>Squard</button>
                <button type="button" className={`score-tab ${liveDetailTab === "stats" ? "active" : ""}`} onClick={() => setLiveDetailTab("stats")}>Stats</button>
              </div>
            </div>

            {liveDetailTab === "scorecard" && (
              <>
                <article className="innings-card">
                  <div className="innings-topline">
                    <h4>INDIA</h4>
                    <strong>255-5 (20)</strong>
                  </div>
                  <table className="score-table">
                    <thead>
                      <tr><th>Batsman</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>
                    </thead>
                    <tbody>
                      {indiaBatters.map((player) => (
                        <tr key={player.name}>
                          <td><strong>{player.name}</strong><span>{player.dismissal}</span></td>
                          <td>{player.runs}</td>
                          <td>{player.balls}</td>
                          <td>{player.fours}</td>
                          <td>{player.sixes}</td>
                          <td>{player.strikeRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="bowler-brief">Bowlers: 1-4 40 ov, 0-4 15 ov, 2-4 39 ov, 4-170 (15 ov), 5-249 (19.2 ov)</p>
                </article>

                <article className="innings-card innings-card-split">
                  <div className="innings-topline innings-subhead">
                    <h4>NEW ZEALAND: [Batting First]</h4>
                    <span>159 (19)</span>
                  </div>
                  <div className="innings-split-grid">
                    <div className="table-wrap">
                      <table className="score-table">
                        <thead>
                          <tr><th>Bowler</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th></tr>
                        </thead>
                        <tbody>
                          {nzBowlers.map((bowler) => (
                            <tr key={bowler.name}>
                              <td>{bowler.name}</td>
                              <td>{bowler.overs}</td>
                              <td>{bowler.maiden}</td>
                              <td>{bowler.runs}</td>
                              <td>{bowler.wickets}</td>
                              <td>{bowler.economy.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <aside className="partnership-card">
                      <div className="mini-card-title">CURRENT PARTNERSHIP</div>
                      <strong>Guptill & Conway</strong>
                      <p>14 runs (9 balls)</p>
                      <span>Hunkey = & Conway</span>
                      <span>e.g. 1 runs (9 balls)</span>
                    </aside>
                  </div>
                  <p className="bowler-brief">Bowlers: 4. KO(L)7E 5-45 (9.2 ov), 5. S=7 (5.2 ov), 7. 5=157, 5-4 3.SR. 3262.5</p>
                </article>

                <article className="innings-card">
                  <div className="innings-topline innings-subhead">
                    <h4>BOWLER</h4>
                    <span>LIVE BOWLERS</span>
                  </div>
                  <table className="score-table">
                    <thead>
                      <tr><th>Bowler</th><th>Spell</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th></tr>
                    </thead>
                    <tbody>
                      {liveBowlers.map((bowler) => (
                        <tr key={bowler.name}>
                          <td>{bowler.name}</td>
                          <td>{bowler.spell}</td>
                          <td>{bowler.overs}</td>
                          <td>{bowler.maiden}</td>
                          <td>{bowler.runs}</td>
                          <td>{bowler.wickets}</td>
                          <td>{bowler.economy.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="bowler-brief">India 2.4 overs, 4.4.24 rv, 2.4.35 ov, 3. Kuldeep 2.4.25 srs, Pandya 1.4 ov, 43.4 O</p>
                  <div className="player-match-card">
                    <div className="player-avatar">VK</div>
                    <div className="player-match-meta">
                      <p>Player of the Match</p>
                      <h5>Virat Kohli</h5>
                      <span>72 (49) · CURRENT STATUS: INNINGS COMPLETED</span>
                    </div>
                  </div>
                </article>
              </>
            )}

            {liveDetailTab === "commentary" && (
              <article className="innings-card detail-panel">
                <div className="innings-topline">
                  <h4>LIVE COMMENTARU</h4>
                  <strong>Most Recent Overs</strong>
                </div>
                <ul className="detail-list">
                  {commentaryFeed.map((item) => (
                    <li key={item.over}>
                      <span className="detail-chip">{item.over}</span>
                      <div>
                        <h5>{item.title}</h5>
                        <p>{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {liveDetailTab === "squard" && (
              <article className="innings-card detail-panel">
                <div className="innings-topline">
                  <h4>MATCH SQUARD</h4>
                  <strong>Playing XI</strong>
                </div>
                <div className="squad-grid">
                  <div className="squad-card">
                    <h5>India</h5>
                    <p>Rohit Sharma (c)</p>
                    <p>Virat Kohli</p>
                    <p>Suryakumar Yadav</p>
                    <p>Hardik Pandya</p>
                    <p>Ravindra Jadeja</p>
                    <p>Kuldeep Yadav</p>
                  </div>
                  <div className="squad-card">
                    <h5>New Zealand</h5>
                    <p>Kane Williamson (c)</p>
                    <p>Devon Conway</p>
                    <p>Martin Guptill</p>
                    <p>Glenn Phillips</p>
                    <p>Tim Southee</p>
                    <p>Trent Boult</p>
                  </div>
                </div>
              </article>
            )}

            {liveDetailTab === "stats" && (
              <article className="innings-card detail-panel">
                <div className="innings-topline">
                  <h4>MATCH STATS</h4>
                  <strong>India vs New Zealand</strong>
                </div>
                <div className="stats-table">
                  <div className="stats-head">
                    <span>India</span>
                    <span>Metric</span>
                    <span>New Zealand</span>
                  </div>
                  {matchStats.map((row) => (
                    <div className="stats-row" key={row.label}>
                      <span>{row.india}</span>
                      <span>{row.label}</span>
                      <span>{row.newZealand}</span>
                    </div>
                  ))}
                </div>
              </article>
            )}

            <button type="button" className="ghost-action" onClick={() => setShowLiveDashboard(false)}>
              Back to Live Cards
            </button>
          </div>
        </section>
      ) : (
        <>
          <ScoreCards scoreCards={scoreCards} handleOpenLiveDashboard={handleOpenLiveDashboard} />

          <section className="content-grid">
            <article
              className="live-tracker clickable-live-card"
              role="button"
              tabIndex={0}
              onClick={handleOpenLiveDashboard}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpenLiveDashboard();
                }
              }}
            >
.
.
.

              <p className="section-label">LIVE MATCHES</p>
              <h2>Live Match Tracker</h2>
              <div className="live-meta">
                <span className="live-dot">LIVE</span>
                <span>Asia Cup · Super Four</span>
              </div>

              <div className="scoreline">
                <div>
                  <p className="tracker-team-row"><FlagImg isoCode="pk" name="Pakistan" /> Pakistan</p>
                  <strong>217/7 (50 ov)</strong>
                </div>
                <div>
                  <p className="tracker-team-row"><FlagImg isoCode="bd" name="Bangladesh" /> Bangladesh</p>
                  <strong>121/2 (18.4 ov)</strong>
                </div>
              </div>

              <p className="chase-status">Pakistan 217/7, Bangladesh need 97 runs from 188 balls</p>
              <div className="tracker-actions">
                <button type="button" className="primary-action" onClick={handleOpenLiveDashboard}>Open Live Feed</button>
                <button type="button" className="ghost-action">Ball By Ball</button>
              </div>
            </article>

            <aside className="ranking-card">
              <p className="section-label">RANKINGS</p>
              <h3>Choose a format to refresh the rating table</h3>
              <div className="formats" aria-label="Ranking formats">
                {rankingFormats.map((format) => (
                  <button
                    key={format}
                    type="button"
                    className={`format ${selectedRankingFormat === format ? "active" : ""}`}
                    onClick={() => setSelectedRankingFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>

              <p className="ranking-section-title">Team Ranking</p>
              <div className="ranking-head">
                <span>RANK</span>
                <span>TEAM</span>
                <span>RATING</span>
                <span>MOVE</span>
              </div>

              <ul className="ranking-list">
                {quickTeamRankings.map((team, index) => (
                  <li key={team.team}>
                    <span>{index + 1}</span>
                    <button
                      type="button"
                      className="ranking-team-button"
                      onClick={() => openTeamPage(team.team)}
                    >
                      <span className="ranking-team">
                        <FlagImg isoCode={teamIso(team.team)} name={team.team} />
                        <span>{team.team}</span>
                      </span>
                    </button>
                    <span>{team.rating}</span>
                    <span className={`move ${team.move}`}>{moveIndicator(team.move)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </>
      ))}
      <Footer />
    </main>
  );
}

