import { useNavigate, useLocation } from "react-router-dom";
import { MatchCompletion, type MatchResult } from "../components/MatchCompletion";
import { Header } from "../components/Header";
import { CricketTopNav } from "../components/CricketTopNav";
import "./MatchCompletionPage.css";

interface MatchCompletionPageProps {
  match?: MatchResult;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

interface LocationState {
  match?: MatchResult;
}

export function MatchCompletionPage({ match, theme = "light", onThemeToggle = () => {} }: MatchCompletionPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as LocationState) || {};

  // Default match result for demo
  const defaultMatch: MatchResult = {
    id: "match-001",
    team1: {
      name: "India",
      shortName: "IND",
      score: 284,
      wickets: 8,
      isoCode: "in",
      batters: [
        { name: "Rohit Sharma", dismissal: "c Phillips b Boult", runs: 65, balls: 42, fours: 7, sixes: 3, strikeRate: 154.8 },
        { name: "Virat Kohli", dismissal: "run out", runs: 72, balls: 49, fours: 8, sixes: 4, strikeRate: 146.9 },
        { name: "Suryakumar Yadav", dismissal: "not out", runs: 50, balls: 22, fours: 1, sixes: 5, strikeRate: 227.3 },
        { name: "Hardik Pandya", dismissal: "not out", runs: 42, balls: 16, fours: 2, sixes: 3, strikeRate: 262.5 },
        { name: "Jasprit Bumrah", dismissal: "run out", runs: 18, balls: 12, fours: 1, sixes: 1, strikeRate: 150.0 },
      ],
      bowlers: [
        { name: "Jasprit Bumrah", overs: "4", maiden: 1, runs: 42, wickets: 4, economy: 10.5 },
        { name: "Mohammed Siraj", overs: "4", maiden: 0, runs: 48, wickets: 2, economy: 12.0 },
        { name: "Axar Patel", overs: "4", maiden: 2, runs: 32, wickets: 1, economy: 8.0 },
        { name: "Yuzvendra Chahal", overs: "4", maiden: 1, runs: 36, wickets: 2, economy: 9.0 },
      ],
    },
    team2: {
      name: "Australia",
      shortName: "AUS",
      score: 276,
      wickets: 10,
      isoCode: "au",
      batters: [
        { name: "Travis Head", dismissal: "c Bumrah b Siraj", runs: 48, balls: 35, fours: 5, sixes: 1, strikeRate: 137.1 },
        { name: "Steven Smith", dismissal: "c Kohli b Bumrah", runs: 61, balls: 54, fours: 7, sixes: 0, strikeRate: 113.0 },
        { name: "Marcus Stoinis", dismissal: "b Bumrah", runs: 52, balls: 48, fours: 5, sixes: 2, strikeRate: 108.3 },
        { name: "Mitch Marsh", dismissal: "c Dhawan b Bumrah", runs: 38, balls: 32, fours: 4, sixes: 1, strikeRate: 118.8 },
        { name: "Tim David", dismissal: "not out", runs: 31, balls: 18, fours: 2, sixes: 2, strikeRate: 172.2 },
      ],
      bowlers: [
        { name: "Josh Hazlewood", overs: "4", maiden: 1, runs: 42, wickets: 1, economy: 10.5 },
        { name: "Mitchell Starc", overs: "4", maiden: 0, runs: 56, wickets: 2, economy: 14.0 },
        { name: "Adam Zampa", overs: "4", maiden: 1, runs: 38, wickets: 2, economy: 9.5 },
        { name: "Glenn Maxwell", overs: "4", maiden: 0, runs: 44, wickets: 1, economy: 11.0 },
      ],
    },
    format: "ODI",
    venue: "Melbourne Cricket Ground",
    date: "March 17, 2024",
    winner: "India",
    winMargin: "8 runs",
    manOfMatch: {
      name: "Virat Kohli",
      team: "India",
      stats: "72 runs (49 balls)",
    },
    highestScorer: {
      name: "Virat Kohli",
      team: "India",
      runs: 72,
    },
    bestBowler: {
      name: "Jasprit Bumrah",
      team: "India",
      wickets: 4,
      runs: 42,
    },
  };

  const matchData = locationState.match || match || defaultMatch;

  const handleStartNewMatch = () => {
    navigate("/live");
  };

  const handleGoHome = () => {
    navigate("/live");
  };

  return (
    <>
      <Header 
        onAddPlayerClick={() => navigate("/players/add")}
        onHomeClick={() => navigate("/live")}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <CricketTopNav />
      <div className="match-completion-content">
        <MatchCompletion
          match={matchData}
          onStartNewMatch={handleStartNewMatch}
          onGoHome={handleGoHome}
        />
      </div>
    </>
  );
}
