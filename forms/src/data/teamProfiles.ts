export type RankingFormat = "TEST" | "ODI" | "T20";

export type TeamFocusProfile = {
  captain: string;
  coach: string;
  homeBase: string;
  summary: string;
  squad: string[];
  upcomingMatches: Array<{
    fixture: string;
    series: string;
    date: string;
    venue: string;
  }>;
  focus: string[];
};

type UpcomingMatch = {
  fixture: string;
  series: string;
  startTime: string;
  venue: string;
  format: "TEST" | "ODI" | "T20I";
};

export const teamFocusProfiles: Record<string, TeamFocusProfile> = {
  Australia: {
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
    homeBase: "Melbourne, Australia",
    summary: "Australia remain one of the strongest all-format sides, built around pace depth, aggressive top-order batting, and experienced finishing options.",
    squad: ["Pat Cummins", "Mitchell Starc", "Josh Hazlewood", "Travis Head", "Steve Smith", "Glenn Maxwell", "Alex Carey"],
    upcomingMatches: [
      { fixture: "Australia vs West Indies", series: "T20I Series", date: "22 Mar 2026", venue: "Brisbane Cricket Ground" },
      { fixture: "Australia vs West Indies", series: "T20I Series", date: "25 Mar 2026", venue: "Adelaide Oval" },
    ],
    focus: ["Fast-bowling rotation remains elite across formats", "Middle-order power makes them dangerous in chases", "Fielding standards continue to set the benchmark"],
  },
  India: {
    captain: "Suryakumar Yadav",
    coach: "Rahul Dravid",
    homeBase: "Mumbai, India",
    summary: "India's setup is driven by top-order consistency, versatile spin options, and a deep pool of all-round talent across white-ball and red-ball cricket.",
    squad: ["Rohit Sharma", "Virat Kohli", "Shubman Gill", "Suryakumar Yadav", "Hardik Pandya", "Ravindra Jadeja", "Jasprit Bumrah"],
    upcomingMatches: [
      { fixture: "India vs Sri Lanka", series: "ODI Series", date: "24 Mar 2026", venue: "Wankhede Stadium" },
      { fixture: "India vs Sri Lanka", series: "ODI Series", date: "27 Mar 2026", venue: "MA Chidambaram Stadium" },
    ],
    focus: ["Spin and pace balance gives India strong flexibility", "Top three remain central to batting tempo", "Death-overs bowling is still a major strength"],
  },
  England: {
    captain: "Jos Buttler",
    coach: "Matthew Mott",
    homeBase: "London, England",
    summary: "England continue to back an aggressive batting identity, with white-ball firepower and a deep seam group suited to modern international cricket.",
    squad: ["Jos Buttler", "Joe Root", "Harry Brook", "Ben Stokes", "Moeen Ali", "Jofra Archer", "Adil Rashid"],
    upcomingMatches: [
      { fixture: "England vs Pakistan", series: "T20I Series", date: "21 Mar 2026", venue: "Old Trafford" },
      { fixture: "England vs Pakistan", series: "T20I Series", date: "23 Mar 2026", venue: "Edgbaston" },
    ],
    focus: ["Explosive top six can change games rapidly", "Experienced spin options support middle overs control", "Managing bowling injuries remains important"],
  },
  "South Africa": {
    captain: "Aiden Markram",
    coach: "Shukri Conrad",
    homeBase: "Johannesburg, South Africa",
    summary: "South Africa combine high pace, athletic fielding, and flexible batting roles, making them a serious threat in ICC tournament cycles.",
    squad: ["Aiden Markram", "Temba Bavuma", "Quinton de Kock", "Heinrich Klaasen", "Kagiso Rabada", "Anrich Nortje", "Keshav Maharaj"],
    upcomingMatches: [
      { fixture: "New Zealand vs South Africa", series: "T20I Series", date: "20 Mar 2026", venue: "Eden Park" },
      { fixture: "New Zealand vs South Africa", series: "T20I Series", date: "22 Mar 2026", venue: "Seddon Park" },
    ],
    focus: ["Pace attack creates wicket-taking bursts", "Finishing power is strong through Klaasen and Miller profiles", "Top-order stability is key in longer chases"],
  },
  "New Zealand": {
    captain: "Kane Williamson",
    coach: "Gary Stead",
    homeBase: "Auckland, New Zealand",
    summary: "New Zealand rely on disciplined execution, strong seam-bowling plans, and adaptable batting combinations that travel well across conditions.",
    squad: ["Kane Williamson", "Devon Conway", "Daryl Mitchell", "Glenn Phillips", "Mitchell Santner", "Tim Southee", "Trent Boult"],
    upcomingMatches: [
      { fixture: "New Zealand vs South Africa", series: "T20I Series", date: "20 Mar 2026", venue: "Eden Park" },
      { fixture: "New Zealand vs South Africa", series: "T20I Series", date: "22 Mar 2026", venue: "Seddon Park" },
    ],
    focus: ["Tactical bowling changes are a core strength", "Fielding and catching stay consistently sharp", "Middle-order acceleration is crucial in T20 cricket"],
  },
  Pakistan: {
    captain: "Babar Azam",
    coach: "Mohammad Hafeez",
    homeBase: "Lahore, Pakistan",
    summary: "Pakistan's cricket profile is built on fast-bowling quality, wrist-spin threat, and top-order batting that can anchor or accelerate depending on format.",
    squad: ["Babar Azam", "Mohammad Rizwan", "Fakhar Zaman", "Shaheen Afridi", "Haris Rauf", "Shadab Khan", "Naseem Shah"],
    upcomingMatches: [
      { fixture: "England vs Pakistan", series: "T20I Series", date: "21 Mar 2026", venue: "Old Trafford" },
      { fixture: "England vs Pakistan", series: "T20I Series", date: "23 Mar 2026", venue: "Edgbaston" },
    ],
    focus: ["Opening partnership often shapes overall innings tempo", "Strike bowling remains one of the side's biggest assets", "Middle-order finishing depth can decide close games"],
  },
};

