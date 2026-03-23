
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



export const TEAM_ISO: Record<string, string> = {
  India: "in",
  Australia: "au",
  England: "gb-eng",
  "South Africa": "za",
  "New Zealand": "nz",
  Pakistan: "pk",
  Bangladesh: "bd",
  "Sri Lanka": "lk",
  "West Indies": "jm",
  Afghanistan: "af",
  Zimbabwe: "zw",
  Ireland: "ie",
  Scotland: "gb-sct",
  Netherlands: "nl",
  Nepal: "np",
  Oman: "om",
  "United States": "us",
  "United Arab Emirates": "ae",
  Namibia: "na",
  "Papua New Guinea": "pg",
};

export const scoreCards: ScoreCard[] = [
  {
    tournament: "1st ODI · Pakistan Tour of Bangladesh",
    format: "ODI",
    team1: { name: "Pakistan", code: "PAK", isoCode: "pk", score: "114 (30.4)" },
    team2: { name: "Bangladesh", code: "BAN", isoCode: "bd", score: "115-2 (15.1)" },
    result: "Bangladesh won by 8 wickets",
    isLive: false,
    matchCompletion: {
      id: "match-001",
      team1: {
        name: "Pakistan",
        shortName: "PAK",
        score: 114,
        wickets: 10,
        isoCode: "pk",
        batters: [
          { name: "Fakhar Zaman", dismissal: "c Rahim b Tanzim", runs: 28, balls: 24, fours: 4, sixes: 0, strikeRate: 116.7 },
          { name: "Imam-ul-Haq", dismissal: "b Mustafizur", runs: 18, balls: 16, fours: 2, sixes: 0, strikeRate: 112.5 },
          { name: "Babar Azam", dismissal: "lbw b Taskin", runs: 31, balls: 28, fours: 3, sixes: 1, strikeRate: 110.7 },
          { name: "Shan Masood", dismissal: "c Liton b Fizz", runs: 12, balls: 10, fours: 1, sixes: 0, strikeRate: 120.0 },
          { name: "Khushdil Shah", dismissal: "run out", runs: 8, balls: 7, fours: 1, sixes: 0, strikeRate: 114.3 },
          { name: "Mohammad Rizwan", dismissal: "not out", runs: 11, balls: 9, fours: 1, sixes: 0, strikeRate: 122.2 },
        ],
        bowlers: [
          { name: "Hasan Ali", overs: "6", maiden: 1, runs: 24, wickets: 3, economy: 4.0 },
          { name: "Mohammad Wasim", overs: "5.1", maiden: 0, runs: 28, wickets: 2, economy: 5.43 },
          { name: "Shaheen Afridi", overs: "6", maiden: 1, runs: 31, wickets: 2, economy: 5.17 },
          { name: "Shadab Khan", overs: "4", maiden: 1, runs: 18, wickets: 1, economy: 4.5 },
        ],
      },
      team2: {
        name: "Bangladesh",
        shortName: "BAN",
        score: 115,
        wickets: 2,
        isoCode: "bd",
        batters: [
          { name: "Tamim Iqbal", dismissal: "c Rizwan b Rauf", runs: 22, balls: 18, fours: 3, sixes: 0, strikeRate: 122.2 },
          { name: "Liton Das", dismissal: "not out", runs: 42, balls: 32, fours: 5, sixes: 1, strikeRate: 131.2 },
          { name: "Mushfiqur Rahim", dismissal: "not out", runs: 38, balls: 29, fours: 4, sixes: 2, strikeRate: 131.0 },
        ],
        bowlers: [
          { name: "Hasan Ali", overs: "6", maiden: 1, runs: 24, wickets: 1, economy: 4.0 },
          { name: "Mohammad Wasim", overs: "5.1", maiden: 0, runs: 28, wickets: 1, economy: 5.43 },
          { name: "Shaheen Afridi", overs: "6", maiden: 1, runs: 31, wickets: 0, economy: 5.17 },
          { name: "Imad Wasim", overs: "4", maiden: 1, runs: 18, wickets: 0, economy: 4.5 },
        ],
      },
      format: "ODI",
      venue: "Sher-e-Bangla National Stadium",
      date: "March 15, 2026",
      winner: "Bangladesh",
      winMargin: "8 wickets",
      manOfMatch: {
        name: "Liton Das",
        team: "Bangladesh",
        stats: "42 runs (32 balls)",
      },
      highestScorer: {
        name: "Mushfiqur Rahim",
        team: "Bangladesh",
        runs: 38,
      },
      bestBowler: {
        name: "Mohammad Wasim",
        team: "Pakistan",
        wickets: 1,
        runs: 28,
      },
    },
  },
  {
    tournament: "Final · ICC Men's T20 World Cup 2026",
    format: "T20I",
    team1: { name: "India", code: "IND", isoCode: "in", score: "255-5 (20)" },
    team2: { name: "New Zealand", code: "NZ", isoCode: "nz", score: "159 (19)" },
    result: "Click to open full live scorecard",
    isLive: true,
  },
  {
    tournament: "Only Test · India Women Tour of Australia",
    format: "TEST",
    team1: { name: "India Women", code: "INDW", isoCode: "in", score: "198 & 149" },
    team2: { name: "Australia Women", code: "AUSW", isoCode: "au", score: "323 & 28-0" },
    result: "Australia Women won by 10 wickets",
    isLive: false,
    matchCompletion: {
      id: "match-002",
      team1: {
        name: "India Women",
        shortName: "INDW",
        score: 347,
        wickets: 15,
        isoCode: "in",
        batters: [
          { name: "Smriti Mandhana", dismissal: "c Smith b Perry", runs: 68, balls: 98, fours: 8, sixes: 0, strikeRate: 69.4 },
          { name: "Shefali Verma", dismissal: "b Harris", runs: 42, balls: 54, fours: 5, sixes: 1, strikeRate: 77.8 },
          { name: "Jemimah Rodrigues", dismissal: "lbw b Perry", runs: 31, balls: 62, fours: 3, sixes: 0, strikeRate: 50.0 },
          { name: "Harmanpreet Kaur", dismissal: "c Healy b Gardner", runs: 48, balls: 65, fours: 5, sixes: 1, strikeRate: 73.8 },
          { name: "Richa Ghosh", dismissal: "not out", runs: 35, balls: 44, fours: 4, sixes: 0, strikeRate: 79.5 },
        ],
        bowlers: [
          { name: "Renuka Singh", overs: "22", maiden: 4, runs: 78, wickets: 4, economy: 3.55 },
          { name: "Pooja Vastrakar", overs: "18", maiden: 2, runs: 62, wickets: 3, economy: 3.44 },
          { name: "Deepti Sharma", overs: "20", maiden: 6, runs: 58, wickets: 5, economy: 2.9 },
          { name: "Arundhati Reddy", overs: "16", maiden: 1, runs: 68, wickets: 2, economy: 4.25 },
        ],
      },
      team2: {
        name: "Australia Women",
        shortName: "AUSW",
        score: 351,
        wickets: 0,
        isoCode: "au",
        batters: [
          { name: "Alyssa Healy", dismissal: "not out", runs: 145, balls: 187, fours: 18, sixes: 2, strikeRate: 77.5 },
          { name: "Rachael Haynes", dismissal: "not out", runs: 112, balls: 159, fours: 13, sixes: 1, strikeRate: 70.4 },
          { name: "Ellyse Perry", dismissal: "not out", runs: 52, balls: 78, fours: 6, sixes: 0, strikeRate: 66.7 },
        ],
        bowlers: [
          { name: "Megan Schutt", overs: "18", maiden: 3, runs: 61, wickets: 5, economy: 3.39 },
          { name: "Jess Jonassen", overs: "20", maiden: 5, runs: 52, wickets: 4, economy: 2.6 },
          { name: "Alana King", overs: "16", maiden: 2, runs: 54, wickets: 3, economy: 3.375 },
          { name: "Ashleigh Gardner", overs: "14", maiden: 1, runs: 48, wickets: 2, economy: 3.43 },
        ],
      },
      format: "TEST",
      venue: "Melbourne Cricket Ground",
      date: "March 10, 2026",
      winner: "Australia Women",
      winMargin: "10 wickets",
      manOfMatch: {
        name: "Alyssa Healy",
        team: "Australia Women",
        stats: "145 runs (187 balls)",
      },
      highestScorer: {
        name: "Alyssa Healy",
        team: "Australia Women",
        runs: 145,
      },
      bestBowler: {
        name: "Deepti Sharma",
        team: "India Women",
        wickets: 5,
        runs: 58,
      },
    },
  },
  {
    tournament: "3rd ODI · Zimbabwe Women Tour of NZ",
    format: "ODI",
    team1: { name: "New Zealand Women", code: "NZW", isoCode: "nz", score: "303-6 (50)" },
    team2: { name: "Zimbabwe Women", code: "ZIMW", isoCode: "zw", score: "103 (27.1)" },
    result: "New Zealand Women won by 200 runs",
    isLive: false,
    matchCompletion: {
      id: "match-003",
      team1: {
        name: "New Zealand Women",
        shortName: "NZW",
        score: 303,
        wickets: 6,
        isoCode: "nz",
        batters: [
          { name: "Alyssa Healy", dismissal: "c Cephas b Mavunga", runs: 56, balls: 48, fours: 8, sixes: 1, strikeRate: 116.7 },
          { name: "Sophie Devine", dismissal: "b Mavunga", runs: 92, balls: 78, fours: 11, sixes: 2, strikeRate: 117.9 },
          { name: "Maddy Green", dismissal: "c Maruma b Mupachoto", runs: 38, balls: 35, fours: 4, sixes: 1, strikeRate: 108.6 },
          { name: "Amelia Kerr", dismissal: "not out", runs: 62, balls: 51, fours: 7, sixes: 2, strikeRate: 121.6 },
          { name: "Brooke Halliday", dismissal: "b Mupachoto", runs: 28, balls: 32, fours: 2, sixes: 1, strikeRate: 87.5 },
        ],
        bowlers: [
          { name: "Lea Tahuhu", overs: "7.1", maiden: 2, runs: 18, wickets: 4, economy: 2.51 },
          { name: "Tess Coombe", overs: "6", maiden: 1, runs: 22, wickets: 2, economy: 3.67 },
          { name: "Eden Carson", overs: "5", maiden: 1, runs: 16, wickets: 1, economy: 3.2 },
          { name: "Amelia Kerr", overs: "5", maiden: 2, runs: 14, wickets: 1, economy: 2.8 },
        ],
      },
      team2: {
        name: "Zimbabwe Women",
        shortName: "ZIMW",
        score: 103,
        wickets: 10,
        isoCode: "zw",
        batters: [
          { name: "Chipo Mugeri", dismissal: "b Tahuhu", runs: 12, balls: 14, fours: 2, sixes: 0, strikeRate: 85.7 },
          { name: "Stacy-Ann King", dismissal: "c Kerr b Tahuhu", runs: 8, balls: 11, fours: 1, sixes: 0, strikeRate: 72.7 },
          { name: "Nomvula Mupachoto", dismissal: "b Southee", runs: 18, balls: 22, fours: 2, sixes: 0, strikeRate: 81.8 },
          { name: "Precious Marange", dismissal: "c Devine b Tahuhu", runs: 22, balls: 28, fours: 3, sixes: 0, strikeRate: 78.6 },
          { name: "Loryn Phiri", dismissal: "lbw b Kerr", runs: 9, balls: 15, fours: 1, sixes: 0, strikeRate: 60.0 },
          { name: "All others", dismissal: "lbw/caught", runs: 34, balls: 45, fours: 2, sixes: 0, strikeRate: 75.6 },
        ],
        bowlers: [
          { name: "Lea Tahuhu", overs: "7.1", maiden: 2, runs: 18, wickets: 4, economy: 2.51 },
          { name: "Tess Coombe", overs: "6", maiden: 1, runs: 22, wickets: 2, economy: 3.67 },
          { name: "Eden Carson", overs: "5", maiden: 1, runs: 16, wickets: 1, economy: 3.2 },
          { name: "Amelia Kerr", overs: "5", maiden: 2, runs: 14, wickets: 1, economy: 2.8 },
        ],
      },
      format: "ODI",
      venue: "Eden Park",
      date: "March 12, 2026",
      winner: "New Zealand Women",
      winMargin: "200 runs",
      manOfMatch: {
        name: "Sophie Devine",
        team: "New Zealand Women",
        stats: "92 runs (78 balls)",
      },
      highestScorer: {
        name: "Sophie Devine",
        team: "New Zealand Women",
        runs: 92,
      },
      bestBowler: {
        name: "Lea Tahuhu",
        team: "New Zealand Women",
        wickets: 4,
        runs: 18,
      },
    },
  },
];

