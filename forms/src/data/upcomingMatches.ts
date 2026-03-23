export type SquadRole = "captain" | "wicket-keeper" | "head-coach" | "batting-coach";

export type UpcomingTeam = {
  name: string;
  isoCode: string;
  shortName: string;
};

export type SquadMember = {
  name: string;
  roles?: SquadRole[];
};

export type UpcomingMatch = {
  id: string;
  team1: UpcomingTeam;
  team2: UpcomingTeam;
  series: string;
  startTime: string;
  venue: string;
  format: "TEST" | "ODI" | "T20I";
  date: {
    weekday: string;
    day: string;
    month: string;
    time: string;
  };
  squads: {
    team1: SquadMember[];
    team2: SquadMember[];
  };
};

export const squadRoleLabels: Record<SquadRole, string> = {
  captain: "Captain",
  "wicket-keeper": "Wicket Keeper",
  "head-coach": "Head Coach",
  "batting-coach": "Batting Coach",
};

export const squadRoleShortLabels: Record<SquadRole, string> = {
  captain: "C",
  "wicket-keeper": "WK",
  "head-coach": "HC",
  "batting-coach": "BC",
};

export const upcomingMatches: UpcomingMatch[] = [
  {
    id: "india-vs-australia-odi",
    team1: { name: "India", isoCode: "in", shortName: "IND" },
    team2: { name: "Australia", isoCode: "au", shortName: "AUS" },
    series: "ICC Champions Trophy Group Stage",
    startTime: "18 Mar 2026 07:30 PM IST",
    venue: "Narendra Modi Stadium, Ahmedabad",
    format: "ODI",
    date: {
      weekday: "WED",
      day: "18",
      month: "MAR",
      time: "07:30 PM IST",
    },
    squads: {
      team1: [
        { name: "Rohit Sharma", roles: ["captain"] },
        { name: "Rishabh Pant", roles: ["wicket-keeper"] },
        { name: "Virat Kohli" },
        { name: "Jasprit Bumrah" },
        { name: "Shubman Gill" },
        { name: "Hardik Pandya" },
        { name: "Ravindra Jadeja" },
        { name: "KL Rahul" },
        { name: "Mohammed Siraj" },
        { name: "Kuldeep Yadav" },
        { name: "Vikram Rathour", roles: ["batting-coach"] },
      ],
      team2: [
        { name: "Pat Cummins", roles: ["captain"] },
        { name: "Alex Carey", roles: ["wicket-keeper"] },
        { name: "Steve Smith" },
        { name: "Travis Head" },
        { name: "Mitchell Starc" },
        { name: "Glenn Maxwell" },
        { name: "Josh Inglis" },
        { name: "Marnus Labuschagne" },
        { name: "Adam Zampa" },
        { name: "Nathan Ellis" },
        { name: "Andrew McDonald", roles: ["head-coach"] },
      ],
    },
  },
  {
    id: "pakistan-vs-new-zealand-t20i",
    team1: { name: "Pakistan", isoCode: "pk", shortName: "PAK" },
    team2: { name: "New Zealand", isoCode: "nz", shortName: "NZ" },
    series: "Tri-Series Final",
    startTime: "19 Mar 2026 08:00 PM PKT",
    venue: "Gaddafi Stadium, Lahore",
    format: "T20I",
    date: {
      weekday: "THU",
      day: "19",
      month: "MAR",
      time: "08:00 PM PKT",
    },
    squads: {
      team1: [
        { name: "Babar Azam", roles: ["captain"] },
        { name: "Mohammad Rizwan", roles: ["wicket-keeper"] },
        { name: "Fakhar Zaman" },
        { name: "Saim Ayub" },
        { name: "Iftikhar Ahmed" },
        { name: "Shadab Khan" },
        { name: "Shaheen Afridi" },
        { name: "Naseem Shah" },
        { name: "Haris Rauf" },
        { name: "Abrar Ahmed" },
        { name: "Abdul Rehman", roles: ["head-coach"] },
      ],
      team2: [
        { name: "Mitchell Santner", roles: ["captain"] },
        { name: "Tom Latham", roles: ["wicket-keeper"] },
        { name: "Finn Allen" },
        { name: "Devon Conway" },
        { name: "Kane Williamson" },
        { name: "Daryl Mitchell" },
        { name: "Glenn Phillips" },
        { name: "Matt Henry" },
        { name: "Lockie Ferguson" },
        { name: "Trent Boult" },
        { name: "Luke Ronchi", roles: ["batting-coach"] },
      ],
    },
  },
  {
    id: "england-vs-south-africa-test",
    team1: { name: "England", isoCode: "gb-eng", shortName: "ENG" },
    team2: { name: "South Africa", isoCode: "za", shortName: "SA" },
    series: "England Home Summer 2026",
    startTime: "20 Mar 2026 03:00 PM GMT",
    venue: "Lord's Cricket Ground, London",
    format: "TEST",
    date: {
      weekday: "FRI",
      day: "20",
      month: "MAR",
      time: "03:00 PM GMT",
    },
    squads: {
      team1: [
        { name: "Ben Stokes", roles: ["captain"] },
        { name: "Jamie Smith", roles: ["wicket-keeper"] },
        { name: "Joe Root" },
        { name: "Zak Crawley" },
        { name: "Harry Brook" },
        { name: "Ben Duckett" },
        { name: "Chris Woakes" },
        { name: "Mark Wood" },
        { name: "Gus Atkinson" },
        { name: "Shoaib Bashir" },
        { name: "Brendon McCullum", roles: ["head-coach"] },
      ],
      team2: [
        { name: "Temba Bavuma", roles: ["captain"] },
        { name: "Kyle Verreynne", roles: ["wicket-keeper"] },
        { name: "Aiden Markram" },
        { name: "Tony de Zorzi" },
        { name: "David Bedingham" },
        { name: "Tristan Stubbs" },
        { name: "Marco Jansen" },
        { name: "Kagiso Rabada" },
        { name: "Keshav Maharaj" },
        { name: "Nandre Burger" },
        { name: "Ashwell Prince", roles: ["batting-coach"] },
      ],
    },
  },
  {
    id: "bangladesh-vs-sri-lanka-odi",
    team1: { name: "Bangladesh", isoCode: "bd", shortName: "BAN" },
    team2: { name: "Sri Lanka", isoCode: "lk", shortName: "SL" },
    series: "Asia Cup 2026",
    startTime: "21 Mar 2026 06:30 PM BST",
    venue: "Sher-e-Bangla Stadium, Dhaka",
    format: "ODI",
    date: {
      weekday: "SAT",
      day: "21",
      month: "MAR",
      time: "06:30 PM BST",
    },
    squads: {
      team1: [
        { name: "Najmul Hossain Shanto", roles: ["captain"] },
        { name: "Litton Das", roles: ["wicket-keeper"] },
        { name: "Towhid Hridoy" },
        { name: "Mushfiqur Rahim" },
        { name: "Shakib Al Hasan" },
        { name: "Mehidy Hasan Miraz" },
        { name: "Mahmudullah" },
        { name: "Taskin Ahmed" },
        { name: "Mustafizur Rahman" },
        { name: "Tanzim Hasan Sakib" },
        { name: "David Hemp", roles: ["head-coach"] },
      ],
      team2: [
        { name: "Charith Asalanka", roles: ["captain"] },
        { name: "Kusal Mendis", roles: ["wicket-keeper"] },
        { name: "Pathum Nissanka" },
        { name: "Avishka Fernando" },
        { name: "Sadeera Samarawickrama" },
        { name: "Wanindu Hasaranga" },
        { name: "Dunith Wellalage" },
        { name: "Maheesh Theekshana" },
        { name: "Dilshan Madushanka" },
        { name: "Kasun Rajitha" },
        { name: "Thilina Kandamby", roles: ["batting-coach"] },
      ],
    },
  },
];

export function getUpcomingMatchById(matchId: string) {
  return upcomingMatches.find((match) => match.id === matchId);
}