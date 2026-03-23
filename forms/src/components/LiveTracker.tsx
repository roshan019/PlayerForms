
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

interface LiveTrackerProps {
  handleOpenLiveDashboard: () => void;
}

export function LiveTracker({ handleOpenLiveDashboard }: LiveTrackerProps) {
  return (
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
      <p className="section-label">LIVE MATCHES</p>
      <h2>Live Match Tracker</h2>
      <div className="live-meta">
        <span className="live-dot">LIVE</span>
        <span>Asia Cup · Super Four</span>
      </div>

      <div className="scoreline">
        <div>
          <p className="tracker-team-row">
            <FlagImg isoCode="pk" name="Pakistan" /> Pakistan
          </p>
          <strong>217/7 (50 ov)</strong>
        </div>
        <div>
          <p className="tracker-team-row">
            <FlagImg isoCode="bd" name="Bangladesh" /> Bangladesh
          </p>
          <strong>121/2 (18.4 ov)</strong>
        </div>
      </div>

      <p className="chase-status">
        Pakistan 217/7, Bangladesh need 97 runs from 188 balls
      </p>
      <div className="tracker-actions">
        <button
          type="button"
          className="primary-action"
          onClick={handleOpenLiveDashboard}
        >
          Open Live Feed
        </button>
        <button type="button" className="ghost-action">
          Ball By Ball
        </button>
      </div>
    </article>
  );
}