export const rankingFormats: RankingFormat[] = ["TEST", "ODI", "T20"];

export const teamRankingsByFormat: Record<RankingFormat, Ranking[]> = {
  TEST: [
    { flag: "🇦🇺", team: "Australia", rating: 126, move: "same" },
    { flag: "🇮🇳", team: "India", rating: 121, move: "up" },
    { flag: "🏴", team: "England", rating: 113, move: "down" },
    { flag: "🇿🇦", team: "South Africa", rating: 111, move: "up" },
    { flag: "🇳🇿", team: "New Zealand", rating: 107, move: "same" },
    { flag: "🇵🇰", team: "Pakistan", rating: 102, move: "same" },
    { flag: "🇱🇰", team: "Sri Lanka", rating: 95, move: "up" },
    { flag: "🇧🇩", team: "Bangladesh", rating: 87, move: "same" },
    { flag: "🇼🇸", team: "West Indies", rating: 82, move: "down" },
    { flag: "🇿🇼", team: "Zimbabwe", rating: 79, move: "same" },
    { flag: "🇦🇫", team: "Afghanistan", rating: 75, move: "up" },
    { flag: "🇮🇪", team: "Ireland", rating: 68, move: "same" },
  ],
  ODI: [
    { flag: "🇮🇳", team: "India", rating: 121, move: "same" },
    { flag: "🇦🇺", team: "Australia", rating: 118, move: "up" },
    { flag: "🇵🇰", team: "Pakistan", rating: 115, move: "down" },
    { flag: "🇿🇦", team: "South Africa", rating: 112, move: "same" },
    { flag: "🇳🇿", team: "New Zealand", rating: 109, move: "same" },
    { flag: "🏴", team: "England", rating: 106, move: "up" },
    { flag: "🇱🇰", team: "Sri Lanka", rating: 101, move: "up" },
    { flag: "🇧🇩", team: "Bangladesh", rating: 96, move: "same" },
    { flag: "🇦🇫", team: "Afghanistan", rating: 92, move: "up" },
    { flag: "🇼🇸", team: "West Indies", rating: 89, move: "down" },
    { flag: "🇿🇼", team: "Zimbabwe", rating: 84, move: "same" },
    { flag: "🇮🇪", team: "Ireland", rating: 80, move: "same" },
    { flag: "🏴", team: "Scotland", rating: 77, move: "up" },
    { flag: "🇳🇱", team: "Netherlands", rating: 75, move: "same" },
    { flag: "🇳🇵", team: "Nepal", rating: 72, move: "up" },
    { flag: "🇴🇲", team: "Oman", rating: 70, move: "same" },
    { flag: "🇺🇸", team: "United States", rating: 68, move: "up" },
    { flag: "🇦🇪", team: "United Arab Emirates", rating: 66, move: "same" },
    { flag: "🇳🇦", team: "Namibia", rating: 64, move: "down" },
    { flag: "🇵🇬", team: "Papua New Guinea", rating: 61, move: "same" },
  ],
  T20: [
    { flag: "🇮🇳", team: "India", rating: 267, move: "up" },
    { flag: "🇦🇺", team: "Australia", rating: 260, move: "same" },
    { flag: "🏴", team: "England", rating: 254, move: "down" },
    { flag: "🇵🇰", team: "Pakistan", rating: 248, move: "same" },
    { flag: "🇿🇦", team: "South Africa", rating: 244, move: "up" },
    { flag: "🇳🇿", team: "New Zealand", rating: 241, move: "same" },
    { flag: "🇼🇸", team: "West Indies", rating: 236, move: "up" },
    { flag: "🇱🇰", team: "Sri Lanka", rating: 232, move: "same" },
    { flag: "🇦🇫", team: "Afghanistan", rating: 229, move: "up" },
    { flag: "🇧🇩", team: "Bangladesh", rating: 225, move: "down" },
    { flag: "🇮🇪", team: "Ireland", rating: 219, move: "same" },
    { flag: "🇿🇼", team: "Zimbabwe", rating: 214, move: "up" },
    { flag: "🏴", team: "Scotland", rating: 210, move: "same" },
    { flag: "🇳🇱", team: "Netherlands", rating: 206, move: "same" },
    { flag: "🇳🇵", team: "Nepal", rating: 201, move: "up" },
    { flag: "🇦🇪", team: "United Arab Emirates", rating: 198, move: "same" },
    { flag: "🇺🇸", team: "United States", rating: 194, move: "up" },
    { flag: "🇴🇲", team: "Oman", rating: 191, move: "down" },
    { flag: "🇳🇦", team: "Namibia", rating: 187, move: "same" },
    { flag: "🇨🇦", team: "Canada", rating: 182, move: "up" },
  ],
};

