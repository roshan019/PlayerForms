
import type { MatchResult } from "../components/MatchCompletion";
export type TeamScore = {
  name: string;
  code: string;
  isoCode: string;
  score: string;
};

export type ScoreCard = {
  tournament: string;
  format: string;
  team1: TeamScore;
  team2: TeamScore;
  result: string;
  isLive?: boolean;
  matchCompletion?: MatchResult;
};

export type Ranking = {
  flag: string;
  team: string;
  rating: number;
  move: "up" | "down" | "same";
};

export type RankingFormat = "TEST" | "ODI" | "T20";
export type RankingCategory = "batting" | "bowling" | "all-rounder" | "teams";

export type IccPlayerRanking = {
  player: string;
  country: string;
  points: number;
  avatar: string;
};

export type BatterRow = {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
};

export type BowlerRow = {
  name: string;
  overs: string;
  maiden: number;
  runs: number;
  wickets: number;
  economy: number;
};

export type BowlingLiveRow = {
  name: string;
  spell: string;
  overs: number;
  maiden: number;
  runs: number;
  wickets: number;
  economy: number;
};

export type CommentaryItem = {
  over: string;
  title: string;
  detail: string;
};

export type MatchStat = {
  label: string;
  india: string;
  newZealand: string;
};

export type HeroShortcut = {
  id: "trophy" | "history" | "all-time";
  label: string;
  icon: string;
  title: string;
  summary: string;
  points: string[];
};

export type IccNewsStory = {
  category: string;
  title: string;
  age: string;
  url: string;
};
