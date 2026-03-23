import { Link, Navigate, useParams } from "react-router-dom";
import { CricketTopNav } from "../components/CricketTopNav";
import {
  getUpcomingMatchById,
  squadRoleLabels,
  squadRoleShortLabels,
  type SquadMember,
  type SquadRole,
  type UpcomingTeam,
} from "../data/upcomingMatches";
import "./UpcomingMatchDetailsPage.css";

function FlagPoster({ team, opponentName }: { team: UpcomingTeam; opponentName: string }) {
  return (
    <article className="team-poster">
      <img
        src={`https://flagcdn.com/w160/${team.isoCode}.png`}
        srcSet={`https://flagcdn.com/w320/${team.isoCode}.png 2x`}
        alt={`${team.name} flag`}
        className="team-poster-flag"
      />
      <h2>{team.name}</h2>
      <p className="team-poster-label">Upcoming:</p>
      <p className="team-poster-opponent">vs {opponentName}</p>
    </article>
  );
}

function RoleBadge({ role }: { role: SquadRole }) {
  return (
    <span className={`squad-role-badge role-${role}`} title={squadRoleLabels[role]}>
      {squadRoleShortLabels[role]}
    </span>
  );
}

function SquadColumn({ title, squad }: { title: string; squad: SquadMember[] }) {
  return (
    <section className="squad-card">
      <header className="squad-card-header">{title}</header>
      <div className="squad-card-body">
        {squad.map((member) => (
          <div className="squad-row" key={`${title}-${member.name}`}>
            <span className="squad-name">{member.name}</span>
            <span className="squad-role-group">
              {member.roles?.map((role) => <RoleBadge key={`${member.name}-${role}`} role={role} />)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function UpcomingMatchDetailsPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const match = matchId ? getUpcomingMatchById(matchId) : undefined;

  if (!match) {
    return <Navigate to="/upcoming" replace />;
  }

  const keyRoles: SquadRole[] = ["captain", "wicket-keeper", "head-coach", "batting-coach"];

  return (
    <>
      <CricketTopNav />
      <main className="upcoming-detail-page">
        <section className="match-detail-shell">
          <header className="match-detail-topbar">
            <Link to="/upcoming" className="match-detail-back">
              Back to upcoming matches
            </Link>
            <div className="match-detail-pill-row">
              <span className="match-detail-pill">{match.series}</span>
              <span className="match-detail-pill strong">{match.format}</span>
            </div>
          </header>

          <div className="match-sheet">
            <div className="match-sheet-top">
              <FlagPoster team={match.team2} opponentName={match.team1.name} />

              <section className="date-poster">
                <p className="date-poster-label">Starting Date</p>
                <p className="date-poster-weekday">{match.date.weekday}</p>
                <p className="date-poster-day">{match.date.day}</p>
                <p className="date-poster-month">{match.date.month}</p>
                <p className="date-poster-time">{match.date.time}</p>
              </section>

              <FlagPoster team={match.team1} opponentName={match.team2.name} />
            </div>

            <section className="location-panel">
              <p className="location-panel-label">Location & Stadium</p>
              <div className="location-panel-card">{match.venue}</div>
            </section>

            <div className="squads-grid">
              <SquadColumn title={`${match.team2.name} (Squad)`} squad={match.squads.team2} />
              <SquadColumn title={`${match.team1.name} (Squad)`} squad={match.squads.team1} />
            </div>

            <section className="match-key-card">
              <p className="match-key-title">Key</p>
              <div className="match-key-row">
                {keyRoles.map((role) => (
                  <div className="match-key-item" key={role}>
                    <RoleBadge role={role} />
                    <span>{squadRoleLabels[role]}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}