export const rankingCategories: Array<{ id: RankingCategory; label: string }> = [
  { id: "batting", label: "Batting" },
  { id: "bowling", label: "Bowling" },
  { id: "all-rounder", label: "All Rounder" },
  { id: "teams", label: "Teams" },
];

export const battingRankingsByFormat: Record<RankingFormat, IccPlayerRanking[]> = {
  TEST: [
    { player: "Joe Root", country: "England", points: 880, avatar: "https://ui-avatars.com/api/?name=Joe+Root&background=e5e7eb&color=1f2937" },
    { player: "Harry Brook", country: "England", points: 857, avatar: "https://ui-avatars.com/api/?name=Harry+Brook&background=e5e7eb&color=1f2937" },
    { player: "Travis Head", country: "Australia", points: 853, avatar: "https://ui-avatars.com/api/?name=Travis+Head&background=e5e7eb&color=1f2937" },
    { player: "Steven Smith", country: "Australia", points: 831, avatar: "https://ui-avatars.com/api/?name=Steven+Smith&background=e5e7eb&color=1f2937" },
    { player: "Kane Williamson", country: "New Zealand", points: 822, avatar: "https://ui-avatars.com/api/?name=Kane+Williamson&background=e5e7eb&color=1f2937" },
    { player: "Kamindu Mendis", country: "Sri Lanka", points: 781, avatar: "https://ui-avatars.com/api/?name=Kamindu+Mendis&background=e5e7eb&color=1f2937" },
    { player: "Temba Bavuma", country: "South Africa", points: 775, avatar: "https://ui-avatars.com/api/?name=Temba+Bavuma&background=e5e7eb&color=1f2937" },
  ],
  ODI: [
    { player: "Shubman Gill", country: "India", points: 807, avatar: "https://ui-avatars.com/api/?name=Shubman+Gill&background=e5e7eb&color=1f2937" },
    { player: "Babar Azam", country: "Pakistan", points: 799, avatar: "https://ui-avatars.com/api/?name=Babar+Azam&background=e5e7eb&color=1f2937" },
    { player: "Virat Kohli", country: "India", points: 787, avatar: "https://ui-avatars.com/api/?name=Virat+Kohli&background=e5e7eb&color=1f2937" },
    { player: "Rohit Sharma", country: "India", points: 769, avatar: "https://ui-avatars.com/api/?name=Rohit+Sharma&background=e5e7eb&color=1f2937" },
    { player: "David Warner", country: "Australia", points: 754, avatar: "https://ui-avatars.com/api/?name=David+Warner&background=e5e7eb&color=1f2937" },
    { player: "Daryl Mitchell", country: "New Zealand", points: 744, avatar: "https://ui-avatars.com/api/?name=Daryl+Mitchell&background=e5e7eb&color=1f2937" },
    { player: "Rassie van der Dussen", country: "South Africa", points: 739, avatar: "https://ui-avatars.com/api/?name=Rassie+van+der+Dussen&background=e5e7eb&color=1f2937" },
  ],
  T20: [
    { player: "Travis Head", country: "Australia", points: 844, avatar: "https://ui-avatars.com/api/?name=Travis+Head&background=e5e7eb&color=1f2937" },
    { player: "Suryakumar Yadav", country: "India", points: 828, avatar: "https://ui-avatars.com/api/?name=Suryakumar+Yadav&background=e5e7eb&color=1f2937" },
    { player: "Phil Salt", country: "England", points: 805, avatar: "https://ui-avatars.com/api/?name=Phil+Salt&background=e5e7eb&color=1f2937" },
    { player: "Jos Buttler", country: "England", points: 799, avatar: "https://ui-avatars.com/api/?name=Jos+Buttler&background=e5e7eb&color=1f2937" },
    { player: "Babar Azam", country: "Pakistan", points: 792, avatar: "https://ui-avatars.com/api/?name=Babar+Azam&background=e5e7eb&color=1f2937" },
    { player: "Rilee Rossouw", country: "South Africa", points: 781, avatar: "https://ui-avatars.com/api/?name=Rilee+Rossouw&background=e5e7eb&color=1f2937" },
    { player: "Pathum Nissanka", country: "Sri Lanka", points: 772, avatar: "https://ui-avatars.com/api/?name=Pathum+Nissanka&background=e5e7eb&color=1f2937" },
  ],
};

