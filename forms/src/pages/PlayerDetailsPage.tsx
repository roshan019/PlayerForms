import { Link } from "react-router-dom";
import type { FormInput } from "../types/FormInput";
import { CricketTopNav } from "../components/CricketTopNav";
import "./PlayerDetailsPage.css";

interface PlayerDetailsPageProps {
  player: FormInput;
}

function getFormats(player: FormInput): string[] {
  const formats: string[] = [];
  if (player.test) formats.push("Test");
  if (player.odi) formats.push("ODI");
  if (player.t20) formats.push("T20");
  return formats;
}

function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "PL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export function PlayerDetailsPage({ player }: PlayerDetailsPageProps) {
  const name = player.fullname || "Unknown Player";
  const formats = getFormats(player);

  return (
    <>
      <CricketTopNav />
      <main className="player-details-page">
        <section className="player-details-card" aria-label="Player profile overview">
        <header className="player-profile-head">
          <div className="player-avatar" aria-hidden="true">{initials(name)}</div>
          <div className="player-head-content">
            <p className="player-role-tag">{player.role || "Cricketer"}</p>
            <h1>{name}</h1>
            <p className="player-meta-line">
              {player.country || "Country N/A"}
              <span>•</span>
              Jersey #{player.jerseyNo || "N/A"}
              <span>•</span>
              {player.gender || "N/A"}
            </p>
          </div>
          <div className="player-actions">
            <Link to="/players" className="player-action-btn secondary">View Player List</Link>
            <Link to="/live" className="player-action-btn">Back to Live</Link>
          </div>
        </header>

        <div className="player-stats-grid" aria-label="Quick player information">
          <article className="player-stat-item">
            <p className="label">Date of Birth</p>
            <p className="value">{player.dateOfBirth || "N/A"}</p>
          </article>
          <article className="player-stat-item">
            <p className="label">Age</p>
            <p className="value">{player.age || "N/A"}</p>
          </article>
          <article className="player-stat-item">
            <p className="label">Height</p>
            <p className="value">{player.height ? `${player.height} cm` : "N/A"}</p>
          </article>
          <article className="player-stat-item">
            <p className="label">Primary Role</p>
            <p className="value">{player.role || "N/A"}</p>
          </article>
        </div>

        <section className="player-section" aria-label="Formats">
          <h2>Formats</h2>
          <div className="format-chip-row">
            {formats.length > 0 ? (
              formats.map((format) => (
                <span key={format} className="format-chip">{format}</span>
              ))
            ) : (
              <span className="format-chip muted">No formats selected</span>
            )}
          </div>
        </section>

        <section className="player-section" aria-label="Contact and personal information">
          <h2>Player Information</h2>
          <div className="player-info-grid">
            <div>
              <p className="label">Email</p>
              <p className="value">{player.email || "N/A"}</p>
            </div>
            <div>
              <p className="label">Phone</p>
              <p className="value">{player.phoneNo || "N/A"}</p>
            </div>
            <div>
              <p className="label">Address</p>
              <p className="value">{player.address || "N/A"}</p>
            </div>
            <div>
              <p className="label">Country</p>
              <p className="value">{player.country || "N/A"}</p>
            </div>
          </div>
        </section>
        </section>
      </main>
    </>
  );
}
