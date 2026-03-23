import { useState } from 'react';
import './AllTimeStats.css';

const countryCodeMap: Record<string, string> = {
  IND: 'IN',
  AUS: 'AU',
  RSA: 'ZA',
  ENG: 'GB',
  SL: 'LK',
  WI: 'JM',
  PAK: 'PK',
  NZ: 'NZ',
  IRE: 'IE',
  AFG: 'AF',
  BAN: 'BD'
};

function getCountryCode(abbr: string) {
  return countryCodeMap[abbr] || 'UN';
}

const statsData = {
  TEST: {
    runs: [
      { name: 'Sachin Tendulkar', country: 'IND', value: '15,921', match: 200 },
      { name: 'Ricky Ponting', country: 'AUS', value: '13,378', match: 168 },
      { name: 'Jacques Kallis', country: 'RSA', value: '13,289', match: 166 },
      { name: 'Rahul Dravid', country: 'IND', value: '13,288', match: 164 },
      { name: 'Alastair Cook', country: 'ENG', value: '12,472', match: 161 },
      { name: 'Kumar Sangakkara', country: 'SL', value: '12,400', match: 134 },
      { name: 'Brian Lara', country: 'WI', value: '11,953', match: 131 },
      { name: 'Shivnarine Chanderpaul', country: 'WI', value: '11,867', match: 164 },
      { name: 'Mahela Jayawardene', country: 'SL', value: '11,814', match: 149 },
      { name: 'Joe Root', country: 'ENG', value: '11,626', match: 138 },
    ],
    wickets: [
      { name: 'Muttiah Muralitharan', country: 'SL', value: '800', match: 133 },
      { name: 'Shane Warne', country: 'AUS', value: '708', match: 145 },
      { name: 'James Anderson', country: 'ENG', value: '700', match: 187 },
      { name: 'Anil Kumble', country: 'IND', value: '619', match: 132 },
      { name: 'Stuart Broad', country: 'ENG', value: '604', match: 167 },
      { name: 'Glenn McGrath', country: 'AUS', value: '563', match: 124 },
      { name: 'Courtney Walsh', country: 'WI', value: '519', match: 132 },
      { name: 'Nathan Lyon', country: 'AUS', value: '517', match: 127 },
      { name: 'Ravichandran Ashwin', country: 'IND', value: '507', match: 99 },
      { name: 'Dale Steyn', country: 'RSA', value: '439', match: 93 },
    ]
  },
  ODI: {
    runs: [
      { name: 'Sachin Tendulkar', country: 'IND', value: '18,426', match: 463 },
      { name: 'Kumar Sangakkara', country: 'SL', value: '14,234', match: 404 },
      { name: 'Virat Kohli', country: 'IND', value: '13,848', match: 292 },
      { name: 'Ricky Ponting', country: 'AUS', value: '13,704', match: 375 },
      { name: 'Sanath Jayasuriya', country: 'SL', value: '13,430', match: 445 },
    ],
    wickets: [
      { name: 'Muttiah Muralitharan', country: 'SL', value: '534', match: 350 },
      { name: 'Wasim Akram', country: 'PAK', value: '502', match: 356 },
      { name: 'Waqar Younis', country: 'PAK', value: '416', match: 262 },
      { name: 'Chaminda Vaas', country: 'SL', value: '400', match: 322 },
      { name: 'Shahid Afridi', country: 'PAK', value: '395', match: 398 },
    ]
  },
  T20: {
    runs: [
      { name: 'Virat Kohli', country: 'IND', value: '4,037', match: 115 },
      { name: 'Rohit Sharma', country: 'IND', value: '3,853', match: 148 },
      { name: 'Martin Guptill', country: 'NZ', value: '3,531', match: 122 },
      { name: 'Babar Azam', country: 'PAK', value: '3,485', match: 104 },
      { name: 'Paul Stirling', country: 'IRE', value: '3,438', match: 134 },
    ],
    wickets: [
      { name: 'Tim Southee', country: 'NZ', value: '157', match: 122 },
      { name: 'Shakib Al Hasan', country: 'BAN', value: '140', match: 117 },
      { name: 'Rashid Khan', country: 'AFG', value: '130', match: 82 },
      { name: 'Ish Sodhi', country: 'NZ', value: '126', match: 105 },
      { name: 'Lasith Malinga', country: 'SL', value: '107', match: 84 },
    ]
  }
};