export const bowlingRankingsByFormat: Record<RankingFormat, IccPlayerRanking[]> = {
  TEST: [
    { player: "Jasprit Bumrah", country: "India", points: 889, avatar: "https://ui-avatars.com/api/?name=Jasprit+Bumrah&background=e5e7eb&color=1f2937" },
    { player: "Ravichandran Ashwin", country: "India", points: 852, avatar: "https://ui-avatars.com/api/?name=Ravichandran+Ashwin&background=e5e7eb&color=1f2937" },
    { player: "Pat Cummins", country: "Australia", points: 847, avatar: "https://ui-avatars.com/api/?name=Pat+Cummins&background=e5e7eb&color=1f2937" },
    { player: "Kagiso Rabada", country: "South Africa", points: 834, avatar: "https://ui-avatars.com/api/?name=Kagiso+Rabada&background=e5e7eb&color=1f2937" },
    { player: "Josh Hazlewood", country: "Australia", points: 821, avatar: "https://ui-avatars.com/api/?name=Josh+Hazlewood&background=e5e7eb&color=1f2937" },
  ],
  ODI: [
    { player: "Keshav Maharaj", country: "South Africa", points: 741, avatar: "https://ui-avatars.com/api/?name=Keshav+Maharaj&background=e5e7eb&color=1f2937" },
    { player: "Mohammed Siraj", country: "India", points: 736, avatar: "https://ui-avatars.com/api/?name=Mohammed+Siraj&background=e5e7eb&color=1f2937" },
    { player: "Shaheen Afridi", country: "Pakistan", points: 728, avatar: "https://ui-avatars.com/api/?name=Shaheen+Afridi&background=e5e7eb&color=1f2937" },
    { player: "Kuldeep Yadav", country: "India", points: 712, avatar: "https://ui-avatars.com/api/?name=Kuldeep+Yadav&background=e5e7eb&color=1f2937" },
    { player: "Adam Zampa", country: "Australia", points: 704, avatar: "https://ui-avatars.com/api/?name=Adam+Zampa&background=e5e7eb&color=1f2937" },
  ],
  T20: [
    { player: "Wanindu Hasaranga", country: "Sri Lanka", points: 774, avatar: "https://ui-avatars.com/api/?name=Wanindu+Hasaranga&background=e5e7eb&color=1f2937" },
    { player: "Rashid Khan", country: "Afghanistan", points: 761, avatar: "https://ui-avatars.com/api/?name=Rashid+Khan&background=e5e7eb&color=1f2937" },
    { player: "Adil Rashid", country: "England", points: 752, avatar: "https://ui-avatars.com/api/?name=Adil+Rashid&background=e5e7eb&color=1f2937" },
    { player: "Akeal Hosein", country: "West Indies", points: 744, avatar: "https://ui-avatars.com/api/?name=Akeal+Hosein&background=e5e7eb&color=1f2937" },
    { player: "Arshdeep Singh", country: "India", points: 731, avatar: "https://ui-avatars.com/api/?name=Arshdeep+Singh&background=e5e7eb&color=1f2937" },
  ],
};

