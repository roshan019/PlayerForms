import { useMemo, useState } from "react";

type RankingFormat = "TEST" | "ODI" | "T20";
type RankingCategory = "batting" | "bowling" | "all-rounder" | "teams";

type Ranking = {
  flag: string;
  team: string;
  rating: number;
};

type IccPlayerRanking = {
  player: string;
  country: string;
  points: number;
  avatar: string;
};

type IccRankingsDashboardProps = {
  rankingFormats: RankingFormat[];
  rankingCategories: Array<{ id: RankingCategory; label: string }>;
  selectedRankingFormat: RankingFormat;
  setSelectedRankingFormat: (format: RankingFormat) => void;
  selectedRankingCategory: RankingCategory;
  setSelectedRankingCategory: (category: RankingCategory) => void;
  teamRankings: Ranking[];
  selectedPlayerRankings: IccPlayerRanking[];
  selectedTeam: string;
  onTeamSelect: (team: string) => void;
};

const countryFlagMap: Record<string, string> = {
  India: "IN",
  England: "GB",
  Australia: "AU",
  "New Zealand": "NZ",
  Pakistan: "PK",
  Bangladesh: "BD",
  "South Africa": "ZA",
  "Sri Lanka": "LK",
  Afghanistan: "AF",
  Zimbabwe: "ZW",
  "West Indies": "JM",
  Ireland: "IE",
  Scotland: "GB",
  Netherlands: "NL",
  Nepal: "NP",
  Oman: "OM",
  "United States": "US",
  "United Arab Emirates": "AE",
  Namibia: "NA",
  "Papua New Guinea": "PG",
  Canada: "CA",
};

function getCountryCode(country: string) {
  return countryFlagMap[country] ?? "UN";
}

function getFlagImage(code: string) {
  if (code.length !== 2 || code === "UN") {
    return null;
  }

  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

function goldRankClass(index: number) {
  if (index !== 0) {
    return "border-slate-200/80 bg-white/80";
  }

  return "border-amber-300/80 bg-gradient-to-r from-amber-100/80 via-yellow-50 to-white shadow-[0_0_0_1px_rgba(251,191,36,0.35),0_16px_48px_rgba(251,191,36,0.2)]";
}

export function IccRankingsDashboard({
  rankingFormats,
  rankingCategories,
  selectedRankingFormat,
  setSelectedRankingFormat,
  selectedRankingCategory,
  setSelectedRankingCategory,
  teamRankings,
  selectedPlayerRankings,
  selectedTeam,
  onTeamSelect,
}: IccRankingsDashboardProps) {
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);

  const rankings = useMemo(() => {
    if (selectedRankingCategory === "teams") {
      return teamRankings.map((team, index) => ({
        key: `${team.team}-${selectedRankingFormat}`,
        rank: index + 1,
        name: team.team,
        country: team.team,
        points: team.rating,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(team.team)}&background=0f172a&color=f8fafc`,
        flagCode: getCountryCode(team.team),
      }));
    }

    return selectedPlayerRankings.map((player, index) => ({
      key: `${player.player}-${player.country}-${selectedRankingFormat}`,
      rank: index + 1,
      name: player.player,
      country: player.country,
      points: player.points,
      avatar: player.avatar,
      flagCode: getCountryCode(player.country),
    }));
  }, [selectedPlayerRankings, selectedRankingCategory, selectedRankingFormat, teamRankings]);

  return (
    <section
      aria-label="ICC rankings table"
      className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_24px_64px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.14),_transparent_50%)]" />

      <div className="relative z-10 space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700/80">ICC Rankings</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Men&apos;s Cricket Rankings Dashboard
            </h2>
          </div>

          <div className="inline-flex w-full rounded-full border border-slate-200 bg-slate-100 p-1 shadow-inner shadow-slate-300/55 sm:w-auto">
            {rankingFormats.map((format) => {
              const active = selectedRankingFormat === format;
              return (
                <button
                  key={format}
                  type="button"
                  onClick={() => setSelectedRankingFormat(format)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "bg-cyan-400 text-slate-950 shadow-[0_8px_28px_rgba(34,211,238,0.45)]"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {format}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {rankingCategories.map((category) => {
            const active = selectedRankingCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedRankingCategory(category.id)}
                className={`rounded-2xl border px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-900"
                    : "border-slate-200 bg-white/75 text-slate-700 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="hidden grid-cols-[80px_1fr_120px] px-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 md:grid">
          <span>Rank</span>
          <span>{selectedRankingCategory === "teams" ? "Team" : "Player"}</span>
          <span className="text-right">Points</span>
        </div>

        <div className="space-y-3">
          {rankings.map((row, index) => {
            const topRank = index === 0;
            const flagImage = getFlagImage(row.flagCode);
            return (
              <article
                key={row.key}
                onMouseEnter={() => setHoveredRank(index)}
                onMouseLeave={() => setHoveredRank(null)}
                className={`group relative overflow-hidden rounded-2xl border px-4 py-3 backdrop-blur-2xl transition-all duration-300 ${goldRankClass(index)} ${
                  selectedRankingCategory === "teams" && selectedTeam === row.country
                    ? "ring-2 ring-cyan-300/80"
                    : ""
                } ${
                  hoveredRank === index ? "-translate-y-0.5 shadow-2xl" : ""
                }`}
              >
                <div className="grid items-center gap-4 md:grid-cols-[80px_1fr_120px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full border text-sm font-bold ${
                        topRank
                          ? "border-amber-300/70 bg-amber-300/20 text-amber-900"
                          : "border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      #{row.rank}
                    </span>
                    {topRank ? (
                      <span className="rounded-full border border-amber-300/70 bg-amber-300/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-900">
                        Gold
                      </span>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={selectedRankingCategory === "teams" ? () => onTeamSelect(row.country) : undefined}
                    className={`flex items-center gap-3 text-left ${selectedRankingCategory === "teams" ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="relative h-12 w-12 shrink-0">
                      <img
                        src={row.avatar}
                        alt={`${row.name} avatar`}
                        className="h-12 w-12 rounded-full border border-slate-300 object-cover"
                        loading="lazy"
                      />
                      {flagImage ? (
                        <img
                          src={flagImage}
                          alt={`${row.country} flag`}
                          className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border border-slate-950/70 object-cover shadow-lg"
                          loading="lazy"
                        />
                      ) : (
                        <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-950/70 bg-slate-900 text-[9px] font-black text-white shadow-lg">
                          {row.flagCode}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-slate-900 sm:text-lg">{row.name}</h3>
                      <div className="flex items-center gap-1.5">
                        {flagImage ? (
                          <img src={flagImage} alt="" className="h-2.5 w-3.5 object-cover rounded-[1px] shadow-sm" />
                        ) : null}
                        <p className="truncate text-xs uppercase tracking-[0.18em] text-slate-500">{row.country}</p>
                      </div>
                    </div>
                  </button>

                  <div className="text-left md:text-right">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Points</p>
                    <p className="text-2xl font-black tabular-nums text-slate-950 sm:text-3xl">{row.points}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
