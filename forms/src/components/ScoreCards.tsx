
import { useNavigate } from "react-router-dom";
import type { ScoreCard } from "../types/entities";

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

interface ScoreCardsProps {
  scoreCards: ScoreCard[];
  handleOpenLiveDashboard: () => void;
}

export function ScoreCards({
  scoreCards,
  handleOpenLiveDashboard,
}: ScoreCardsProps) {
  const navigate = useNavigate();

  return (
    <section className="score-card-row" aria-label="Recent score summaries">
      {scoreCards.map((card, index) => {
        const isLiveCard = index === 1;
        const handleCardClick = () => {
          if (isLiveCard) {
            handleOpenLiveDashboard();
          } else if (card.matchCompletion) {
            navigate("/match-completion", {
              state: { match: card.matchCompletion },
            });
          }
        };

        return (
          <article
            className={`score-card ${
              isLiveCard || card.matchCompletion ? "clickable-live-card" : ""
            }`}
            key={card.tournament}
            role={isLiveCard || card.matchCompletion ? "button" : undefined}
            tabIndex={isLiveCard || card.matchCompletion ? 0 : undefined}
            onClick={handleCardClick}
            onKeyDown={
              isLiveCard || card.matchCompletion
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleCardClick();
                    }
                  }
                : undefined
            }
          >
            <div className="card-head">
              <p>{card.tournament}</p>
              <span>{card.format}</span>
            </div>
            <div className="match-team-row">
              <FlagImg isoCode={card.team1.isoCode} name={card.team1.name} />
              <span className="team-code">{card.team1.code}</span>
              <span className="team-score">{card.team1.score}</span>
            </div>
            <div className="match-team-row">
              <FlagImg isoCode={card.team2.isoCode} name={card.team2.name} />
              <span className="team-code">{card.team2.code}</span>
              <span className="team-score">{card.team2.score}</span>
            </div>
            <p className="card-result">{card.result}</p>
            <div className="card-footer">
              <button
                type="button"
                onClick={isLiveCard ? handleOpenLiveDashboard : undefined}
              >
                {isLiveCard ? "Live Scorecard" : "Details"}
              </button>
              <button type="button">Schedule</button>
              <button type="button">Table</button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