export function AllTimeStats() {
  const [format, setFormat] = useState<'TEST' | 'ODI' | 'T20'>('TEST');
  const [expandedStat, setExpandedStat] = useState<'runs' | 'wickets' | null>(null);

  const currentData = statsData[format];

  if (expandedStat) {
    const listData = expandedStat === 'runs' ? currentData.runs : currentData.wickets;
    
    return (
      <section className="all-time-stats detailed-view">
        <button className="back-btn" onClick={() => setExpandedStat(null)}>
          &larr; Back to Stats Overview
        </button>

        <div className="stats-header">
          <h2>Most {expandedStat === 'runs' ? 'Runs' : 'Wickets'} - {format}</h2>
          <p>Top {listData.length} All-Time Leaders</p>
        </div>

        <div className="stat-board full-width">
          <table className="stat-table detailed-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Nation</th>
                <th>Matches</th>
                <th>{expandedStat === 'runs' ? 'Runs' : 'Wkts'}</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((player, idx) => (
                <tr key={idx}>
                  <td><strong>#{idx + 1}</strong></td>
                  <td>
                    <strong>{player.name}</strong>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img src={`https://flagcdn.com/w20/${getCountryCode(player.country).toLowerCase()}.png`} alt="" className="h-3 w-4 rounded-[1px] object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="player-country-badge">{player.country}</span>
                    </div>
                  </td>
                  <td>{player.match}</td>
                  <td className="highlight-val">{player.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="all-time-stats" aria-label="All Time Stats">
      <div className="stats-header">
        <h2>All-Time Cricket Records</h2>
        <p>Career and team records for runs, wickets, strike rates, averages, and win percentages.</p>
        
        <div className="format-toggle">
          {['TEST', 'ODI', 'T20'].map((f) => (
            <button 
              key={f}
              type="button"
              className={`toggle-btn ${format === f ? 'active' : ''}`}
              onClick={() => setFormat(f as any)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-board" onClick={() => setExpandedStat('runs')} role="button" tabIndex={0}>
          <div className="board-header">
            <h3>Most Runs</h3>
            <span>Career</span>
          </div>
          <table className="stat-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Mat</th>
                <th>Runs</th>
              </tr>
            </thead>
            <tbody>
              {currentData.runs.slice(0, 3).map((player, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{player.name}</strong>
                    <div className="flex items-center gap-1">
                      <img src={`https://flagcdn.com/w20/${getCountryCode(player.country).toLowerCase()}.png`} alt="" className="h-2 w-3 rounded-[1px] object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="player-country">{player.country}</span>
                    </div>
                  </td>
                  <td>{player.match}</td>
                  <td className="highlight-val">{player.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="view-more-btn">View Full List</button>
        </div>

        <div className="stat-board" onClick={() => setExpandedStat('wickets')} role="button" tabIndex={0}>
          <div className="board-header">
            <h3>Most Wickets</h3>
            <span>Career</span>
          </div>
          <table className="stat-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Mat</th>
                <th>Wkts</th>
              </tr>
            </thead>
            <tbody>
              {currentData.wickets.slice(0, 3).map((player, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{player.name}</strong>
                    <div className="flex items-center gap-1">
                      <img src={`https://flagcdn.com/w20/${getCountryCode(player.country).toLowerCase()}.png`} alt="" className="h-2 w-3 rounded-[1px] object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <span className="player-country">{player.country}</span>
                    </div>
                  </td>
                  <td>{player.match}</td>
                  <td className="highlight-val">{player.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="view-more-btn">View Full List</button>
        </div>
      </div>
    </section>
  );
}
