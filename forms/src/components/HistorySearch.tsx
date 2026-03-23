import { useState } from 'react';
import './HistorySearch.css';

const matchHistories = {
  'ind-pak': {
    title: 'World Cup Rivalry',
    team1: { flag: '🇮🇳', code: 'IND', wins: 8 },
    team2: { flag: '🇵🇰', code: 'PAK', wins: 0 },
    stats: [
      { label: "Matches Played", val: "8" },
      { label: "Ties/No Result", val: "0" },
      { label: "Highest Team Total", val: "IND 336/5 (2019)" },
      { label: "Lowest Team Total", val: "PAK 173 (1992)" }
    ],
    recent: [
      { year: "2023", result: "India won by 7 wickets", venue: "Ahmedabad" },
      { year: "2019", result: "India won by 89 runs (DLS)", venue: "Manchester" },
      { year: "2015", result: "India won by 76 runs", venue: "Adelaide" },
      { year: "2011", result: "India won by 29 runs", venue: "Mohali" },
    ]
  },
  'aus-eng': {
    title: 'The Ashes',
    team1: { flag: '🇦🇺', code: 'AUS', wins: 34 },
    team2: { flag: '🏴', code: 'ENG', wins: 32 },
    stats: [
      { label: "Total Series", val: "73" },
      { label: "Drawn Series", val: "7" },
      { label: "Matches Won (AUS)", val: "150" },
      { label: "Matches Won (ENG)", val: "110" }
    ],
    recent: [
      { year: "2023", result: "Series Drawn 2-2 (AUS retained)", venue: "England" },
      { year: "2021/22", result: "Australia won 4-0", venue: "Australia" },
      { year: "2019", result: "Series Drawn 2-2 (AUS retained)", venue: "England" },
      { year: "2017/18", result: "Australia won 4-0", venue: "Australia" },
    ]
  }
};

export function HistorySearch() {
  const [query, setQuery] = useState('');
  const [selectedMatchupId, setSelectedMatchupId] = useState<keyof typeof matchHistories | null>(null);

  const selectedMatchup = selectedMatchupId ? matchHistories[selectedMatchupId] : null;

  if (selectedMatchup) {
    return (
      <section className="history-search detailed-view">
        <button className="back-btn" onClick={() => setSelectedMatchupId(null)}>
          &larr; Back to Search
        </button>
        
        <div className="history-detail-header">
          <div className="showcase-teams mega-teams">
            <span className="team-badge">{selectedMatchup.team1.flag} {selectedMatchup.team1.code}</span>
            <span className="vs">vs</span>
            <span className="team-badge">{selectedMatchup.team2.flag} {selectedMatchup.team2.code}</span>
          </div>
          <h2>{selectedMatchup.title}</h2>
        </div>

        <div className="history-detail-grid">
          <div className="history-stats-box">
            <h3>Overall Record</h3>
            <div className="stat-grid-inner">
              {selectedMatchup.stats.map(s => (
                <div key={s.label} className="stat-cell">
                  <span>{s.label}</span>
                  <strong>{s.val}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="history-recent-box">
            <h3>Recent Encounters</h3>
            <div className="recent-list">
              {selectedMatchup.recent.map((match, idx) => (
                <div key={idx} className="recent-row">
                  <div className="recent-year-venue">
                    <strong>{match.year}</strong>
                    <span>{match.venue}</span>
                  </div>
                  <div className="recent-result">{match.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="history-search" aria-label="History Search">
      <div className="search-header">
        <h2>Head-to-Head History Search</h2>
        <p>Quick lookup for iconic rivalries, bilateral records, and venue-wise match outcomes.</p>
        
        <div className="search-bar-container">
          <input 
            type="text" 
            className="history-search-input" 
            placeholder="Search teams, rivalries, venues (e.g., India vs Pakistan)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="search-btn">🔍 Search</button>
        </div>
      </div>

      <div className="search-suggestions">
        <p className="suggestions-label">Popular Searches:</p>
        <div className="suggestion-tags">
          <button type="button" className="suggestion-tag" onClick={() => setSelectedMatchupId('ind-pak')}>India vs Pakistan</button>
          <button type="button" className="suggestion-tag" onClick={() => setSelectedMatchupId('aus-eng')}>The Ashes</button>
          <button type="button" className="suggestion-tag">Lord's Finals</button>
          <button type="button" className="suggestion-tag">Highest Chases</button>
        </div>
      </div>

      <div className="history-showcase">
        <div className="showcase-card" onClick={() => setSelectedMatchupId('ind-pak')} role="button" tabIndex={0}>
          <div className="showcase-teams">
            <span className="team-badge">🇮🇳 IND</span>
            <span className="vs">vs</span>
            <span className="team-badge">🇵🇰 PAK</span>
          </div>
          <h4>World Cup Rivalry</h4>
          <div className="stat-row">
            <span>ODI World Cup</span>
            <strong>IND 8 - 0 PAK</strong>
          </div>
          <div className="stat-row">
            <span>T20 World Cup</span>
            <strong>IND 7 - 1 PAK</strong>
          </div>
          <button type="button" className="view-full-btn">View Full Details</button>
        </div>

        <div className="showcase-card" onClick={() => setSelectedMatchupId('aus-eng')} role="button" tabIndex={0}>
          <div className="showcase-teams">
            <span className="team-badge">🇦🇺 AUS</span>
            <span className="vs">vs</span>
            <span className="team-badge">🏴 ENG</span>
          </div>
          <h4>The Ashes</h4>
          <div className="stat-row">
            <span>Series Wins</span>
            <strong>AUS 34 - 32 ENG</strong>
          </div>
          <div className="stat-row">
            <span>Matches Won</span>
            <strong>AUS 150 - 110 ENG</strong>
          </div>
          <button type="button" className="view-full-btn">View Full Details</button>
        </div>
      </div>
    </section>
  );
}