export const allRounderRankingsByFormat: Record<RankingFormat, IccPlayerRanking[]> = {
  TEST: [
    { player: "Ravindra Jadeja", country: "India", points: 455, avatar: "https://ui-avatars.com/api/?name=Ravindra+Jadeja&background=e5e7eb&color=1f2937" },
    { player: "Ravichandran Ashwin", country: "India", points: 370, avatar: "https://ui-avatars.com/api/?name=Ravichandran+Ashwin&background=e5e7eb&color=1f2937" },
    { player: "Shakib Al Hasan", country: "Bangladesh", points: 327, avatar: "https://ui-avatars.com/api/?name=Shakib+Al+Hasan&background=e5e7eb&color=1f2937" },
    { player: "Ben Stokes", country: "England", points: 315, avatar: "https://ui-avatars.com/api/?name=Ben+Stokes&background=e5e7eb&color=1f2937" },
    { player: "Jason Holder", country: "West Indies", points: 301, avatar: "https://ui-avatars.com/api/?name=Jason+Holder&background=e5e7eb&color=1f2937" },
  ],
  ODI: [
    { player: "Sikandar Raza", country: "Zimbabwe", points: 294, avatar: "https://ui-avatars.com/api/?name=Sikandar+Raza&background=e5e7eb&color=1f2937" },
    { player: "Mehidy Hasan Miraz", country: "Bangladesh", points: 289, avatar: "https://ui-avatars.com/api/?name=Mehidy+Hasan+Miraz&background=e5e7eb&color=1f2937" },
    { player: "Mohammad Nabi", country: "Afghanistan", points: 281, avatar: "https://ui-avatars.com/api/?name=Mohammad+Nabi&background=e5e7eb&color=1f2937" },
    { player: "Hardik Pandya", country: "India", points: 273, avatar: "https://ui-avatars.com/api/?name=Hardik+Pandya&background=e5e7eb&color=1f2937" },
    { player: "Marcus Stoinis", country: "Australia", points: 264, avatar: "https://ui-avatars.com/api/?name=Marcus+Stoinis&background=e5e7eb&color=1f2937" },
  ],
  T20: [
    { player: "Hardik Pandya", country: "India", points: 233, avatar: "https://ui-avatars.com/api/?name=Hardik+Pandya&background=e5e7eb&color=1f2937" },
    { player: "Sikandar Raza", country: "Zimbabwe", points: 229, avatar: "https://ui-avatars.com/api/?name=Sikandar+Raza&background=e5e7eb&color=1f2937" },
    { player: "Wanindu Hasaranga", country: "Sri Lanka", points: 221, avatar: "https://ui-avatars.com/api/?name=Wanindu+Hasaranga&background=e5e7eb&color=1f2937" },
    { player: "Shakib Al Hasan", country: "Bangladesh", points: 217, avatar: "https://ui-avatars.com/api/?name=Shakib+Al+Hasan&background=e5e7eb&color=1f2937" },
    { player: "Liam Livingstone", country: "England", points: 210, avatar: "https://ui-avatars.com/api/?name=Liam+Livingstone&background=e5e7eb&color=1f2937" },
  ],
};

