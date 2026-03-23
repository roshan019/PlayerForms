import { useState } from 'react';
import './TrophyMuseum.css';

const trophies = [
  { 
    id: 'odi', title: 'ICC Men\'s Cricket World Cup', icon: '🏆', 
    winners: [
      { year: 2023, team: "Australia", host: "India" },
      { year: 2019, team: "England", host: "England/Wales" },
      { year: 2015, team: "Australia", host: "Aus/NZ" },
      { year: 2011, team: "India", host: "Ind/SL/BD" },
      { year: 2007, team: "Australia", host: "West Indies" },
      { year: 2003, team: "Australia", host: "South Africa" },
      { year: 1999, team: "Australia", host: "England" },
    ]
  },
  { 
    id: 't20', title: 'ICC Men\'s T20 World Cup', icon: '🏏', 
    winners: [
      { year: 2024, team: "India", host: "WI/USA" },
      { year: 2022, team: "England", host: "Australia" },
      { year: 2021, team: "Australia", host: "UAE/Oman" },
      { year: 2016, team: "West Indies", host: "India" },
      { year: 2014, team: "Sri Lanka", host: "Bangladesh" },
      { year: 2012, team: "West Indies", host: "Sri Lanka" },
      { year: 2010, team: "England", host: "West Indies" },
    ]
  },
  { 
    id: 'wtc', title: 'ICC World Test Championship', icon: '🛡️', 
    winners: [
      { year: 2023, team: "Australia", host: "England (Final)" },
      { year: 2021, team: "New Zealand", host: "England (Final)" }
    ]
  },
  { 
    id: 'ct', title: 'ICC Champions Trophy', icon: '🏅', 
    winners: [
      { year: 2017, team: "Pakistan", host: "England/Wales" },
      { year: 2013, team: "India", host: "England/Wales" },
      { year: 2009, team: "Australia", host: "South Africa" },
      { year: 2006, team: "Australia", host: "India" },
    ]
  },
];

export function TrophyMuseum() {
  const [selectedTrophyId, setSelectedTrophyId] = useState<string | null>(null);

  const selectedTrophy = trophies.find(t => t.id === selectedTrophyId);

  if (selectedTrophy) {
    return (
      <section className="trophy-museum detailed-view" aria-label={`${selectedTrophy.title} Details`}>
        <button className="back-btn" onClick={() => setSelectedTrophyId(null)}>
          &larr; Back to Museum Gallery
        </button>
        <div className="trophy-detail-header">
          <div className="trophy-icon-large">{selectedTrophy.icon}</div>
          <h2>{selectedTrophy.title}</h2>
          <p>Complete list of champions and host nations.</p>
        </div>
        <div className="winners-list">
          {selectedTrophy.winners.map(winner => (
            <div key={winner.year} className="winner-row">
              <span className="winner-year">{winner.year}</span>
              <strong className="winner-team">{winner.team}</strong>
              <span className="winner-host">Hosted in: {winner.host}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="trophy-museum" aria-label="Trophy Museum">
      <div className="trophy-header">
        <h2>ICC Trophy Museum</h2>
        <p>Explore major ICC winners and finals history across ODI, T20I, and Test events.</p>
      </div>
      <div className="trophy-gallery">
        {trophies.map((trophy) => (
          <div key={trophy.id} className="trophy-card" onClick={() => setSelectedTrophyId(trophy.id)} role="button" tabIndex={0}>
            <div className="trophy-icon">{trophy.icon}</div>
            <h3>{trophy.title}</h3>
            <div className="trophy-years">
              {trophy.winners.slice(0, 3).map(w => (
                <span key={w.year} className="year-pill">{w.year}</span>
              ))}
              {trophy.winners.length > 3 && <span className="year-pill">+{trophy.winners.length - 3} more</span>}
            </div>
            <button type="button" className="view-details-btn">View Winners</button>
          </div>
        ))}
      </div>
    </section>
  );
}