const upcomingMatches: UpcomingMatch[] = [
  {
    fixture: "India vs Australia",
    series: "ICC Champions Trophy · Group Stage",
    startTime: "18 Mar 2026 · 07:30 PM",
    venue: "Narendra Modi Stadium, Ahmedabad",
    format: "ODI",
  },
  {
    fixture: "Pakistan vs New Zealand",
    series: "Tri-Series Final",
    startTime: "19 Mar 2026 · 08:00 PM",
    venue: "Gaddafi Stadium, Lahore",
    format: "T20I",
  },
  {
    fixture: "England vs South Africa",
    series: "England Home Summer 2026",
    startTime: "20 Mar 2026 · 03:00 PM",
    venue: "Lord's Cricket Ground, London",
    format: "TEST",
  },
  {
    fixture: "Bangladesh vs Sri Lanka",
    series: "Asia Cup 2026",
    startTime: "21 Mar 2026 · 06:30 PM",
    venue: "Sher-e-Bangla Stadium, Dhaka",
    format: "ODI",
  },
];

export function buildFallbackTeamProfile(teamName: string, format: RankingFormat): TeamFocusProfile {
  const matchingFixtures = upcomingMatches.filter((match) => match.fixture.includes(teamName));
  const derivedMatches = matchingFixtures.slice(0, 2).map((match) => ({
    fixture: match.fixture,
    series: match.series,
    date: match.startTime,
    venue: match.venue,
  }));

  return {
    captain: `${teamName} Captain`,
    coach: `${teamName} Head Coach`,
    homeBase: `${teamName} Cricket Centre`,
    summary: `${teamName} remain competitive in ${format} cricket with a core built around international experience, bowling balance, and matchup-based batting depth.`,
    squad: [`${teamName} Opener`, `${teamName} Captain`, `${teamName} Batting Anchor`, `${teamName} All-Rounder`, `${teamName} Wicketkeeper`, `${teamName} Strike Bowler`],
    upcomingMatches:
      derivedMatches.length > 0
        ? derivedMatches
        : [
            {
              fixture: `${teamName} vs ICC Opposition XI`,
              series: `${format} Preparation Series`,
              date: "Coming Soon",
              venue: `${teamName} National Stadium`,
            },
          ],
    focus: [
      `${teamName} are building momentum in ${format} cricket through stable core selections`,
      "Bowling control in middle overs remains a key performance theme",
      "Top-order partnerships are central to setting match tempo",
    ],
  };
}

export function getTeamFocusProfile(teamName: string, format: RankingFormat) {
  return teamFocusProfiles[teamName] ?? buildFallbackTeamProfile(teamName, format);
}

export function encodeTeamName(teamName: string) {
  return encodeURIComponent(teamName);
}

export function decodeTeamName(teamName: string) {
  return decodeURIComponent(teamName);
}