export const iccLatestNews: IccNewsStory[] = [
  {
    category: "Women's Player of the Month",
    title: "ICC Women's Player of the Month nominees for February 2026 announced",
    age: "1h ago",
    url: "https://www.icc-cricket.com/news/icc-women-s-player-of-the-month-nominees-for-february-2026-announced",
  },
  {
    category: "Men's Player of the Month",
    title: "ICC Men's Player of the Month nominees for February 2026 named",
    age: "1h ago",
    url: "https://www.icc-cricket.com/news/icc-men-s-player-of-the-month-nominees-for-february-2026-named",
  },
  {
    category: "ICC Men's T20 World Cup 2028 Qualifier",
    title: "Cayman Islands keep 2028 T20 World Cup dream alive",
    age: "3h ago",
    url: "https://www.icc-cricket.com/news/cayman-islands-keep-2028-t20-world-cup-dream-alive",
  },
  {
    category: "Team News",
    title: "Series triumph has Miraz hungry for more from Bangladesh",
    age: "6h ago",
    url: "https://www.icc-cricket.com/news/series-triumph-has-miraz-hungry-for-more-from-bangladesh",
  },
  {
    category: "ICC Cricket World Cup 2027",
    title: "Gill eyes redemption for India at 2027 Cricket World Cup",
    age: "9h ago",
    url: "https://www.icc-cricket.com/news/gill-eyes-redemption-for-india-at-2027-cricket-world-cup",
  },
  {
    category: "Squad Update",
    title: "Injury sidelines New Zealand duo for South Africa T20Is",
    age: "11h ago",
    url: "https://www.icc-cricket.com/news/thumb-injury-sidelines-new-zealand-spinner-for-south-africa",
  },
];

