import "./MatchCompletion.css";
import { useState } from "react";

export interface BatterStats {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

export interface BowlerStats {
  name: string;
  overs: string;
  maiden: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface MatchResult {
  id: string;
  team1: {
    name: string;
    shortName: string;
    score: number;
    wickets: number;
    isoCode?: string;
    batters?: BatterStats[];
    bowlers?: BowlerStats[];
  };
  team2: {
    name: string;
    shortName: string;
    score: number;
    wickets: number;
    isoCode?: string;
    bowlers?: BowlerStats[];
    batters?: BatterStats[];
  };
  format: "TEST" | "ODI" | "T20I";
  venue: string;
  date: string;
  winner: string;
  winMargin: string;
  manOfMatch: {
    name: string;
    team: string;
    stats: string;
  };
  highestScorer: {
    name: string;
    team: string;
    runs: number;
  };
  bestBowler: {
    name: string;
    team: string;
    wickets: number;
    runs: number;
  };
}

interface MatchCompletionProps {
  match: MatchResult;
  onStartNewMatch: () => void;
  onGoHome: () => void;
}

function FlagImg({ isoCode, name }: { isoCode?: string; name: string }) {
  if (!isoCode) {
    return null;
  }
  
  console.log(`Rendering flag for: ${name} (${isoCode})`);
  
  return (
    <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>
      <img
        src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${isoCode.toLowerCase()}.png`}
        width={32}
        height={24}
        alt={`${name} flag`}
        className="team-flag"
        style={{
          display: 'inline-block',
          width: '32px',
          height: '24px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onLoad={() => {
          console.log(`✓ Flag loaded for ${name} (${isoCode})`);
        }}
        onError={(e) => {
          console.error(`✗ Failed to load flag for ${isoCode}:`, e);
          const img = e.target as HTMLImageElement;
          if (img && img.parentNode) {
            const span = document.createElement('span');
            span.textContent = isoCode.toUpperCase();
            span.className = 'flag-fallback';
            span.style.display = 'inline-flex';
            span.style.alignItems = 'center';
            span.style.justifyContent = 'center';
            span.style.width = '32px';
            span.style.height = '24px';
            span.style.backgroundColor = '#f0f0f0';
            span.style.borderRadius = '4px';
            span.style.fontWeight = 'bold';
            span.style.fontSize = '0.75rem';
            span.style.color = '#333';
            span.style.border = '1px solid #ddd';
            img.parentNode.replaceChild(span, img);
          }
        }}
      />
    </span>
  );
}

export function MatchCompletion({
  match,
  onStartNewMatch,
  onGoHome,
}: MatchCompletionProps) {
  const [activeTeam, setActiveTeam] = useState<"team1" | "team2">("team1");
  const isTeam1Winner = match.winner === match.team1.name;

  return (
    <div className="match-completion-container">
      {/* Match Summary */}
      <div className="match-summary">
        <div className="summary-content">
          <div className="match-info">
            <span className="match-format">{match.format}</span>
            <span className="match-venue">{match.venue}</span>
          </div>

          {/* Score Board */}
          <div className="scoreboard">
            <div className={`score-card ${isTeam1Winner ? "winner" : ""}`}>
              <div className="team-header">
                <FlagImg isoCode={match.team1.isoCode} name={match.team1.name} />
                <h2 className="team-name">{match.team1.shortName}</h2>
              </div>
              <div className="score-display">
                <span className="runs">{match.team1.score}</span>
                <span className="wickets">/{match.team1.wickets}</span>
              </div>
            </div>

            <div className="vs-divider">
              <span>vs</span>
            </div>

            <div className={`score-card ${!isTeam1Winner ? "winner" : ""}`}>
              <div className="team-header">
                <FlagImg isoCode={match.team2.isoCode} name={match.team2.name} />
                <h2 className="team-name">{match.team2.shortName}</h2>
              </div>
              <div className="score-display">
                <span className="runs">{match.team2.score}</span>
                <span className="wickets">/{match.team2.wickets}</span>
              </div>
            </div>
          </div>

          <p className="result-message">
            {match.winner} won by {match.winMargin}
          </p>
        </div>
      </div>

      {/* Detailed Innings & Bowling */}
      <div className="detailed-stats-section">
        <div className="stats-header">
          <h3>Detailed Statistics</h3>
          <div className="team-toggle">
            <button
              className={`toggle-btn ${activeTeam === "team1" ? "active" : ""}`}
              onClick={() => setActiveTeam("team1")}
            >
              <FlagImg isoCode={match.team1.isoCode} name={match.team1.name} />
              {match.team1.shortName}
            </button>
            <button
              className={`toggle-btn ${activeTeam === "team2" ? "active" : ""}`}
              onClick={() => setActiveTeam("team2")}
            >
              <FlagImg isoCode={match.team2.isoCode} name={match.team2.name} />
              {match.team2.shortName}
            </button>
          </div>
        </div>

        {/* Team 1 View */}
        {activeTeam === "team1" && (
          <div className="single-team-view">
            {/* Team 1 Batting */}
            {match.team1.batters && match.team1.batters.length > 0 && (
              <div className="innings-card">
                <div className="innings-header">
                  <h4>{match.team1.name} - Batting</h4>
                  <span className="innings-score">{match.team1.score}/{match.team1.wickets}</span>
                </div>
                <div className="table-wrapper">
                  <table className="scorecard-table">
                    <thead>
                      <tr>
                        <th>Batsman</th>
                        <th>R</th>
                        <th>B</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.team1.batters.map((batter) => (
                        <tr key={batter.name}>
                          <td className="player-cell">
                            <span className="player-name">{batter.name}</span>
                            <span className="dismissal">{batter.dismissal}</span>
                          </td>
                          <td>{batter.runs}</td>
                          <td>{batter.balls}</td>
                          <td>{batter.fours}</td>
                          <td>{batter.sixes}</td>
                          <td className="strike-rate">{batter.strikeRate.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Team 2 Bowling */}
            {match.team2.bowlers && match.team2.bowlers.length > 0 && (
              <div className="bowling-card">
                <div className="bowling-header">
                  <h4>{match.team2.name} - Bowling</h4>
                </div>
                <div className="table-wrapper">
                  <table className="bowling-table">
                    <thead>
                      <tr>
                        <th>Bowler</th>
                        <th>O</th>
                        <th>M</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.team2.bowlers.map((bowler) => (
                        <tr key={bowler.name}>
                          <td className="player-name">{bowler.name}</td>
                          <td>{bowler.overs}</td>
                          <td>{bowler.maiden}</td>
                          <td>{bowler.runs}</td>
                          <td className="wickets">{bowler.wickets}</td>
                          <td>{bowler.economy.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Team 2 View */}
        {activeTeam === "team2" && (
          <div className="single-team-view">
            {/* Team 2 Batting */}
            {match.team2.batters && match.team2.batters.length > 0 && (
              <div className="innings-card">
                <div className="innings-header">
                  <h4>{match.team2.name} - Batting</h4>
                  <span className="innings-score">{match.team2.score}/{match.team2.wickets}</span>
                </div>
                <div className="table-wrapper">
                  <table className="scorecard-table">
                    <thead>
                      <tr>
                        <th>Batsman</th>
                        <th>R</th>
                        <th>B</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.team2.batters.map((batter) => (
                        <tr key={batter.name}>
                          <td className="player-cell">
                            <span className="player-name">{batter.name}</span>
                            <span className="dismissal">{batter.dismissal}</span>
                          </td>
                          <td>{batter.runs}</td>
                          <td>{batter.balls}</td>
                          <td>{batter.fours}</td>
                          <td>{batter.sixes}</td>
                          <td className="strike-rate">{batter.strikeRate.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Team 1 Bowling */}
            {match.team1.bowlers && match.team1.bowlers.length > 0 && (
              <div className="bowling-card">
                <div className="bowling-header">
                  <h4>{match.team1.name} - Bowling</h4>
                </div>
                <div className="table-wrapper">
                  <table className="bowling-table">
                    <thead>
                      <tr>
                        <th>Bowler</th>
                        <th>O</th>
                        <th>M</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {match.team1.bowlers.map((bowler) => (
                        <tr key={bowler.name}>
                          <td className="player-name">{bowler.name}</td>
                          <td>{bowler.overs}</td>
                          <td>{bowler.maiden}</td>
                          <td>{bowler.runs}</td>
                          <td className="wickets">{bowler.wickets}</td>
                          <td>{bowler.economy.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Key Statistics */}
      <div className="key-statistics">
        <h3>Key Statistics</h3>

        <div className="stats-grid">
          {/* Man of Match */}
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <p className="stat-label">Man of the Match</p>
              <p className="stat-value">{match.manOfMatch.name}</p>
              <p className="stat-team">{match.manOfMatch.team}</p>
              <p className="stat-detail">{match.manOfMatch.stats}</p>
            </div>
          </div>

          {/* Highest Scorer */}
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <p className="stat-label">Highest Scorer</p>
              <p className="stat-value">{match.highestScorer.name}</p>
              <p className="stat-team">{match.highestScorer.team}</p>
              <p className="stat-detail">{match.highestScorer.runs} runs</p>
            </div>
          </div>

          {/* Best Bowler */}
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <p className="stat-label">Best Bowler</p>
              <p className="stat-value">{match.bestBowler.name}</p>
              <p className="stat-team">{match.bestBowler.team}</p>
              <p className="stat-detail">
                {match.bestBowler.wickets}/{match.bestBowler.runs}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="completion-actions">
        <button className="action-btn primary-btn" onClick={onStartNewMatch}>
          Start New Match
        </button>
        <button className="action-btn secondary-btn" onClick={onGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