export const indiaBatters: BatterRow[] = [
  { name: "Rohit Sharma", dismissal: "c Phillips b Boult", runs: 65, balls: 42, fours: 7, sixes: 3, strikeRate: 154.8 },
  { name: "Virat Kohli", dismissal: "run out", runs: 72, balls: 49, fours: 8, sixes: 4, strikeRate: 146.9 },
  { name: "Suryakumar Yadav", dismissal: "not out", runs: 50, balls: 22, fours: 1, sixes: 5, strikeRate: 227.3 },
  { name: "Hardik Pandya", dismissal: "n.n out", runs: 42, balls: 16, fours: 2, sixes: 3, strikeRate: 262.5 },
];

export const nzBowlers: BowlerRow[] = [
  { name: "Boult", overs: "4", maiden: 1, runs: 40, wickets: 0, economy: 10.4 },
  { name: "Southee", overs: "4", maiden: 1, runs: 50, wickets: 0, economy: 12.5 },
  { name: "Santner", overs: "4", maiden: 1, runs: 39, wickets: 2, economy: 9.8 },
  { name: "Ferguson", overs: "4", maiden: 0, runs: 48, wickets: 2, economy: 12.0 },
  { name: "Williamson", overs: "4", maiden: 0, runs: 34, wickets: 1, economy: 8.5 },
];

export const liveBowlers: BowlingLiveRow[] = [
  { name: "Boult", spell: "1-4 overs", overs: 1, maiden: 4, runs: 40, wickets: 0, economy: 10.4 },
  { name: "Southee", spell: "0.4, 4.5 ov", overs: 1, maiden: 4, runs: 50, wickets: 0, economy: 12.5 },
  { name: "Santner", spell: "4.4, 39 ov", overs: 1, maiden: 4, runs: 39, wickets: 2, economy: 9.8 },
  { name: "Ferguson", spell: "2.4, 18 ov, 3.48 ov", overs: 2, maiden: 4, runs: 48, wickets: 0, economy: 12.35 },
  { name: "Williamson", spell: "0.2, 18 ov", overs: 0, maiden: 4, runs: 34, wickets: 0, economy: 152.9 },
];

export const commentaryFeed: CommentaryItem[] = [
  {
    over: "19.6",
    title: "FOUR! Kohli ends with style",
    detail: "Short and wide from Southee, Virat opens the face and slices it over backward point.",
  },
  {
    over: "19.4",
    title: "SIX! Hardik powers it",
    detail: "Length ball on off, Pandya clears his front leg and launches it over long-on.",
  },
  {
    over: "18.2",
    title: "WICKET! Rohit falls",
    detail: "Boult gets the breakthrough. Rohit miscues a lofted drive and Phillips takes the catch.",
  },
  {
    over: "15.0",
    title: "Strategic timeout",
    detail: "India are 170/4 after 15 overs. Kohli and Pandya discussing the final surge.",
  },
];

export const matchStats: MatchStat[] = [
  { label: "Dot Balls", india: "41", newZealand: "55" },
  { label: "Boundaries", india: "31", newZealand: "18" },
  { label: "Sixes", india: "15", newZealand: "7" },
  { label: "Run Rate", india: "12.75", newZealand: "8.36" },
  { label: "Wickets Lost", india: "5", newZealand: "9" },
];

export const heroShortcuts: HeroShortcut[] = [
  {
    id: "trophy",
    icon: "🏆",
    label: "Trophy Museum",
    title: "ICC Trophy Museum",
    summary: "Explore major ICC winners and finals history across ODI, T20I, and Test events.",
    points: [
      "Most Titles: Australia (ODI World Cup)",
      "Recent Champions: India (T20 World Cup 2024)",
      "Classic Finals Archive: 1983, 2011, 2019, 2023",
    ],
  },
  {
    id: "history",
    icon: "🔎",
    label: "History Search",
    title: "Head-to-Head History Search",
    summary: "Quick lookup for iconic rivalries, bilateral records, and venue-wise match outcomes.",
    points: [
      "India vs Pakistan: ODI and T20I World Cup results",
      "Ashes Timeline: Every Test series winner since 1882",
      "Venue Finder: Highest chases and best bowling spells",
    ],
  },
  {
    id: "all-time",
    icon: "📊",
    label: "All-Time Stats",
    title: "All-Time Cricket Stats",
    summary: "Career and team records for runs, wickets, strike rates, averages, and win percentages.",
    points: [
      "Most International Runs and 100s leaderboards",
      "Best Bowling Figures (innings and match)",
      "Team form index across Test, ODI, and T20I",
    ],
  },
];
